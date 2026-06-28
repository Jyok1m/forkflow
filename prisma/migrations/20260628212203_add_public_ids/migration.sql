/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Diner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dinerId,serviceSlotId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `ServiceSlot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicId]` on the table `Table` will be added. If there are existing duplicate values, this will fail.
  - The required column `publicId` was added to the `Diner` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `Reservation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `adminId` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - The required column `publicId` was added to the `Restaurant` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `ServiceSlot` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `publicId` was added to the `Table` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Diner" ADD COLUMN     "passwordHash" TEXT,
ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "adminId" INTEGER NOT NULL,
ADD COLUMN     "publicId" TEXT NOT NULL,
ALTER COLUMN "line2" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ServiceSlot" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "publicId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Diner_publicId_key" ON "Diner"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_publicId_key" ON "Reservation"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_dinerId_serviceSlotId_key" ON "Reservation"("dinerId", "serviceSlotId");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_publicId_key" ON "Restaurant"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceSlot_publicId_key" ON "ServiceSlot"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Table_publicId_key" ON "Table"("publicId");

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Diner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
