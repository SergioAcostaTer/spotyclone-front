import { Track } from "../services/search";
import { ToSave } from "../types";
import { create } from "zustand";
import { getYT } from "../services/getFromYt";

interface PlayerState {
  songs: ToSave[];
  currentSongIndex: number;
  isPlaying: boolean;
  nextSong: () => void;
  prevSong: () => void;
  play: () => void;
  pause: () => void;
  shuffle: () => void;
  addAndPlay: (spotify: Track) => Promise<void>;
  addSong: (spotify: Track) => Promise<void>;
  addSongToPlaylist: (playlistName: string, song: Track) => void;
  removeSongFromPlaylist: (playlistName: string, song: Track) => void;
  playlists: {
    [key: string]: Track[];
  };
  playPLaylist: (playlistName: string) => void;
  showControls: boolean;
  handleControls: () => void;
  progress: number;
  setProgress: (progress: number) => void;
  setNewSongDuration: (duration: number) => void;
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
    url: `${youtube.url}&t=0`,
    views: youtube.views,
    duration: youtube.duration,
    popularity: spotify.popularity,
    color: spotify.color,
  };

  return toSave;
};

const storedPlaylist = localStorage.getItem("playlists");
const playlistsJSON = storedPlaylist
  ? JSON.parse(storedPlaylist)
  : {
      liked: [],
    };

const usePlayer = create<PlayerState>((set) => ({
  songs: [],
  currentSongIndex: 0,
  isPlaying: false,
  playlists: playlistsJSON,

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

  addAndPlay: async (spotify: Track) => {
    const song = await mountSong(spotify);
    set((state) => {
      const newSongs = [...state.songs];
      newSongs[state.currentSongIndex] = song;
      return {
        ...state,
        songs: newSongs,
        isPlaying: true,
      };
    });
  },
  addSongToPlaylist: (playlistName, song) => {
    set((state) => {
      if (!state.playlists[playlistName]) {
        state.playlists[playlistName] = [];
      }

      if (state.playlists[playlistName].find((s) => s.id === song.id)) {
        return state;
      }

      const newPlaylists = [song, ...state.playlists[playlistName]];

      const finalState = {
        ...state,
        playlists: {
          ...state.playlists,
          [playlistName]: newPlaylists,
        },
      };

      localStorage.setItem("playlists", JSON.stringify(finalState.playlists));

      return finalState;
    });
  },

  removeSongFromPlaylist: (playlistName, song) => {
    set((state) => {
      const newPlaylists = [...state.playlists[playlistName]];
      const index = newPlaylists.findIndex((s) => s.id === song.id);
      newPlaylists.splice(index, 1);

      const finalState = {
        ...state,
        playlists: {
          ...state.playlists,
          [playlistName]: newPlaylists,
        },
      };

      localStorage.setItem("playlists", JSON.stringify(finalState.playlists));

      return finalState;
    });
  },

  playPLaylist: async (playlistName) => {
    const newSongs = await Promise.all(
      playlistsJSON[playlistName].map((song: Track) => mountSong(song))
    );

    set((state) => {
      return {
        ...state,
        songs: newSongs,
        isPlaying: true,
      };
    });
  },

  showControls: false,

  handleControls: () => {
    set((state) => ({
      ...state,
      showControls: !state.showControls,
    }));
  },

  progress: 0,

  setProgress: (progress) => {
    set((state) => ({
      ...state,
      progress,
    }));
  },

  setNewSongDuration: (duration) => {
    set((state) => {
      const nowPlaying = state.songs[state.currentSongIndex];
      nowPlaying.url = nowPlaying.url.replace(/&t=\d+/, `&t=${duration}`);

      const songs = [...state.songs];
      songs[state.currentSongIndex] = nowPlaying;

      const finalState = {
        ...state,
        songs,
      };

      return finalState;
    });
  },
}));

export default usePlayer;
