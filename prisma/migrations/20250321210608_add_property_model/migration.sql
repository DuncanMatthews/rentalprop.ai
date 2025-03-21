-- CreateEnum
CREATE TYPE "PropertyTypeEnum" AS ENUM ('SINGLE_UNIT', 'MULTI_UNIT');

-- CreateEnum
CREATE TYPE "UnitTypeEnum" AS ENUM ('STUDIO', 'ONE_BEDROOM', 'TWO_BEDROOM', 'THREE_BEDROOM', 'FOUR_BEDROOM', 'PENTHOUSE', 'LOFT', 'OFFICE', 'RETAIL', 'WAREHOUSE', 'COMMERCIAL');

-- CreateEnum
CREATE TYPE "UnitStatus" AS ENUM ('VACANT', 'OCCUPIED', 'MAINTENANCE', 'RESERVED');

-- CreateTable
CREATE TABLE "properties" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "propertyType" "PropertyTypeEnum" NOT NULL,
    "yearBuilt" INTEGER,
    "total_units" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "owner_id" UUID,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_images" (
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "property_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" UUID NOT NULL,
    "unit_number" TEXT NOT NULL,
    "unitType" "UnitTypeEnum" NOT NULL,
    "property_id" UUID NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" DECIMAL(3,1) NOT NULL,
    "square_feet" INTEGER NOT NULL,
    "rent" DECIMAL(10,2) NOT NULL,
    "status" "UnitStatus" NOT NULL DEFAULT 'VACANT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PropertyManagers" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_PropertyManagers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UnitTenants" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_UnitTenants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "units_property_id_unit_number_key" ON "units"("property_id", "unit_number");

-- CreateIndex
CREATE INDEX "_PropertyManagers_B_index" ON "_PropertyManagers"("B");

-- CreateIndex
CREATE INDEX "_UnitTenants_B_index" ON "_UnitTenants"("B");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyManagers" ADD CONSTRAINT "_PropertyManagers_A_fkey" FOREIGN KEY ("A") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyManagers" ADD CONSTRAINT "_PropertyManagers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UnitTenants" ADD CONSTRAINT "_UnitTenants_A_fkey" FOREIGN KEY ("A") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UnitTenants" ADD CONSTRAINT "_UnitTenants_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
