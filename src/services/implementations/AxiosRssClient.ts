import axios from 'axios';

import { IRssClient } from '../interfaces/IRssClient';

export class AxiosRssClient implements IRssClient {
  async fetchFeed(url: string): Promise<any> {
    // Consider using a specific type for the return value
    try {
      const response = await axios.get(url);
      return response.data; // You might want to parse this data depending on the RSS feed structure
    } catch (error) {
      console.error(`Failed to fetch RSS feed from ${url}:`, error);
      throw error; // Rethrow or handle as needed
    }
  }
}
