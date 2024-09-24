/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useOrganization } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export default function EmptyBoards() {
  const router = useRouter()
  const { organization } = useOrganization();
  const create = useMutation(api.board.create)
  const onClick = () => {
    if (!organization) return
    create({
      orgId: organization.id,
      title: "untitled"
    }).then((id) => {
      toast.success("Board created");
      router.push(`/board/${id}`)

    }).catch(() => toast.error("Fail to created board"))
  }
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <img src="/logo.svg" alt="empty" width={140} height={140} />
      <h2 className='text-2xl font-semibold mt-6'>Create your first board!</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Start by creating a board for your organization
      </p>
      <div className='mt-6'>
        <Button onClick={onClick} size={'lg'}>
          Create board
        </Button>
      </div>
    </div>
  )
}
