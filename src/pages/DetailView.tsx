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

    return (
        <h2>#{pokemon.id} {pokemon.name}</h2>
    );
}

export default DetailView;
