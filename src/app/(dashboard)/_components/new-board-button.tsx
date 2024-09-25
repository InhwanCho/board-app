'use client';

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export default function NewBoardButton({
  orgId,
  disabled
}: NewBoardButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orgId,
          title: "Untitled"
        }),
      });
      const data = await response.json();
      router.push(`/board/${data.id}`);
    } catch (error) {
      toast.error("Failed to create board");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (disabled || isLoading) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <p className={cn(
        "text-sm text-white font-light",
        (disabled || isLoading) && "opacity-75"
      )}>
        새 보드
      </p>
    </button>
  );
}