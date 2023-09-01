import React from "react";
import usePlayer from "../hooks/usePlayer";
import SongCard from "../components/SongCard";

const Saved: React.FC = () => {
    const [playLiked, shuffle, likedSongs, nextSong, prevSong] = usePlayer(
    (state) => [
      state.playLiked,
      state.shuffle,
      state.likedSongs,
      state.nextSong,
      state.prevSong,
    ]
  );

  return (
    <div className="w-full">
      <h1>Liked Songs</h1>
      <h2 onClick={prevSong}>prev</h2>

      <h2 onClick={playLiked}>Play all</h2>
      <h2 onClick={nextSong}>next</h2>
      <h2 onClick={shuffle}>shuffle</h2>

      {likedSongs.length === 0 ? (
        <p>No liked songs available.</p>
      ) : (
        <div className="w-full">
          {[...likedSongs].map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
