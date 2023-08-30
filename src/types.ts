export interface ToSave {
  title: string;
  artist: string;
  allArtists: string[];
  spotifyUrl: string;
  id: string;
  thumbnail: string;
  thumbnailSmall: string;
  url: string;
  views: number;
  duration: Duration;
  popularity: number;
}

export interface Youtube{
  title: string
  url: string
  views: number
  duration: Duration
}

export interface Duration {
  youtube: number
  spotify: number
}


export interface SearchResult {
  title: string
  artist: string
  allArtists: string[]
  spotifyUrl: string
  id: string
  thumbnail: string
  thumbnailSmall: string
  duration: number
  popularity: number
  type: string
}


export interface SearchParameters {
  title: string;
  artist: string;
  duration: number;
}