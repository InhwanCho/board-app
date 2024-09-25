import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();
    const favorite = await prisma.userFavorite.findFirst({
      where: { userId, boardId: params.id },
    });

    if (favorite) {
      await prisma.userFavorite.delete({
        where: { id: favorite.id },
      });
      return NextResponse.json({ isFavorite: false });
    } else {
      const board = await prisma.board.findUnique({
        where: { id: params.id },
        select: { orgId: true },
      });
      
      if (!board) {
        return NextResponse.json({ error: '보드를 찾을 수 없습니다' }, { status: 404 });
      }

      await prisma.userFavorite.create({
        data: {
          userId,
          boardId: params.id,
          orgId: board.orgId,
        },
      });
      return NextResponse.json({ isFavorite: true });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to toggle favorite' }, { status: 500 });
  }
}