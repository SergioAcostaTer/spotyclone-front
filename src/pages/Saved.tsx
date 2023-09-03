import React from "react";
import usePlayer from "../hooks/usePlayer";
import PlaylistButton from "../components/PlaylistButton";
import { playlist } from "../services/playlist";

const Saved: React.FC = () => {
  const [playlists, newPlaylist] = usePlayer((state) => [
    state.playlists,
    state.addNewPlaylist,
  ]);

  const [query, setQuery] = React.useState<string>("");

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const addPlaylist = (link:string) => {
    playlist(link).then((data) => {
      console.log(data);
      newPlaylist(data.name, data.tracks);
    });
  };

  return (
    <div className="w-full">
      
      <form className="mx-[5px]" onSubmit={() => addPlaylist(query)}>
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

      <button onClick={() => addPlaylist(query)}>Add</button>

      {Object.keys(playlists).map((key) => {
        return <PlaylistButton key={key} name={key} />;
      })}
    </div>
  );
};

export default Saved;
