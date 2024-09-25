import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVEBLOCK_SECRET_KEY!,
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();
  if (!authorization || !user) {
    return new Response("인증되지 않은 사용자입니다", { status: 403 });
  }

  const { room } = await request.json();
  const board = await prisma.board.findUnique({
    where: { id: room }
  });

  if (!board || board.orgId !== authorization.orgId) {
    return new Response("권한이 없습니다", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Anonymous",
    picture: user.imageUrl,
  };
  const session = liveblocks.prepareSession(user.id, { userInfo });
  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}