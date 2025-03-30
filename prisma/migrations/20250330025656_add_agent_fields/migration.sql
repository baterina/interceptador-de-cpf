-- AlterTable
ALTER TABLE "Access" ADD COLUMN "browser" TEXT DEFAULT 'unknown';
ALTER TABLE "Access" ADD COLUMN "isBot" BOOLEAN DEFAULT false;
ALTER TABLE "Access" ADD COLUMN "os" TEXT DEFAULT 'unknown';
