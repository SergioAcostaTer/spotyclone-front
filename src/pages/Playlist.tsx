import { useState } from "react";
import SongCard from "../components/SongCard";
import { Track } from "../services/search";
import usePlayer from "../hooks/usePlayer";
import { useParams } from "react-router-dom";

const Playlist = () => {
  const [shuffle, setShuffle] = useState(true);
  const [played, setPlayed] = useState(false);
  const [play, pause, playing, playPlaylist, playlists, playPlaylistRandom] =
    usePlayer((state) => [
      state.play,
      state.pause,
      state.isPlaying,
      state.playPLaylist,
      state.playlists,
      state.playPLaylistRandom
    ]);

  const name = useParams().name;
  const title: string = name ? name : "";
  const songs: Track[] = playlists[title];

  const handlePlay = () => {
    if (playing) {
      pause();
    } else {
      if (played) {
        play();
      } else {
        if(shuffle){
          playPlaylistRandom(title);
        }
        else{
          playPlaylist(title);
        }
        setPlayed(true);
      }
    }
  };

  return (
    <div className="w-full">
      <h1>{title}</h1>

      <div className="w-full flex justify-end px-4 items-center gap-4">
        {shuffle ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width=" 26"
            height="26"
            fill="green"
            viewBox="0 0 16 16"
            onClick={() => setShuffle(!shuffle)}
          >
            <path
              fill-rule="evenodd"
              d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
            />
            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
          </svg>
        ) : (
          <svg
            onClick={() => setShuffle(!shuffle)}
            xmlns="http://www.w3.org/2000/svg"
            width=" 26"
            height="26"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
            />
            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
          </svg>
        )}
        <div className="w-[40px] h-[40px] rounded-full bg-green-500 flex items-center justify-center">
          {playing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width=" 26"
              height="26"
              fill="currentColor"
              viewBox="0 0 16 16"
              onClick={handlePlay}
            >
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width=" 26"
              height="26"
              fill="currentColor"
              viewBox="0 0 16 16"
              onClick={handlePlay}
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          )}
        </div>
      </div>

      {songs?.length === 0 ? (
        <p>No songs in the playlist.</p>
      ) : (
        <div className="w-full mb-[117px]">
          {songs?.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlist;
