import React from "react";
import usePlayer from "../hooks/usePlayer";
import Playlist from "../components/Playlist";

const Saved: React.FC = () => {
  const [nextSong, prevSong, playlists] = usePlayer((state) => [
    state.nextSong,
    state.prevSong,
    state.playlists,
  ]);

  const songs = playlists.liked;

  return (
    <div className="w-full">
      <h2 onClick={prevSong}>prev</h2>
      <h2 onClick={nextSong}>next</h2>

      <Playlist songs={songs} title="Liked" />
    </div>
  );
};

export default Saved;
