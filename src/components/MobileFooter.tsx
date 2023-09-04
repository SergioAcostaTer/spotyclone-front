import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePlayer from "../hooks/usePlayer";
import Heart from "./Heart";
import PlayPause from "./PlayPause";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileFooter = ({ children }: MobileLayoutProps) => {
  const [
    songs,
    index,
    isPlaying,
    play,
    pause,
    playlists,
    handleShow,
    showControls,
    progress,
    setNewSongDuration,
    prev,
    next,
    addLiked,
    removeLiked,
  ] = usePlayer((state) => [
    state.songs,
    state.currentSongIndex,
    state.isPlaying,
    state.play,
    state.pause,
    state.playlists,
    state.handleControls,
    state.showControls,
    state.progress,
    state.setNewSongDuration,
    state.prevSong,
    state.nextSong,
    state.addSongToPlaylist,
    state.removeSongFromPlaylist,
  ]);
  const [userProgress, setUserProgress] = useState(progress);

  useEffect(() => {
    setUserProgress(progress);
  }, [progress]);

  const songInPlaylist = (playlistName: string, song: Track) => {
    const playlist = playlists.find(
      (playlist) => playlist.name === playlistName
    );

    if (!playlist) {
      return false;
    }

    return playlist.songs.find((s) => s?.id === song?.id) ? true : false;
    // return false
  };

  const [liked, setLiked] = useState(songInPlaylist("liked", songs[index]));

  useEffect(() => {
    setLiked(songInPlaylist("liked", songs[index]));
  }, [playlists]);

  const handleLike = () => {
    if (liked) {
      removeLiked("liked", songs[index]);
    } else {
      addLiked("liked", songs[index]);
    }

    setLiked(!liked);
  };

  useEffect(() => {
    if (songInPlaylist("liked", songs[index])) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [index, songs]);


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
      <div
        className="fixed bottom-0 w-full"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
        }}
      >
        {songs[index] && (
          <div className="h-[53px] w-full px-2">
            <div
              className="w-full h-full flex justify-between p-[5px] rounded-[6px]"
              style={{ backgroundColor: songs[index]?.color }}
            >
              <div className="flex w-full" onClick={handleShow}>
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

      <div
        className="fixed bottom-[-100vh] w-[100vw] h-[100vh] transition-all duration-100 ease-in-out flex justify-center"
        style={{
          bottom: showControls ? "0" : "-100vh",
          background: songs[index]?.color,
        }}
      >
        <div className="w-[90%]">
          <div className="w-full h-[53px] px-2">
            <p onClick={handleShow}>Close</p>
          </div>

          <div className="w-full flex items-center justify-center flex-col mt-10">
            <img
              src={songs[index]?.thumbnail}
              className=" h-[90%] rounded-md object-contain"
            ></img>

            <div className="flex justify-between w-full mt-8">
              <div>
                <h1 className="text-xl">{songs[index]?.title}</h1>
                <p className="text-lg">{songs[index]?.artist}</p>
              </div>
              <Heart onClick={handleLike} fill={liked} />
            </div>

            <div className="flex items-center justify-center w-full flex-col flex">
              <input
                type="range"
                min={0}
                max={songs[index]?.duration?.youtube}
                value={userProgress}
                onChange={(e) => {
                  setNewSongDuration(parseInt(e.target.value));
                  setUserProgress(parseInt(e.target.value));
                }}
                className="w-full"
              />

              <div className="w-full flex justify-between mt-2">
                <p>{`${Math.floor(progress / 60)}:${
                  progress % 60 < 10
                    ? `0${Math.floor(progress % 60)}`
                    : `${Math.floor(progress % 60)}`
                }`}</p>

                <p>{`${Math.floor(songs[index]?.duration?.youtube / 60)}:${
                  songs[index]?.duration?.youtube % 60 < 10
                    ? `0${Math.floor(songs[index]?.duration?.youtube % 60)}`
                    : `${Math.floor(songs[index]?.duration?.youtube % 60)}`
                }`}</p>
              </div>
            </div>

            <div className="flex items-center justify-center w-full">
              <p onClick={prev}>Prev</p>
              <p onClick={handlePlayPause}>Play/Pause</p>
              <p onClick={next}>Next</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
