/*
  Warnings:

  - You are about to drop the column `duration` on the `Episode` table. All the data in the column will be lost.
  - Added the required column `URL` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationInSeconds` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `external_guid` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `podcast_episode_number` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `podcast_season_number` to the `Episode` table without a default value. This is not possible if the table is not empty.

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
    "podcast_episode_number" INTEGER NOT NULL,
    "external_guid" TEXT NOT NULL,
    "URL" TEXT NOT NULL
);
INSERT INTO "new_Episode" ("description", "id", "publishedAt", "title") SELECT "description", "id", "publishedAt", "title" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
