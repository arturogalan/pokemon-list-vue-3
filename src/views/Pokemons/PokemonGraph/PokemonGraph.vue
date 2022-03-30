<template>
    <svg xmlns="http://www.w3.org/2000/svg" 
       :width="width+'px'"
       :height="height+'px'"
    >
    
    <line v-for="link in graph.links"
      :x1="coords(link.source).x"
      :y1="coords(link.source).y"
      :x2="coords(link.target).x"
      :y2="coords(link.target).y"
      :key="link.id"
      stroke="#A9A9A9"
      stroke-width="2"
    />
    <g v-for="(node) in pokemonNodes"
      :key="node.id"
      style="cursor: pointer"
    >
      <circle :cx="coords(node).x" :cy="coords(node).y" r="55" fill="#044B94" fill-opacity="0.4"/>
      <image
        :key="node.id"
        :href="node.href"
        :x="coords(node).x - HALF_IMAGE_WIDTH"
        :y="coords(node).y - HALF_IMAGE_WIDTH"
        stroke="white" stroke-width="1"
      />
      <foreignObject 
          :x="coords(node).x - HALF_IMAGE_WIDTH" 
          :y="coords(node).y - HALF_IMAGE_WIDTH" 
          :width="IMAGE_WIDTH" 
          :height="IMAGE_WIDTH" 
          alignment-baseline="baseline"
        >
        <div class="pokemon__texts">
        <span xmlns="http://www.w3.org/1999/xhtml" class="pokemon__order test_order" v-html="node.order"></span>
        <span xmlns="http://www.w3.org/1999/xhtml" class="pokemon__name" v-html="node.label" :title="node.name"></span>
        </div>
      </foreignObject>
    </g>
    <g v-for="(node) in pokemonTypesNodes"
      :key="node.id"
    >
    <circle :cx="coords(node).x" :cy="coords(node).y" r="70" fill="pink" fill-opacity="0.4"/>
    <text
      :key="node.id"
      :x="coords(node).x"
      :y="coords(node).y"
      text-anchor="middle"
      fill="black"
      >{{node.label}}</text>
    </g>
  </svg>
</template>
<script setup>
  import * as d3 from 'd3';
  import { defineProps, ref, computed, watch } from 'vue';

  const props = defineProps({
      pokemons: Array,
      targetPokemon: Object,
  }) 
  const IMAGE_WIDTH = 96;
  const HALF_IMAGE_WIDTH = IMAGE_WIDTH / 2;

  const graph = ref({
          nodes: [],
          links: [],
        })

  const bounds = computed(()=> {
    return {
          minX: Math.min(...graph.value.nodes.map(n => n.x)),
          maxX: Math.max(...graph.value.nodes.map(n => n.x)),
          minY: Math.min(...graph.value.nodes.map(n => n.y)),
          maxY: Math.max(...graph.value.nodes.map(n => n.y))
        }
  })
  const height = computed(()=> {
    return Math.max(document.documentElement.clientHeight * .8, window.innerHeight  * .8 || 0) - 40;
  })
  const width = computed(()=> {
    return  Math.max(document.documentElement.clientWidth  * .8, window.innerWidth  * .8 || 0);
  })
  const pokemonNodes = computed(()=> {
    return graph.value.nodes.filter((node)=>node.href)
  })
  const pokemonTypesNodes = computed(()=> {
    return graph.value.nodes.filter((node)=>!node.href)
  })
  const targetpokemonTypes = computed(()=> {
    return props.targetPokemon.types.map((type)=>type.type.name)
  })
  const coords = (linkObj)=> {
    const padding = 80;

    return  {
        x: padding + (linkObj.x - bounds.value.minX) * (width.value - 2 * padding) / (bounds.value.maxX - bounds.value.minX) || 0,
        y: padding + (linkObj.y - bounds.value.minY) * (height.value - 2 * padding) / (bounds.value.maxY - bounds.value.minY) || 0
    };
  }

  watch(()=> props.pokemons, (newValue) => {
    const pokemonNodes = newValue.map((pokemon, index) => ({
        index,
        x: 0,
        y: 0,
        id: pokemon.id,
        href: pokemon.sprites.front_default,
        types: pokemon.types,
        order: pokemon.order,
        label: pokemon.label,
        name: pokemon.name,

      }));
    const pokemonTypes = {};
      pokemonNodes.forEach((pokemon) => {
          pokemon.types
          .filter((type)=> {
            return targetpokemonTypes.value.includes(type?.type?.name)
          })
          .forEach((type, index)=> 
            pokemonTypes[type?.type?.name] = {
              label: type?.type?.name,
              index,
              x: 0,
              y: 0,
              id: `node${type?.type?.name}`,
            }
          )
    });
    const allNodes = [];
    pokemonNodes.forEach(pokemonNode=>allNodes.push(pokemonNode))
    Object.values(pokemonTypes).forEach(computedType=>allNodes.push(computedType))

    const links = []
      pokemonNodes.forEach((pokemonNode)=>{
        pokemonNode.types
        .filter((type)=> {
          return targetpokemonTypes.value.includes(type?.type?.name)
        })
        .forEach((pokemonNodeType)=> {
          const typeName = pokemonNodeType.type.name;
          links.push({
            source: pokemonTypes[typeName],
            target: pokemonNode,
            id: `${typeName}-${pokemonNode.id}`,
          })
        })
      })
    graph.value.nodes = allNodes;
    graph.value.links = links;
    d3.forceSimulation(graph.value.nodes)
      .force("charge", d3.forceManyBody())
      .force('center', d3.forceCenter(width.value / 2, width.value / 2))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
  })
    
   
</script>


<style src="./PokemonGraph.scss" lang="scss" scoped></style>
