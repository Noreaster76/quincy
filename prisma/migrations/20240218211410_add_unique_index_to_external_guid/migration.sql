/*
  Warnings:

  - A unique constraint covering the columns `[external_guid]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Episode_external_guid_key" ON "Episode"("external_guid");
