import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch, searchTerm, extraClasses }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleChange = (event) => {
    const term = event.target.value;
    setLocalSearchTerm(term);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        onSearch(localSearchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [localSearchTerm, onSearch, searchTerm]);

  return (
    <div
      onSubmit={handleSubmit}
      className={`relative items-center align-middle flex gap-1`}
    >
      <input
        id="search"
        type="text"
        placeholder="Search..."
        className={`w-full md:w-100 p-2 border border-gray-300 rounded-md focus:outline-none text-black ${extraClasses}`}
        value={localSearchTerm}
        onChange={handleChange}
        autoFocus={true}
      />
    </div>
  );
}
