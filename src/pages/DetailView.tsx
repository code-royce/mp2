import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemon, type Pokemon } from '../pokemonAPI';

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
        </div>
    );
}

export default DetailView;
