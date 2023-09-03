import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../consts";

export interface Playlist {
  tracks: Track[];
  name: string;
  descriprion: string;
  image: string;
  owner: string;
}

export interface Track {
  title: string;
  artist: string;
  allArtists: string[];
  spotifyUrl: string;
  id: string;
  thumbnail: string;
  thumbnailSmall: string;
  duration: number;
  popularity: number;
  type: string;
  color: string;
}

async function playlist(link: string): Promise<Playlist> {
    console.log(link);
  if (!link)
    return { tracks: [], name: "", descriprion: "", image: "", owner: "" };

  const id = link.split("/").pop()?.split("?")[0] || "";

  const url = `${BASE_URL}/playlist/${encodeURIComponent(id)}`;

  try {
    const response: AxiosResponse<Playlist> = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error searching: ${(error as Error).message}`);
  }
}

export { playlist };
