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
        width={400}
        height={200}
        playing={isPlaying}
        url={songs?.[currentSongIndex]?.url}
        onEnded={nextSong}
        style={{
          zIndex: 100
        }}
      />
      {children}
    </>
  );
};

export { MusicPlayer };
