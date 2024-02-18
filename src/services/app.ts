import { AxiosRssClient } from './implementations/AxiosRssClient';

async function main() {
  const rssClient = new AxiosRssClient();
  const feedData = await rssClient.fetchFeed("https://example.com/rss");
  console.log(feedData);
}

main().catch(console.error);
