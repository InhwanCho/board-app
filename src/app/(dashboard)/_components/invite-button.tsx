import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";


export default function InviteButton() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <Plus className="w-4 h-4 mr-2" />
            맴버 초대하기
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
          <OrganizationProfile />
        </DialogContent>
      </Dialog>

    </div>
  )
}
