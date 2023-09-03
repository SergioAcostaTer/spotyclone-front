import usePlayer from "../hooks/usePlayer";
import React, { useEffect } from "react";
import ReactPlayer from "react-player";

const MusicPlayer = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, currentSongIndex, songs, nextSong, setProgress] = usePlayer((state) => [
    state.isPlaying,
    state.currentSongIndex,
    state.songs,
    state.nextSong,
    state.setProgress,
  ]);

  useEffect(() => {
    console.log(isPlaying, songs, currentSongIndex);
  }, [isPlaying, songs, currentSongIndex]);

  return (
    <>
      <ReactPlayer
        width={0}
        height={0}
        playing={isPlaying}
        url={songs?.[currentSongIndex]?.url}
        onEnded={nextSong}
        playsInline
        onProgress={(state) => {
          setProgress(state.playedSeconds);
        }}
        progressInterval={500}
        loop={songs?.length == 1 ? true : false}
      />
      {children}
    </>
  );
};

export { MusicPlayer };
