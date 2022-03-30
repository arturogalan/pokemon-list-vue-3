const get = async (endpoint) => {
    const res = await fetch(`${process.env.VUE_APP_POKEMON_API_URL}${endpoint}`);
    return res.json();
}

export const httpService = {
    get
}