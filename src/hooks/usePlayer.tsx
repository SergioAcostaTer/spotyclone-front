import { Track } from "../services/search";
import { ToSave } from "../types";
import { create } from "zustand";
import { getYT } from "../services/getFromYt";

interface PlayerState {
  songs: ToSave[];
  queue: Track[];
  currentSongIndex: number;
  isPlaying: boolean;
  nextSong: () => void;
  prevSong: () => void;
  play: () => void;
  pause: () => void;
  shuffle: () => void;
  addAndPlay: (spotify: Track) => Promise<void>;
  addSong: (spotify: Track) => Promise<void>;
  showControls: boolean;
  handleControls: () => void;
  progress: number;
  setProgress: (progress: number) => void;
  setNewSongDuration: (duration: number) => void;
  addNewPlaylist: (playlistName: string, songs: Track[]) => void;
  playlists: { name: string; songs: Track[] }[];
  addSongToPlaylist: (playlistName: string, song: Track) => void;
  removeSongFromPlaylist: (playlistName: string, song: Track) => void;
  playPlaylistRandom: (playlistName: string) => void;
  playPlaylist: (playlistName: string) => void;
  playlistIndex: number;
  nowPlaying: string;
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
  : [
      {
        name: "liked",
        songs: [],
      },
    ];

const usePlayer = create<PlayerState>((set) => ({
  songs: [],
  currentSongIndex: 0,
  isPlaying: false,
  playlists: playlistsJSON,
  queue: [],
  playlistIndex: 4,
  nowPlaying: "",

  addSong: async (spotify: Track) => {
    const song = await mountSong(spotify);
    set((state) => ({ songs: [...state.songs, song] }));
  },
  nextSong: () => {
    set((state) => {
      if (state.queue.length > 0) {
        const mountOneMoreSong = async () => {
          const song = await mountSong(state.queue[state.playlistIndex]);
          set((state) => {
            const newSongs = [...state.songs, song];
            return {
              ...state,
              songs: newSongs,
              isPlaying: true,
              playlistIndex: state.playlistIndex + 1,
            };
          });
        };

        mountOneMoreSong();
      }

      return {
        ...state,
        currentSongIndex: (state.currentSongIndex + 1) % state.songs.length,
      };
    });
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
      const playlistIndex = state.playlists.findIndex(
        (playlist) => playlist.name === playlistName
      );

      if (playlistIndex === -1) {
        return state;
      }

      const playlist = state.playlists[playlistIndex];

      if (playlist.songs.find((s) => s.id === song.id)) {
        return state;
      }

      const newSongs = [...playlist.songs, song];
      const newPlaylists = [...state.playlists];
      newPlaylists[playlistIndex] = {
        ...playlist,
        songs: newSongs,
      };

      const finalState = {
        ...state,
        playlists: newPlaylists,
      };

      localStorage.setItem("playlists", JSON.stringify(finalState.playlists));

      return finalState;
    });
  },

  removeSongFromPlaylist: (playlistName, song) => {
    set((state) => {
      const playlistIndex = state.playlists.findIndex(
        (playlist) => playlist.name === playlistName
      );

      if (playlistIndex === -1) {
        return state;
      }

      const playlist = state.playlists[playlistIndex];
      const newSongs = playlist.songs.filter((s) => s.id !== song.id);

      const newPlaylists = [...state.playlists];
      newPlaylists[playlistIndex] = {
        ...playlist,
        songs: newSongs,
      };

      const finalState = {
        ...state,
        playlists: newPlaylists,
      };

      localStorage.setItem("playlists", JSON.stringify(finalState.playlists));

      return finalState;
    });
  },

  playPlaylist: async (playlistName) => {
    const playlist = playlistsJSON.find(
      (playlist: { name: string }) => playlist.name === playlistName
    );

    if (!playlist) {
      return;
    }

    const loadedTwoSongs = await Promise.all(
      playlist.songs.slice(0, 4).map((song: Track) => mountSong(song))
    );

    set((state) => {
      return {
        ...state,
        songs: loadedTwoSongs,
        isPlaying: true,
        queue: playlist.songs,
        nowPlaying: playlistName,
        playlistIndex: 4,
      };
    });
  },

  playPlaylistRandom: async (playlistName) => {
    const playlist = playlistsJSON.find(
      (playlist: { name: string }) => playlist.name === playlistName
    );

    if (!playlist) {
      return;
    }

    const songs = [...playlist.songs].sort(() => Math.random() - 0.5);

    const newSongs = await Promise.all(
      songs.slice(0, 4).map((song: Track) => mountSong(song))
    );

    set((state) => {
      return {
        ...state,
        songs: newSongs,
        isPlaying: true,
        queue: songs,
        nowPlaying: playlistName,
        playlistIndex: 4,
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

  addNewPlaylist: (playlistName, songs) => {
    set((state) => {
      const playlistIndex = state.playlists.findIndex(
        (playlist) => playlist.name === playlistName
      );

      if (playlistIndex !== -1) {
        return state; // Playlist with the same name already exists
      }

      const newPlaylist = {
        name: playlistName,
        songs: songs,
      };

      const newPlaylists = [...state.playlists, newPlaylist];

      const finalState = {
        ...state,
        playlists: newPlaylists,
      };

      localStorage.setItem("playlists", JSON.stringify(finalState.playlists));

      return finalState;
    });
  },
}));

export default usePlayer;
