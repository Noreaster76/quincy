import axios from 'axios';
import { parseStringPromise } from 'xml2js';

import { IRssClient } from '../interfaces/IRssClient';

export class AxiosRssClient implements IRssClient {
  async fetchFeed(url: string): Promise<any> {
    // Adjust the return type based on your parsing
    try {
      const response = await axios.get(url, { responseType: "text" });
      const result = await parseStringPromise(response.data);
      return result; // This is now a JavaScript object
    } catch (error) {
      console.error(`Failed to fetch or parse RSS feed from ${url}:`, error);
      throw error;
    }
  }
}
