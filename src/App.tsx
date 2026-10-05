import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import DetailView from './pages/DetailView';
import GalleryView from './pages/GalleryView';
import ListView from './pages/ListView';

function App() {
    return (
        // Basename keeps links working under /mp2/ on GitHub Pages.
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <header>
                <h1>Pokédex</h1>

                {/* Site navigation. */}
                <nav>
                    <Link to="/">List</Link>
                    <Link to="/gallery">Gallery</Link>
                </nav>
            </header>

            {/* Swap the page based on the current URL. */}
            <main>
                <Routes>
                    <Route path="/" element={<ListView />} />
                    <Route path="/gallery" element={<GalleryView />} />
                    <Route path="/pokemon/:id" element={<DetailView />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
