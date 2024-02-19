import axios from 'axios';
import { parseStringPromise } from 'xml2js'; // Import the promise-based parser

export class AxiosRssClient {
  async fetchFeed(url: string): Promise<any> {
    // Consider defining a more specific type based on the expected structure of the RSS feed
    try {
      const response = await axios.get(url, { responseType: "text" });
      const parsedData = await parseStringPromise(response.data);
      return parsedData.rss.channel[0].item;
    } catch (error) {
      console.error(`Failed to fetch or parse RSS feed from ${url}:`, error);
      throw error;
    }
  }
}
