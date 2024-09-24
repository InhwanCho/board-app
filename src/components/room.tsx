'use client';

import Loading from "@/app/board/[boardId]/_components/loading";
import { Layer } from "@/types/canvas";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@liveblocks/react/suspense";
import { ReactNode } from "react";


interface RoomProps {
  children: React.ReactNode;
  roomId: string
  fallback?: NonNullable<ReactNode> | null
}

export default function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <RoomProvider id={roomId} initialPresence={{
      cursor: null,
      selection: [],
      pencilDraft: null,
      penColor: null,
    }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList([]),
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}


