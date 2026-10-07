import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemon, type Pokemon, POKEMON_COUNT } from '../pokemonAPI';

// Single Pokémon view.
function DetailView() {
    // Read the id from the /pokemon/:id route.
    const { id } = useParams();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    // Fetch whenever the id in the URL changes.
    useEffect(() => {
        if (id) {
            getPokemon(id).then(setPokemon);
        }
    }, [id]);

    if (!pokemon) {
        return <p>Loading...</p>;
    }

    const image = pokemon.sprites.other['official-artwork'].front_default;
    const types = pokemon.types.map(t => t.type.name).join(', ');

    // Cycle through from beginning to end of list.
    let prevId = pokemon.id - 1;
    let nextId = pokemon.id + 1;
    if (prevId === 0) {
        prevId = POKEMON_COUNT;
    }
    if (nextId === POKEMON_COUNT + 1) {
        nextId = 1;
    }

    return (
        <div className="detail">
            <h2>#{pokemon.id} {pokemon.name}</h2>
            <img src={image} alt={pokemon.name} />

            {/* Height and weight come back in decimeters and hectograms. */}
            <ul>
                <li>Types: {types}</li>
                <li>Height: {pokemon.height / 10} m</li>
                <li>Weight: {pokemon.weight / 10} kg</li>
            </ul>
            <div className="detail-nav">
                <Link to={`/pokemon/${prevId}`}>Previous</Link>
                <Link to={`/pokemon/${nextId}`}>Next</Link>
            </div>
        </div>
    );
}

export default DetailView;
