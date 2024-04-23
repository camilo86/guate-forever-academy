/*
  Warnings:

  - You are about to drop the column `city` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `line1` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `line2` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "city",
DROP COLUMN "line1",
DROP COLUMN "line2",
DROP COLUMN "postalCode",
DROP COLUMN "state",
ADD COLUMN     "address" TEXT;
