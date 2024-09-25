import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const board = await prisma.board.findUnique({
      where: { id: params.id },
    });
    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }
    return NextResponse.json(board);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch board' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title } = await request.json();
    const updatedBoard = await prisma.board.update({
      where: { id: params.id },
      data: { title },
    });
    return NextResponse.json(updatedBoard);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update board' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.board.delete({
      where: { id: params.id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete board' }, { status: 500 });
  }
}