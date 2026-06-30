-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "style" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "bannerUrl" DROP DEFAULT;
