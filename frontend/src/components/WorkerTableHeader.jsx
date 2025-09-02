import SearchBar from '../components/Search';

export default function WorkerTableHeader({ handleSearch, handleOpenAddWorkerModal }) {
  return (
    <div className="flex justify-between items-center gap-3">
      <SearchBar onSearch={handleSearch} />
      <button
        onClick={handleOpenAddWorkerModal}
        className="text-blue-500 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
        aria-label="Add worker"
      >
        Add Worker
      </button>
    </div>
  );
}
