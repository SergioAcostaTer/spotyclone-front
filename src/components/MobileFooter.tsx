import React from "react";
import { Link } from "react-router-dom";
import usePlayer from "../hooks/usePlayer";
import useControl from "../hooks/useControls";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileFooter = ({ children }: MobileLayoutProps) => {
  const [songs, index, isPlaying] = usePlayer((state) => [
    state.songs,
    state.currentSongIndex,
    state.isPlaying,
  ]);

  const { play, pause } = useControl();

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  console.log(songs[index]?.color)

  return (
    <div>
      {children}
      <div className="fixed bottom-0 w-full">
        {songs[index] && (
          <div className="h-[53px] w-full px-2">
            <div className="w-full h-full flex justify-between p-[5px] rounded-[6px]" 
              style={{backgroundColor: songs[index]?.color}}
            >
              <div className="flex ">
                <img
                  src={songs[index]?.thumbnail}
                  className="h-full object-fit rounded"
                ></img>
                <div className="pl-[5px]">
                  <h1 className="text-sm m-0">{songs[index]?.title}</h1>
                  <p className="text- m-0">{songs[index]?.artist}</p>
                </div>
              </div>
              <p onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</p>
            </div>
          </div>
        )}

        <div className="bottom-0 left-0 w-full bg-white border-t border-gray-200 p-2 shadow-md flex justify-around mt-4">
          <Link to={"/"}>Home</Link>
          <Link to={"/search/yandel"}>Search</Link>
          <Link to={"/saved"}>Biblioteca</Link>
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
