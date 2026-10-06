import axios from 'axios';

// Only the fields we use; the rest of the response is ignored.
export interface Pokemon {
    abilities: { ability: { name: string } }[];
    base_experience: number;
    cries: { latest: string };
    height: number;
    id: number;
    name: string;
    sprites: {
        other: {
            'official-artwork': { front_default: string },
            'showdown': { front_default: string }
        }
    };
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

export const POKEMON_COUNT = 151;

// Saved after the first successful fetch.
let allPokemon: Pokemon[] | null = null;

// Fetch the first 151 Pokémon.
export async function getAllPokemon(): Promise<Pokemon[]> {
    if (allPokemon) {
        return allPokemon;
    }

    const ids: string[] = [];
    for (let i = 1; i <= POKEMON_COUNT; i++) {
        ids.push(String(i));
    }

    allPokemon = await Promise.all(ids.map(getPokemon));
    return allPokemon;
}
