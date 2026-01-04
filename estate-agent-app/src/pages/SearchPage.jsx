import { useSearchAndFavourites } from '../utils/SearchAndFavouritesHook.js';
import FavouritesPanel from '../components/FavouritesPanel.jsx';
import SearchForm from '../components/SearchForm.jsx';
import ResultsGrid from '../components/ResultsGrid.jsx';

// --- Main Page Component ---
const SearchPage = () => {
    const {
        filteredProps,
        favourites,
        type, setType,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        minBeds, setMinBeds,
        maxBeds, setMaxBeds,
        postcode, setPostcode,
        dateAfter, setDateAfter,
        dateBefore, setDateBefore,
        handleSearch,
        addFavourite,
        removeFavourite,
        clearFavourites
    } = useSearchAndFavourites();

    return (
        <div className="container mx-auto p-4 min-h-screen">

            {/* Responsive Layout: Stacked on Mobile, 3-Col Grid on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Column: Search Form */}
                <div className="lg:col-span-1">
                    <SearchForm
                        type={type}
                        setType={setType}
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        minBeds={minBeds}
                        setMinBeds={setMinBeds}
                        maxBeds={maxBeds}
                        setMaxBeds={setMaxBeds}
                        postcode={postcode}
                        setPostcode={setPostcode}
                        dateAfter={dateAfter}
                        setDateAfter={setDateAfter}
                        dateBefore={dateBefore}
                        setDateBefore={setDateBefore}
                        onSubmit={handleSearch}
                    />
                </div>

                {/* Middle Column: Results */}
                <div className="lg:col-span-2">
                    <ResultsGrid
                        filteredProps={filteredProps}
                        onAddFav={addFavourite}
                        onRemoveFav={removeFavourite}
                        favourites={favourites}
                    />
                </div>

                {/* Right Column: Favourites */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4">
                        <FavouritesPanel
                            favourites={favourites}
                            removeFav={removeFavourite}
                            clearFavs={clearFavourites}
                            onDropProp={addFavourite}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;