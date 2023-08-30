import useControl from "../hooks/useControls";
import usePlayer from "../hooks/usePlayer";
import React from "react";
import ReactPlayer from "react-player";

const MusicPlayer = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, currentSongIndex, songs] = usePlayer((state) => [
    state.isPlaying,
    state.currentSongIndex,
    state.songs,
  ]);
  const { play, pause } = useControl();

  function playPauseHandler() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }
  return (
    <>
      <div>
        <ReactPlayer
          width={0}
          height={0}
          playing={isPlaying}
          url={songs?.[currentSongIndex]?.url}
        />
        <div>
          <button onClick={playPauseHandler}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>
      {children}
    </>
  );
};

export { MusicPlayer };
