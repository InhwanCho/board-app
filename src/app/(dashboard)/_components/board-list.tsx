'use client';

import { useEffect, useState } from 'react';
import { Board } from '@prisma/client';
import NewBoardButton from './new-board-button';
import BoardCard from './board-card';

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  }
}

export default function BoardList({ orgId, query }: BoardListProps) {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch(`/api/boards?orgId=${orgId}&search=${query.search || ''}&favorites=${query.favorites || ''}`);
      const data = await response.json();
      setBoards(data);
    };
    fetchBoards();
  }, [orgId, query]);

  return (
    <div>
      <h2 className='text-3xl'>{query.favorites ? "즐겨찾기한 보드" : "팀 보드"}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
        <NewBoardButton orgId={orgId} />
        {boards.map((board) => (
          <BoardCard key={board.id}
            id={board.id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={new Date(board.createdAt).getTime()}
            orgId={board.orgId}
            isFavorite={false} 
          />
        ))}
      </div>
    </div>
  )
}