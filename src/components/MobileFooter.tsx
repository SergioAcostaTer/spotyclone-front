import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePlayer from "../hooks/usePlayer";
import Heart from "./Heart";
import PlayPause from "./PlayPause";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileFooter = ({ children }: MobileLayoutProps) => {
  const [songs, index, isPlaying, play, pause, likedSongs] = usePlayer((state) => [
    state.songs,
    state.currentSongIndex,
    state.isPlaying,
    state.play, 
    state.pause, state.likedSongs
  ]);

  const [liked, setLiked] = useState(
    likedSongs.find((e) => e.id == songs[index]?.id) ? true : false
  );

  useEffect(() => {
    setLiked(
      likedSongs.find((e) => e.id == songs[index]?.id) ? true : false
    );
  }, [index, isPlaying]);

  useEffect(() => {
    console.log(isPlaying)
  }, [isPlaying]);

  const handleLike = () => {
    // handleLikeSong(songs[index]);
    // if (liked) {
    //   removeLikedSong(songs[index]);
    // } else {
    //   addLikedSong(songs[index]);
    // }
    setLiked(!liked);

  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <>
      {children}
      <div className="fixed bottom-0 w-full"
      style={{background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)"}}
      >
        {songs[index] && (
          <div className="h-[53px] w-full px-2">
            <div
              className="w-full h-full flex justify-between p-[5px] rounded-[6px]"
              style={{ backgroundColor: songs[index]?.color }}
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
              <div className="flex items-center">
                <Heart onClick={handleLike} fill={liked} />
                <PlayPause onClick={handlePlayPause} isPlaying={isPlaying} />
              </div>
            </div>
          </div>
        )}

        <div className="bottom-0 left-0 w-full p-2 py-4 shadow-md flex justify-around mt-2">
          <Link to={"/"}>Home</Link>
          <Link to={"/search/yandel"}>Search</Link>
          <Link to={"/saved"}>Biblioteca</Link>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
