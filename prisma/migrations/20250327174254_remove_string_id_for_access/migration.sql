/*
  Warnings:

  - The primary key for the `Access` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Access` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Access" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "linkId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "ipAddess" TEXT,
    "userAgent" TEXT,
    "referer" TEXT,
    CONSTRAINT "Access_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Access" ("createdAt", "id", "ipAddess", "linkId", "referer", "userAgent") SELECT "createdAt", "id", "ipAddess", "linkId", "referer", "userAgent" FROM "Access";
DROP TABLE "Access";
ALTER TABLE "new_Access" RENAME TO "Access";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
