'use client';

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import ConfirmModal from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
import { Id } from "../../convex/_generated/dataModel";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"]
  id: string;
  title: string;
}

export function Actions({
  children, side, sideOffset, id, title
}: ActionsProps) {
  const { onOpen } = useRenameModal();
  const remove = useMutation(api.board.remove)

  const onCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"))
  }
  const onDelete = () => {    
    remove({
      id : id as Id<"boards">, 
    })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side} sideOffset={sideOffset}
        onClick={(e) => e.stopPropagation()} className="w-60">
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(id, title)}>
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal header="Delete board??" description="모든 컨텐츠가 삭제되며 복구할 수 없습니다." onConfirm={onDelete}>
          <Button className="p-3 cursor-pointer text-sm w-full justify-start font-normal" variant={"ghost"}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}