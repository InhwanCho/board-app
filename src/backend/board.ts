import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const images = ["/logo.svg", "/logo.svg"];

export const create = async (
  orgId: string,
  title: string,
  userId: string,
  userName: string
) => {
  const board = await prisma.board.create({
    data: {
      title,
      orgId,
      authorId: userId,
      authorName: userName,
      imageUrl: images[0],
    },
  });
  return board;
};

export const remove = async (id: string, userId: string) => {
  const existingFavorite = await prisma.userFavorite.findFirst({
    where: {
      userId,
      boardId: id,
    },
  });

  if (existingFavorite) {
    await prisma.userFavorite.delete({
      where: {
        id: existingFavorite.id,
      },
    });
  }

  await prisma.board.delete({
    where: {
      id,
    },
  });
};

export const update = async (id: string, title: string) => {
  if (!title.trim()) {
    throw new Error("Title is required");
  }
  if (title.length > 60) {
    throw new Error("Title cannot be longer than 60 characters");
  }

  const board = await prisma.board.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });
  return board;
};

export const favorite = async (id: string, orgId: string, userId: string) => {
  const board = await prisma.board.findUnique({
    where: {
      id,
    },
  });
  if (!board) {
    throw new Error("Board not found");
  }

  const existingFavorite = await prisma.userFavorite.findFirst({
    where: {
      userId,
      boardId: id,
    },
  });

  if (existingFavorite) {
    throw new Error("Board already favorited");
  }

  await prisma.userFavorite.create({
    data: {
      userId,
      boardId: id,
      orgId,
    },
  });

  return board;
};

export const unFavorite = async (id: string, userId: string) => {
  const board = await prisma.board.findUnique({
    where: {
      id,
    },
  });
  if (!board) {
    throw new Error("Board not found");
  }

  const existingFavorite = await prisma.userFavorite.findFirst({
    where: {
      userId,
      boardId: id,
    },
  });

  if (!existingFavorite) {
    throw new Error("Favorited board not found");
  }
  await prisma.userFavorite.delete({
    where: {
      id: existingFavorite.id,
    },
  });

  return board;
};

export const get = async (id: string) => {
  const board = await prisma.board.findUnique({
    where: {
      id,
    },
  });
  return board;
};