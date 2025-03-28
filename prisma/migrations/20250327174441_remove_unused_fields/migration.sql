/*
  Warnings:

  - You are about to drop the column `ipAddess` on the `Access` table. All the data in the column will be lost.
  - You are about to drop the column `referer` on the `Access` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `Access` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Access" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "linkId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    CONSTRAINT "Access_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Access" ("createdAt", "id", "linkId") SELECT "createdAt", "id", "linkId" FROM "Access";
DROP TABLE "Access";
ALTER TABLE "new_Access" RENAME TO "Access";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
