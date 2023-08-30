import usePlayer from "../hooks/usePlayer";
import { SearchResult, ToSave, Youtube } from "../types";
import { Track } from "../services/search";
import { getYT } from "../services/getFromYt";

interface ControlFunctions {
    addSong: (spotify: Track, youtube: SearchResult) => void; // Include this line
    addAndPlay: (spotify: Track) => void;
    play: () => void;
    pause: () => void;
    nextSong: () => void;
    prevSong: () => void;
  }
  

const useControl = (): ControlFunctions => {
  const [addNP, add] = usePlayer((state) => [state.setActualSong, state.addSong]);
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
      };
      return toSave;
    });
  };

  const addSong = async (spotify: Track) => {
    const song = await mountSong(spotify);
    add(song)
  };
  

  const addAndPlay = async (spotify: Track) => {
    console.log(spotify)
    const song = await mountSong(spotify);
    console.log(song) //return undefined
    addNP(song);
  };


  const play = () => {
    if (!isPlaying) {
      usePlayer.getState().play();
    }
  };

  const pause = () => {
    if (isPlaying) {
        console.log("pause")
      usePlayer.getState().pause();
    }
  };

  const nextSong = () => {
    usePlayer.getState().nextSong();
  };

  const prevSong = () => {
    usePlayer.getState().prevSong();
  };

  return { addAndPlay, play, pause, nextSong, prevSong, addSong };
};

export default useControl;
