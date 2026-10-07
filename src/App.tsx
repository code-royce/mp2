import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
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
                    <NavLink to="/" end>List</NavLink>
                    <NavLink to="/gallery">Gallery</NavLink>
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
