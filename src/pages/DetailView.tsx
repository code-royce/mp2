import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemon, type Pokemon, POKEMON_COUNT } from '../pokemonAPI';

// Single Pokémon view.
function DetailView() {
    // Read the id from the /pokemon/:id route.
    const { id } = useParams();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [shiny, setShiny] = useState(false);

    // Fetch whenever the id in the URL changes, and go back to the official artwork.
    useEffect(() => {
        if (id) {
            getPokemon(id).then(p => {
                setPokemon(p);
                setShiny(false);
            });
        }
    }, [id]);

    if (!pokemon) {
        return <p>Loading...</p>;
    }

    const image = shiny
        ? pokemon.sprites.other.showdown.front_shiny
        : pokemon.sprites.other['official-artwork'].front_default;
    const types = pokemon.types.map(t => t.type.name).join(', ');
    const cry = pokemon.cries.latest;

    // Switch between the two images and play the cry on every click.
    function handleImageClick() {
        setShiny(!shiny);
        new Audio(cry).play();
    }

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
            <img src={image} alt={pokemon.name} onClick={handleImageClick} />

            {/* Height and weight come back in decimeters and hectograms. */}
            <ul>
                <li>Types: {types}</li>
                <li>Height: {pokemon.height / 10} m</li>
                <li>Weight: {pokemon.weight / 10} kg</li>
            </ul>
            <div className="detail-nav">
                <Link className="arrow prev" to={`/pokemon/${prevId}`}>❮</Link>
                <Link className="arrow next" to={`/pokemon/${nextId}`}>❯</Link>
            </div>
        </div>
    );
}

export default DetailView;
