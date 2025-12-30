import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSearch } from 'react-icons/fa';



const SearchForm = ({
  type, setType,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  minBeds, setMinBeds,
  maxBeds, setMaxBeds,
  postcode, setPostcode,
  dateAfter, setDateAfter,
  dateBefore, setDateBefore,
  onSubmit,
}) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-sm sticky top-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FaSearch /> Search</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="w-full mt-1 p-2 border rounded">
            <option value="Any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Min Price</label>
            <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="£0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Price</label>
            <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="£Max" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Min Beds</label>
            <input type="number" value={minBeds} onChange={e => setMinBeds(e.target.value)} className="w-full mt-1 p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Beds</label>
            <input type="number" value={maxBeds} onChange={e => setMaxBeds(e.target.value)} className="w-full mt-1 p-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Postcode Area</label>
          <input type="text" value={postcode} onChange={e => setPostcode(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="e.g. BR1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Added Between</label>

          <div className="space-y-2">
            <DatePicker selected={dateAfter} onChange={setDateAfter}   placeholderText="Start Date" className="w-full p-2 border rounded" />
            <DatePicker selected={dateBefore} onChange={setDateBefore} placeholderText="End Date" className="w-full p-2 border rounded" />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">Search Properties</button>
      </form>
    </div>
  );
};

export default SearchForm;
