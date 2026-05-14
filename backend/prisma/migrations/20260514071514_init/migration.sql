-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "familyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "families" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "families_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "paidByUserId" INTEGER NOT NULL,
    "familyId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "dueDay" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "defaultPayerId" INTEGER,
    "familyId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill_payments" (
    "id" SERIAL NOT NULL,
    "billId" INTEGER NOT NULL,
    "paidByUserId" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paidDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "bill_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "families_inviteCode_key" ON "families"("inviteCode");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_paidByUserId_fkey" FOREIGN KEY ("paidByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_defaultPayerId_fkey" FOREIGN KEY ("defaultPayerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payments" ADD CONSTRAINT "bill_payments_billId_fkey" FOREIGN KEY ("billId") REFERENCES "bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payments" ADD CONSTRAINT "bill_payments_paidByUserId_fkey" FOREIGN KEY ("paidByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
