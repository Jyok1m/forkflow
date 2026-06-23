-- CreateEnum
CREATE TYPE "Period" AS ENUM ('BREAKFAST', 'BRUNCH', 'LUNCH', 'TEA', 'DINNER', 'ALL_DAY');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PREBOOKED', 'BOOKED', 'COMPLETE', 'CANCELED', 'NO_SHOW');

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceSlot" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "period" "Period" NOT NULL,
    "openingTime" TIME NOT NULL,
    "closingTime" TIME NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "ServiceSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "dinerId" INTEGER NOT NULL,
    "serviceSlotId" INTEGER NOT NULL,
    "pax" INTEGER NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diner" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Diner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Diner_email_key" ON "Diner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Diner_phone_key" ON "Diner"("phone");

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceSlot" ADD CONSTRAINT "ServiceSlot_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_dinerId_fkey" FOREIGN KEY ("dinerId") REFERENCES "Diner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_serviceSlotId_fkey" FOREIGN KEY ("serviceSlotId") REFERENCES "ServiceSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
