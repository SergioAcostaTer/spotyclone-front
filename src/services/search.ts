import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../consts';

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
}

async function search(title: string): Promise<Track[]> {
  if (!title) return []
  const url = `${BASE_URL}/search/${encodeURIComponent(title)}`;
  
  try {
    const response: AxiosResponse<Track[]> = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error searching: ${(error as Error).message}`);
  }
}

export { search };
