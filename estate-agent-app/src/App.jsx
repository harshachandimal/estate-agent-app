import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // Import the new component
import SearchPage from './components/SearchPage';
import PropertyPage from './components/PropertyPage';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            {/* Add the basename here! */}
            <BrowserRouter basename="/estate-agent-app">
                <NavBar />
                <div className="pt-4 min-h-screen bg-gray-100">
                    <Routes>
                        <Route path="/" element={<SearchPage />} />
                        <Route path="/property/:id" element={<PropertyPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </DndProvider>
    );
}

export default App;