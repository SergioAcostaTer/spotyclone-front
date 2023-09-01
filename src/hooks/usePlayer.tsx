import { Track } from "../services/search";
import { ToSave } from "../types";
import { create } from "zustand";
import { getYT } from "../services/getFromYt";

interface PlayerState {
  likedSongs: Track[];
  songs: ToSave[];
  currentSongIndex: number;
  isPlaying: boolean;
  nextSong: () => void;
  prevSong: () => void;
  play: () => void;
  pause: () => void;
  shuffle: () => void;
  addLikedSong: (song: Track) => void;
  removeLikedSong: (song: Track) => void;
  addAndPlay: (spotify: Track) => Promise<void>;
  handleLikeSong: (song: Track) => void;
  playLiked: () => Promise<void>;
  addSong: (spotify: Track) => Promise<void>;
}

const mountSong = async (spotify: Track): Promise<ToSave> => {
  const youtube = await getYT({
    title: spotify.title,
    artist: spotify.artist,
    duration: spotify.duration / 1000,
  });

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
};

const storedLikedSongsString = localStorage.getItem("liked");
const storedLikedSongs = storedLikedSongsString
  ? JSON.parse(storedLikedSongsString)
  : [];

const usePlayer = create<PlayerState>((set) => ({
  songs: [],
  currentSongIndex: 0,
  isPlaying: false,

  addSong: async (spotify: Track) => {
    const song = await mountSong(spotify);
    set((state) => ({ songs: [...state.songs, song] }));
  },
  nextSong: () => {
    set((state) => ({
      ...state,
      currentSongIndex: (state.currentSongIndex + 1) % state.songs.length,
    }));
  },
  prevSong: () => {
    set((state) => ({
      ...state,
      currentSongIndex:
        (state.currentSongIndex - 1 + state.songs.length) % state.songs.length,
    }));
  },
  play: () => {
    set((state) => ({
      ...state,
      isPlaying: true,
    }));
  },
  pause: () => {
    set((state) => ({
      ...state,
      isPlaying: false,
    }));
  },
  shuffle: () => {
    set((state) => {
      const shuffledSongs = [...state.songs];
      for (let i = shuffledSongs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledSongs[i], shuffledSongs[j]] = [
          shuffledSongs[j],
          shuffledSongs[i],
        ];
      }
      return {
        ...state,
        songs: shuffledSongs,
        currentSongIndex: 0,
      };
    });
  },
  likedSongs: storedLikedSongs,
  addLikedSong: (song) => {
    set((state) => {
      const updatedLikedSongs = [...state.likedSongs, song];
      localStorage.setItem("liked", JSON.stringify(updatedLikedSongs));
      return { likedSongs: updatedLikedSongs };
    });
  },
  removeLikedSong: (song) => {
    set((state) => {
      const updatedLikedSongs = state.likedSongs.filter(
        (likedSong: Track) => likedSong !== song
      );
      localStorage.setItem("liked", JSON.stringify(updatedLikedSongs));
      return { likedSongs: updatedLikedSongs };
    });
  },
  addAndPlay: async (spotify: Track) => {
    const song = await mountSong(spotify);
    set((state) => ({
      ...state,
      songs: [song, ...state.songs.slice(1)], // Replace the first song with the new one
      isPlaying: true,
    }));
  },
  handleLikeSong: (song: Track) => {
    const likedSongs = usePlayer.getState().likedSongs;
    if (likedSongs.includes(song)) {
      usePlayer.getState().removeLikedSong(song);
    } else {
      usePlayer.getState().addLikedSong(song);
    }
  },
  playLiked: async () => {
    const likedSongs = usePlayer.getState().likedSongs;
    const songsToPass = await Promise.all(
      likedSongs.map(async (song) => await mountSong(song))
    );

    try {
      set((state) => ({
        ...state,
        songs: songsToPass,
        currentSongIndex: 0,
        isPlaying: true,
      }));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  },
}));

export default usePlayer;
