/*
  Warnings:

  - You are about to drop the column `podcast_episode_number` on the `Episode` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "durationInSeconds" INTEGER NOT NULL,
    "podcast_season_number" INTEGER NOT NULL,
    "external_guid" TEXT NOT NULL,
    "URL" TEXT NOT NULL
);
INSERT INTO "new_Episode" ("URL", "description", "durationInSeconds", "external_guid", "id", "podcast_season_number", "publishedAt", "title") SELECT "URL", "description", "durationInSeconds", "external_guid", "id", "podcast_season_number", "publishedAt", "title" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
CREATE UNIQUE INDEX "Episode_external_guid_key" ON "Episode"("external_guid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
