import { useEffect, useState } from "react";
import { Track } from "../services/search";
import Heart from "./Heart";
import usePlayer from "../hooks/usePlayer";

interface Props {
  song: Track;
}

const SongCard = ({ song }: Props) => {
  const [addAndPlay, addLiked, removeLiked, songs, index, playlists] =
    usePlayer((state) => [
      state.addAndPlay,
      state.addSongToPlaylist,
      state.removeSongFromPlaylist,
      state.songs,
      state.currentSongIndex,
      state.playlists,
    ]);

  const songInPlaylist = (playlistName: string, song: Track) => {
    const playlist = playlists.find(
      (playlist) => playlist.name === playlistName
    );

    if (!playlist) {
      return false;
    }

    return playlist.songs.find((s) => s.id === song.id) ? true : false;
  };

  const [liked, setLiked] = useState(songInPlaylist("liked", song));

  const handleLikeSong = (song: Track) => {
    if (songInPlaylist("liked", song)) {
      removeLiked("liked", song);
    } else {
      addLiked("liked", song);
    }
  };

  useEffect(() => {
    if (songInPlaylist("liked", song)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [index, songs]);

  const [sounding, setSounding] = useState(
    songs[index]?.id == song?.id ? true : false
  );

  useEffect(() => {
    setSounding(songs[index]?.id == song?.id ? true : false);
  }, [index, songs]);

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
          <h2
            className="text-sm font-medium"
            style={{ color: sounding ? "green" : "white" }}
          >
            {song.title}
          </h2>
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
