-- CreateTable
CREATE TABLE "Meeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    "zoomLink" TEXT NOT NULL
);
