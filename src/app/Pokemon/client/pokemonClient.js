
import { httpService } from '@/app/services/http';

const getPokemonInfo = (pokemonId) => {
    return httpService.get(`/${pokemonId}`);
}

export const pokemonClient = {
    getPokemonInfo
}
