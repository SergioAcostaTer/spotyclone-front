import SongCard from "../components/SongCard";
import { useSearch } from "../hooks/useSearch";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const params = useParams();
  const q = typeof params.q === "string" ? params.q : "";
  const [results, loading, query, onInputChange] = useSearch(q);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };


  return (
    <div>
      <h1>Buscar</h1>

      <form className="mx-[5px]" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-white border border-gray-300 rounded-lg bg-black focus:ring-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
            value={query || ""}
            onChange={onInputChange}
            placeholder="Search..."
            required
          ></input>
        </div>
      </form>

      {!loading ? "loading" : "loaded"}

      {results.map((track) => (
        <SongCard key={track.id} song={track} />
      ))}
    </div>
  );
};

export default SearchPage;
