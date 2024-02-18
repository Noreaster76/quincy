/*
  Warnings:

  - You are about to drop the column `external_guid` on the `Episode` table. All the data in the column will be lost.
  - Added the required column `externalGuid` to the `Episode` table without a default value. This is not possible if the table is not empty.

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
    "externalGuid" TEXT NOT NULL,
    "URL" TEXT
);
INSERT INTO "new_Episode" ("URL", "description", "durationInSeconds", "id", "publishedAt", "seasonNumber", "title") SELECT "URL", "description", "durationInSeconds", "id", "publishedAt", "seasonNumber", "title" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
CREATE UNIQUE INDEX "Episode_externalGuid_key" ON "Episode"("externalGuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
