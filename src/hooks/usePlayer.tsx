import { Track } from "../services/search";
import { ToSave } from "../types";
import { create } from "zustand";

interface PlayerState {
  likedSongs: Track[];
  songs: ToSave[];
  currentSongIndex: number;
  isPlaying: boolean;
  addSong: (song: ToSave) => void;
  setActualSong: (song: ToSave) => void;
  nextSong: () => void;
  prevSong: () => void;
  play: () => void;
  pause: () => void;
  shuffle: () => void;
  addLikedSong: (song: Track) => void;
  removeLikedSong: (song: Track) => void;
}

const storedLikedSongsString = localStorage.getItem("liked");
const storedLikedSongs = storedLikedSongsString ? JSON.parse(storedLikedSongsString) : [];


const usePlayer = create<PlayerState>((set) => ({
  songs: [],
  currentSongIndex: 0,
  isPlaying: false,
  addSong: (song) => {
    set((state) => ({ songs: [...state.songs, song] }));
  },
  setActualSong: (song) => {
    set((state) => ({
      ...state,
      songs: [
        song,
        ...state.songs.slice(0, state.currentSongIndex),
        ...state.songs.slice(state.currentSongIndex + 1),
      ],
      currentSongIndex: 0,
      isPlaying: true,
    }));
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
    set((state) => {
      console.log(state.songs);
      return { ...state, isPlaying: true };
    });
  },
  pause: () => {
    set((state) => ({ ...state, isPlaying: false }));
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
}));

export default usePlayer;
