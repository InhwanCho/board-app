import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { Plus } from 'lucide-react';
import React from 'react'
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export default function NewBoardButton({ orgId, disabled }: NewBoardButtonProps) {
  const router = useRouter()
  const create = useMutation(api.board.create)
  const onClick = () => {
    create({
      orgId,
      title: "Untitle"
    }).then(
      (id) => {
        toast.success("Board created")
        router.push(`/board/${id}`)
      }
    ).catch(() => { toast.error("Failed to created board") })
  }

  return (
    <button disabled={disabled} onClick={onClick} className={cn(
      'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6',
      disabled && "opacity-75 hover:bg-blue-600 cursor-not-allowed")}>
      <div></div>
      <Plus className='h-12 w-12 text-white stroke-1 ' />
      <p className='text-sm text-white font-light'>
        New board
      </p>
    </button>
  )
}
