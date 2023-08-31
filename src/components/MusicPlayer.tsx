import usePlayer from "../hooks/usePlayer";
import React from "react";
import ReactPlayer from "react-player";

const MusicPlayer = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, currentSongIndex, songs, nextSong ] = usePlayer((state) => [
    state.isPlaying,
    state.currentSongIndex,
    state.songs,
    state.nextSong
  ]);

  return (
    <>
      <ReactPlayer
        width={0}
        height={0}
        playing={isPlaying}
        url={songs?.[currentSongIndex]?.url}
        onEnded={nextSong}
      />
      {children}
    </>
  );
};

export { MusicPlayer };
