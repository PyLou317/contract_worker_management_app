import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="relative items-center align-middle flex gap-1 mb-4">
      <input
        id="search"
        type="text"
        placeholder="Search..."
        className="w-full md:w-100 p-2 border border-gray-300 rounded-md focus:outline-none"
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="px-4 p-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
