import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async (url = BASE_URL) => {
    const response = await axios.get(url);
    if (response && response.data) {
        return response.data;
    }
    return;
}

export const fetchCharacter = async (id) => {
    const response = await axios.get(BASE_URL + `/${id}`);
    if (response && response.data) {
        return response.data;
    }
    return;
}