'use client';

import { FormEventHandler, useEffect, useState } from "react";
import { useRenameModal } from "@/store/use-rename-modal";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function RenameModal() {
  const { isOpen, onClose, initialValues } = useRenameModal()
  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  const onSubmit: FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/boards/${initialValues.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      if (response.ok) {
        toast.success("Board renamed");
        onClose();
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Failed to rename");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit board title
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter a new title for this board
        </DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input disabled={false} required maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title" />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={'outline'}>Cancel</Button>
            </DialogClose>
            <Button disabled={false} type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}