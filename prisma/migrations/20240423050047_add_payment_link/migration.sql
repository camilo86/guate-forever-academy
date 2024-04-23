/*
  Warnings:

  - Added the required column `stripePaymentLink` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "stripePaymentLink" TEXT NOT NULL;
