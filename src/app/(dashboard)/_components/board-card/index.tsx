/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link";
import Overlay from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns"
import Footer from "./footer";
import { ko } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { Id } from "../../../../../convex/_generated/dataModel";


interface BoardCardProps {
  id: string;
  title: string
  imageUrl: string
  authorId: string
  authorName: string
  createdAt: number
  orgId: string
  isFavorite: boolean
}

export default function BoardCard({
  id, title, imageUrl, authorId, authorName, createdAt, orgId, isFavorite
}: BoardCardProps) {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ko
  })
  
  const onFavorite = useMutation(api.board.favorite)
  const onUnFavorite = useMutation(api.board.unFavorite)
  const toggleFavotie = () => {
    if (isFavorite) {
      onUnFavorite({ id : id as Id<"boards"> }).catch(() => toast.error("Failed to unfavorite"))
    } else {
      onFavorite({ id : id as Id<"boards">, orgId }).catch(() => toast.error("Failed to favorite"))
    }
  }
  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <img src={imageUrl} alt={title} className="absolute inset-0 object-fill w-full h-full" />
          {/* <Image src={imageUrl} alt={title} className="object-fill" fill/> */}
          <Overlay />
          <Actions
            id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavotie}
          disabled={false}
        />
      </div>
    </Link>

  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg justify-between">
      <Skeleton className="w-full h-full" />
    </div>
  )
}
