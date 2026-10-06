import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPokemon, type Pokemon } from '../pokemonAPI';

// List of the first 151 Pokémon.
function ListView() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    // Fetch the whole list once.
    useEffect(() => {
        getAllPokemon().then(setPokemonList);
    }, []);

    if (pokemonList.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <ul>
            {pokemonList.map(pokemon => (
                <li key={pokemon.id}>
                    <Link to={`/pokemon/${pokemon.id}`}>
                        #{pokemon.id} {pokemon.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default ListView;
