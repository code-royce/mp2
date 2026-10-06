import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPokemon, type Pokemon } from '../pokemonAPI';

// List of the first 151 Pokémon.
function ListView() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    // Typed in the search box.
    const [search, setSearch] = useState('');

    // Which property to sort by, and which direction.
    const [sortBy, setSortBy] = useState('id');
    const [ascending, setAscending] = useState(true);

    // Fetch the whole list once.
    useEffect(() => {
        getAllPokemon().then(setPokemonList);
    }, []);

    if (pokemonList.length === 0) {
        return <p>Loading...</p>;
    }

    // Keep Pokémon whose name contains the search text.
    const shown = pokemonList.filter(pokemon =>
        pokemon.name.includes(search.toLowerCase())
        || String(pokemon.id) === search
    );

    // Sort the matches.
    shown.sort((a, b) => {
        let result;
        if (sortBy === 'name') {
            result = a.name.localeCompare(b.name);
        } else if (sortBy === 'height') {
            result = a.height - b.height;
        } else if (sortBy === 'weight') {
            result = a.weight - b.weight;
        } else {
            result = a.id - b.id;
        }
        // Flip the order for descending.
        return ascending ? result : -result;
    });

    return (
        <div>
            <input
                className="search"
                value={search}
                onChange={input => setSearch(input.target.value)}
                placeholder="Search Pokémon"
            />
            <select
                className="sort"
                value={sortBy}
                onChange={sortChoice => setSortBy(sortChoice.target.value)}
            >
                <option value="id">Number</option>
                <option value="name">Name</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
            </select>
            <button className="order" onClick={() => setAscending(!ascending)}>
                {ascending ? 'Ascending' : 'Descending'}
            </button>
            <ul>
                {shown.map(pokemon => (
                    <li key={pokemon.id}>
                        <Link to={`/pokemon/${pokemon.id}`}>
                            #{pokemon.id} {pokemon.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListView;
