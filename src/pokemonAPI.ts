import axios from 'axios';

// Only the fields we use; the rest of the response is ignored.
export interface Pokemon {
    abilities: { ability: { name: string } }[];
    base_experience: number;
    cries: { latest: string };
    height: number;
    id: number;
    name: string;
    stats: { base_stat: number; stat: { name: string } }[];
    types: { type: { name: string } }[];
    weight: number;
}

const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2' });

// Fetch one Pokémon by id or name.
export async function getPokemon(id: string): Promise<Pokemon> {
    const response = await api.get<Pokemon>(`/pokemon/${id}`);
    return response.data;
}
