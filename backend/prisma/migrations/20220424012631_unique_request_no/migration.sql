/*
  Warnings:

  - A unique constraint covering the columns `[request_no]` on the table `PO_Request` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PO_Request_request_no_key` ON `PO_Request`(`request_no`);
