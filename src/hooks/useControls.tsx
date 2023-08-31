import usePlayer from "../hooks/usePlayer";
import { SearchResult, ToSave, Youtube } from "../types";
import { Track } from "../services/search";
import { getYT } from "../services/getFromYt";

interface ControlFunctions {
  addSong: (spotify: Track, youtube: SearchResult) => void;
  addAndPlay: (spotify: Track) => void;
  play: () => void;
  pause: () => void;
  nextSong: () => void;
  prevSong: () => void;
  getLikedSongs: () => ToSave[];
  addLikedSong: (song: ToSave) => void;
  removeLikedSong: (song: ToSave) => void;
  handleLikeSong: (song: ToSave) => void;
}

const useControl = (): ControlFunctions => {
  const [addNP, add, addLikedSongToPlayer, removeLikedSongFromPlayer] =
    usePlayer((state) => [
      state.setActualSong,
      state.addSong,
      state.addLikedSong,
      state.removeLikedSong,
    ]);
  const [isPlaying] = usePlayer((state) => [state.isPlaying]);

  const mountSong = (spotify: Track): Promise<ToSave> => {
    return getYT({
      title: spotify.title,
      artist: spotify.artist,
      duration: spotify.duration / 1000,
    }).then((youtube: Youtube) => {
      const toSave: ToSave = {
        title: spotify.title,
        artist: spotify.artist,
        allArtists: [],
        spotifyUrl: spotify.spotifyUrl,
        id: spotify.id,
        thumbnail: spotify.thumbnail,
        thumbnailSmall: spotify.thumbnailSmall,
        url: youtube.url,
        views: youtube.views,
        duration: youtube.duration,
        popularity: spotify.popularity,
        color: spotify.color,
      };
      return toSave;
    });
  };

  const addSong = async (spotify: Track) => {
    const song = await mountSong(spotify);
    add(song);
  };

  const addAndPlay = async (spotify: Track) => {
    console.log(spotify);
    const song = await mountSong(spotify);
    console.log(song); //return undefined
    addNP(song);
  };

  const play = () => {
    if (!isPlaying) {
      usePlayer.getState().play();
    }
  };

  const pause = () => {
    if (isPlaying) {
      console.log("pause");
      usePlayer.getState().pause();
    }
  };

  const nextSong = () => {
    usePlayer.getState().nextSong();
  };

  const prevSong = () => {
    usePlayer.getState().prevSong();
  };

  const getLikedSongs = () => {
    return usePlayer.getState().likedSongs;
  };

  const addLikedSong = (song: ToSave) => {
    addLikedSongToPlayer(song);
  };

  const removeLikedSong = (song: ToSave) => {
    removeLikedSongFromPlayer(song);
  };

  const handleLikeSong = (song: ToSave) => {
    if (usePlayer.getState().likedSongs.includes(song)) {
      removeLikedSong(song);
    } else {
      addLikedSong(song);
    }
  };
  

  return {
    addAndPlay,
    play,
    pause,
    nextSong,
    prevSong,
    addSong,
    getLikedSongs,
    addLikedSong,
    removeLikedSong,
    handleLikeSong
  };
};

export default useControl;
