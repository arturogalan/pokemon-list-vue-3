import {screen, render, cleanup} from '@testing-library/vue';
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
        id: pokemonId, 
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

describe('Pokemons view', () => {    
    beforeEach(async () => {
      await customRender()
    })
    afterEach(() => {
      cleanup()
    })
    it('Should render an input', async () => {

        const inputText = await screen.findByPlaceholderText('Write a pokemon numer, name or type.');

        expect(inputText).toBeInTheDocument();
    })

    it('Should load 151 images (pokemons)', async () => {
        customRender()

        const images = await screen.findAllByAltText(/bulbasaur/);
        expect(images.length).toEqual(151)
    })

    it('Should render 1 pokemon if user search by bulbasaur/1 name', async () => {
        customRender()

        const inputText = await screen.findByPlaceholderText('Write a pokemon numer, name or type.');
        userEvent.type(inputText, 'bulbasaur/1');
        const images = await screen.findAllByAltText('bulbasaur/1');
        expect(images.length).toEqual(1)
    })

    it('Should render 151 pokemon if user search by bulbasaur name', async () => {

        const inputText = await screen.findByPlaceholderText('Write a pokemon numer, name or type.');
        userEvent.type(inputText, 'bulbasaur');
        const images = await screen.findAllByAltText(/bulbasaur/);
        expect(images.length).toEqual(151)
    })

    it('Should render 10 pokemon if user search by grass type', async () => {

        const inputText = await screen.findByPlaceholderText('Write a pokemon numer, name or type.');
        userEvent.type(inputText, 'grass');
        const images = await screen.findAllByText(/grass/);
        expect(images.length).toEqual(POKEMON_TYPE_GRASS_NUMBER);
    })


    it('Should render 1 pokemon if user search by #100 number', async () => {
      const inputText = await screen.findByPlaceholderText('Write a pokemon numer, name or type.');
      userEvent.type(inputText, '100');
      const images = await screen.findAllByAltText(/100/);
      expect(images.length).toEqual(1);
  })

  it('Should load pokemon route on pokemon click', async () => {
    customRender();
    const firstPokemonImage = await screen.findByAltText('bulbasaur/1');
    userEvent.click(firstPokemonImage);

    await screen.findAllByRole('list');

    expect(window.location.href).toContain('pokemon/1');
})

  it('Should render the list of the same type pokemons', async () => {
    await screen.findByPlaceholderText('Write a pokemon numer, name or type.')
    const firstPokemonImage = await screen.findByAltText('bulbasaur/1');
    userEvent.click(firstPokemonImage);
    await screen.findByText('Back');
    const pokemonSuggestedList = await screen.findAllByTitle('bulbasaur', {exact: false})
    expect(pokemonSuggestedList).toHaveLength(POKEMON_TYPE_GRASS_NUMBER)
})


})
