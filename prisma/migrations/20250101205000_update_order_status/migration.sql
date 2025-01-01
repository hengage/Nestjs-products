-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('REVIEW', 'PROCESSING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'REVIEW';
