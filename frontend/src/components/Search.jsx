import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term)
  };

  return (
    <div className="relative flex items-center">
      <input
        id="search"
        type="text"
        placeholder="Search..."
        className="w-100 mb-2 p-2 border border-gray-300 rounded-md focus:outline-none"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}
