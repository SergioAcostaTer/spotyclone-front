import React from "react";
import usePlayer from "../hooks/usePlayer";
import Playlist from "../components/Playlist";

const Saved: React.FC = () => {
  const [likedSongs, nextSong, prevSong] = usePlayer((state) => [
    state.likedSongs,
    state.nextSong,
    state.prevSong,
  ]);

  return (
    <div className="w-full">
      <h2 onClick={prevSong}>prev</h2>
      <h2 onClick={nextSong}>next</h2>

      <Playlist songs={likedSongs} title="Liked" />
    </div>
  );
};

export default Saved;
