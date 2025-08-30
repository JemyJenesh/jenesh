-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "type" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'WAITING',
    "hostId" TEXT NOT NULL,
    "winnerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "games_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "players" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "game_players" (
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,

    PRIMARY KEY ("gameId", "playerId"),
    CONSTRAINT "game_players_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_players_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bingos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "history" JSONB NOT NULL DEFAULT [],
    "gameId" TEXT NOT NULL,
    CONSTRAINT "bingos_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "boards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cells" JSONB NOT NULL DEFAULT [],
    "playerId" TEXT NOT NULL,
    "bingoId" TEXT NOT NULL,
    CONSTRAINT "boards_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "boards_bingoId_fkey" FOREIGN KEY ("bingoId") REFERENCES "bingos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
