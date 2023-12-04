"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { setDocumentAsArchive } from "@/libs/appwrite/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { BsTrash } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrigger } from "@/hooks/useTrigger";

type Props = {
  documentId: string;
};

const Menu = ({ documentId }: Props) => {
  const router = useRouter();
  const { user }: any = useAuthContext();
  const trigger = useTrigger();

  const handleArchive = () => {
    const archive = setDocumentAsArchive(documentId).then(() => {
      router.push("/dashboard");
      trigger.activate();
    });

    toast.promise(archive, {
      loading: "Moving to trash... 🙂",
      success: "Note moved to trash! 🚮",
      error: "Failed to archive note. 😢",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem className="cursor-pointer" onClick={handleArchive}>
          <BsTrash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.name}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-5 w-7" />;
};
