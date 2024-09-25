import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const boards = await prisma.board.findMany();
    return NextResponse.json(boards);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch boards' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다' }, { status: 401 });
    }

    const { orgId, title } = await request.json();
    if (!orgId || !title) {
      return NextResponse.json({ error: '필수 정보가 누락되었습니다' }, { status: 400 });
    }

    const newBoard = await prisma.board.create({
      data: {
        orgId,
        title,
        authorId: userId,
        authorName: "사용자", // 실제 사용자 이름을 가져오는 로직이 필요할 수 있습니다
        imageUrl: "/logo.svg", // 기본 이미지 URL 설정
      },
    });

    console.log("생성된 보드:", newBoard);

    return NextResponse.json(newBoard, { status: 201 });
  } catch (error) {
    console.error("보드 생성 오류:", error);
    return NextResponse.json({ error: '보드 생성에 실패했습니다' }, { status: 500 });
  }
}