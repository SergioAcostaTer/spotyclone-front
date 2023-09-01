import { useEffect, useState } from "react";
import { Track } from "../services/search";
import Heart from "./Heart";
import usePlayer from "../hooks/usePlayer";

interface Props {
  song: Track;
}

const SongCard = ({ song }: Props) => {
  const [likedSongs, addAndPlay, addLiked, removeLiked, songs, index] = usePlayer(state => [state.likedSongs, state.addAndPlay, state.addLikedSong, state.removeLikedSong, state.songs, state.currentSongIndex])

  const handleLikeSong = (song: Track) => {
    if (usePlayer.getState().likedSongs.includes(song)) {
      removeLiked(song);
    } else {
      addLiked(song);
    }
  };

  const [liked, setLiked] = useState(
    likedSongs.find((e) => e.id == song.id) ? true : false
  );
  const [sounding, setSounding] = useState(
    songs[index]?.id == song?.id ? true : false
  )

  useEffect(() =>{
    setSounding(songs[index]?.id == song?.id ? true : false)
  },[index,songs])

  const handleLike = () => {
    handleLikeSong(song);
    setLiked(!liked);
  };

  return (
    <div className="flex items-center px-4 bg-[#121212]">
      <div className="flex w-full py-2" onClick={() => addAndPlay(song)}>
        <img
          src={song.thumbnail}
          alt={`${song.title} Thumbnail`}
          className="w-[45px] h-[45px] rounded-md object-contain"
        />
        <div className="flex-grow ml-2">
          <h2 className="text-sm font-medium" 
          style={{color: sounding ? "green" : "white"}}>{song.title}</h2>
          <p className="text-gray-500">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Heart onClick={handleLike} fill={liked} />
        <p>...</p>
      </div>
    </div>
  );
};

export default SongCard;
