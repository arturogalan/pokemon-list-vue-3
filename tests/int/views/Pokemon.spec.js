import {screen, render, cleanup, findByText} from '@testing-library/vue';
import {createStore} from 'vuex';
import {cloneDeep} from 'lodash';
import pokemonStore from '../../../src/store/pokemonStore'
import userEvent from '@testing-library/user-event'
import App from '../../../src/App.vue';
import router from '../../../src/router';

process.env.VUE_APP_POKEMON_API_URL = '';
const customRender = async () => {
  await router.push('/')
  const storeObj = () => ({
      modules: {
          pokemonStore: cloneDeep(pokemonStore)
      }
  })
  return render(App, {
      global: {
          plugins: [createStore(storeObj()), router]
      }
  })
};
const POKEMON_TYPE_GRASS_NUMBER = 10;
global.fetch = jest.fn((id) =>{
  const pokemonId = Number(id.substring(1));
  const pokemonType = pokemonId <= POKEMON_TYPE_GRASS_NUMBER ? 'grass' : 'poison'
  return Promise.resolve({
    json: () => Promise.resolve({
        id: 1, 
        name: `bulbasaur${id}`,
        order: pokemonId,
        types: [{
            type: {
                name: pokemonType
            }
        }],
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
        }
    }),
  })}
);



describe('Pokemon view', () => {    
    beforeEach(async () => {
      await customRender()
    })
    afterEach(() => {
      cleanup()
    })
    it('Should render the pokemon info', async () => {
        await screen.findByPlaceholderText('Write a pokemon numer, name or type.')
        const firstPokemonImage = await screen.findByAltText('bulbasaur/1');
        userEvent.click(firstPokemonImage);

        await screen.findByText('Back');
        const container = document.querySelector('.pokemon-card__info')
        const pokemonName = await findByText(container,'bulbasaur/1');
        const pokemonId = await findByText(container, '1');
        const pokemonTypes = await findByText(container, 'grass');

        expect(pokemonName).toBeInTheDocument();
        expect(pokemonId).toBeInTheDocument();
        expect(pokemonTypes).toBeInTheDocument();
    })

    it('Should render the pokemon info and back to the search screen', async () => {
        await screen.findByPlaceholderText('Write a pokemon numer, name or type.')
        const firstPokemonImage = await screen.findByAltText('bulbasaur/1');
        userEvent.click(firstPokemonImage);

        const backButton = await screen.findByText('Back');
        userEvent.click(backButton);

        await screen.findByPlaceholderText('Write a pokemon numer, name or type.')
        
        expect(window.location.href).toEqual('http://localhost/#/');
    })

})