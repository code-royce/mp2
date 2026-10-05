import { useEffect, useState } from 'react';
import { getPokemon } from '../pokemonAPI';

// Temporary test: fetch Pikachu and show its name.
function ListView() {
    // Memory for the name; starts as "Loading...".
    const [name, setName] = useState('Loading...');

    // After the page draws, fetch #25 and store its name.
    useEffect(() => {
        getPokemon('25').then(pokemon => setName(pokemon.name));
    }, []);

    return (
        <h2>{name}</h2>
    );
}

export default ListView;
