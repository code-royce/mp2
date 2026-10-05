import { useParams } from 'react-router-dom';

// Single Pokémon view (placeholder).
function DetailView() {
    // Read the id from the /pokemon/:id route.
    const { id } = useParams();

    return (
        <h2>Pokémon #{id}</h2>
    );
}

export default DetailView;
