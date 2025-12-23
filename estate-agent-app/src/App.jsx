import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage.jsx';
import PropertyPage from './components/PropertyPage.jsx';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/property/:id" element={<PropertyPage />} />
                </Routes>
            </BrowserRouter>
        </DndProvider>
    );
}
export default App;