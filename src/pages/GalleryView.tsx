import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPokemon, type Pokemon } from '../pokemonAPI';

// Image gallery of the first 151 Pokémon.
function GalleryView() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    // List of selected types, e.g. ["fire", "water"].
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    // true = must have ALL checked types.
    // false = ANY checked type.
    const [matchAll, setMatchAll] = useState(false);

    // Fetch the whole list once.
    useEffect(() => {
        getAllPokemon().then(setPokemonList);
    }, []);

    if (pokemonList.length === 0) {
        return <p>Loading...</p>;
    }

    // Collect every type name that appears, without repeats.
    const allTypes: string[] = [];
    for (const pokemon of pokemonList) {
        for (const t of pokemon.types) {
            if (!allTypes.includes(t.type.name)) {
                allTypes.push(t.type.name);
            }
        }
    }
    allTypes.sort();

    // Add the type if it's not checked, remove it if it is.
    function toggleType(type: string) {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(t => t !== type));
        } else {
            setSelectedTypes(selectedTypes.concat(type));
        }
    }

    // Show all if nothing chekcked.
    // Otherwise keep Pokémon with any (or all) checked types.
    let shown = pokemonList;
    if (selectedTypes.length > 0) {
        shown = pokemonList.filter(pokemon => {
            const names = pokemon.types.map(t => t.type.name);
            return matchAll
                ? selectedTypes.every(type => names.includes(type))
                : selectedTypes.some(type => names.includes(type));
        });
    }

    return (
        <div>
            <div className="type-filters">
                {allTypes.map(type => (
                    <label key={type}>
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleType(type)}
                        />
                        {type}
                    </label>
                ))}
                <button className="match" onClick={() => setMatchAll(!matchAll)}>
                    {matchAll ? 'Match all' : 'Match any'}
                </button>
            </div>

            <div className="gallery">
                {shown.map(pokemon => (
                    <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
                        <img
                            src={pokemon.sprites.other['showdown'].front_default}
                            alt={pokemon.name}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default GalleryView;
