'use client'
import Room from "@/components/room";
import Canvas from "./_components/canvas";
import { LiveblocksProvider } from "@liveblocks/react/suspense";

interface BoardIdPageProps {
  params: {
    boardId: string;
  }
}

export default function BoardIdPage({ params }: BoardIdPageProps) {
  return (
    <LiveblocksProvider throttle={16} authEndpoint={'/api/liveblocks-auth'}>
      <Room roomId={params.boardId}>
        <Canvas boardId={params.boardId} />
      </Room>
    </LiveblocksProvider>
  )
}
