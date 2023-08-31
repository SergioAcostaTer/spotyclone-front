import { useState } from "react";
import useControl from "../hooks/useControls";
import { Track } from "../services/search";

interface Props {
  song: Track;
}

const SongCard = ({ song }: Props) => {
  const { addAndPlay, handleLikeSong, getLikedSongs } = useControl();
  const [liked, setLiked] = useState(getLikedSongs().find(e => e.id == song.id) ? true : false);


  const handleLike = () => {
    handleLikeSong(song);
    setLiked(!liked)
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-200">
      <div className="flex w-full" onClick={() => addAndPlay(song)}>
        <img
          src={song.thumbnail}
          alt={`${song.title} Thumbnail`}
          className="w-16 h-16 rounded-md"
        />
        <div className="flex-grow ml-2">
          <h2 className="text-lg font-medium">{song.title}</h2>
          <p className="text-gray-500">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2" onClick={handleLike}>
        {liked ? "liked" : "not liked"}
      </div>
    </div>
  );
};

export default SongCard;
