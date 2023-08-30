import axios, { AxiosResponse } from 'axios';
import { SearchParameters, Youtube } from '../types';
import { BASE_URL } from '../consts';


async function getYT(params: SearchParameters): Promise<Youtube> {
  const { title, artist, duration } = params;

  const url = `${BASE_URL}/search/${encodeURIComponent(title)}/${encodeURIComponent(artist)}/${duration}`;
  
  try {
    const response: AxiosResponse<Youtube> = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error searching for song: ${(error as Error).message}`);
  }
}

export { getYT };
