/*
  Warnings:

  - You are about to drop the column `podcast_season_number` on the `Episode` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishedAt" DATETIME,
    "durationInSeconds" INTEGER,
    "seasonNumber" INTEGER,
    "external_guid" TEXT NOT NULL,
    "URL" TEXT
);
INSERT INTO "new_Episode" ("URL", "description", "durationInSeconds", "external_guid", "id", "publishedAt", "title") SELECT "URL", "description", "durationInSeconds", "external_guid", "id", "publishedAt", "title" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
CREATE UNIQUE INDEX "Episode_external_guid_key" ON "Episode"("external_guid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
