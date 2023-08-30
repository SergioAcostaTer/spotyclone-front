import SongCard from "../components/SongCard";
import { useSearch } from "../hooks/useSearch";
import { Link, useParams } from "react-router-dom";

const SearchPage = () => {
  const params = useParams();
  const q = typeof params.q === "string" ? params.q : "";
  const [results, loading, query, onInputChange] = useSearch(q);

  return (
      <div>
        <h1>Search Results for: {q}</h1>

        <Link to={"/"}>
            Home
        </Link>

        <input
          type="text"
          value={query || ""}
          onChange={onInputChange}
          placeholder="Search..."
        />

        <p>{loading && "loading"}</p>
        {results.map((track) => (
          <SongCard key={track.id} song={track}/>
        ))}
      </div>
  );
};

export default SearchPage;
