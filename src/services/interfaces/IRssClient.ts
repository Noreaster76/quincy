export interface IRssClient {
  fetchFeed(url: string): Promise<any>; // Use a more specific type instead of any if possible
}
