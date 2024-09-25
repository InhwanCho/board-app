/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/ui/button'
import { useOrganization, useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function EmptyBoards() {
  const router = useRouter()
  const { organization } = useOrganization();
  const { user } = useUser();
  
  const onClick = async () => {
    if (!organization) return
    try {
      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orgId: organization.id,
          title: "Untitled"
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || '보드 생성에 실패했습니다');
      }
      toast.success("보드가 생성되었습니다");
      router.push(`/board/${data.id}`)
    } catch (error) {
      console.error("보드 생성 오류:", error);
      toast.error("보드 생성에 실패했습니다")
    }
  }

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <img src="/logo.svg" alt="empty" width={140} height={140} />
      <h2 className='text-2xl font-semibold mt-6'>보드를 만들어보세요!</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        조직을 위한 보드를 만들어보세요
      </p>
      <div className='mt-6'>
        <Button onClick={onClick} size={'lg'}>
          보드 만들기
        </Button>
      </div>
    </div>
  )
}