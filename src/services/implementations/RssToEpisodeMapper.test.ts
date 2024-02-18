// src/services/implementations/RssToEpisodeMapper.test.ts

import { RssToEpisodeMapper } from './RssToEpisodeMapper';

describe("RssToEpisodeMapper", () => {
  const mapper = new RssToEpisodeMapper();

  it("should correctly map an RSS item to NewEpisodeData", () => {
    const rssItem = {
      title: ["Spotify CEO Daniel Ek"],
      "itunes:season": ["12"],
      guid: [{ _: "76a5df5d-600f-493b-9b8e-791cb6ee53b3" }],
      link: ["https://www.acquired.fm/episodes/spotify-ceo-daniel-ek"],
      description: ["<p>Episode description here...</p>"],
      pubDate: ["Wed, 17 May 2023 17:32:18 -0700"],
      "itunes:duration": ["5862"],
    };

    const expected = {
      title: "Spotify CEO Daniel Ek",
      description: "<p>Episode description here...</p>",
      publishedAt: new Date("Wed, 17 May 2023 17:32:18 -0700"),
      durationInSeconds: 5862,
      podcast_season_number: 12,
      external_guid: "76a5df5d-600f-493b-9b8e-791cb6ee53b3",
      URL: "https://www.acquired.fm/episodes/spotify-ceo-daniel-ek",
    };

    const result = mapper.map(rssItem);
    expect(result).toEqual(expected);
  });
});
