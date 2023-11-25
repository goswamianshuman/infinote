"use client";

import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/AuthContext";
import { ChevronsLeftRight as LeftRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOutAccount } from "@/libs/appwrite/api";
import { useRouter } from "next/navigation";

type Props = {};

const UserItem = (props: Props) => {
  const { user }: any = useAuthContext();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="flex items-center justify-between gap-x-2 w-full max-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.name}&apos;s Infinote
            </span>
          </div>
          <LeftRightIcon className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80 h-max"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.email}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                <span className="text-[#C024D6] underline">
                  {user?.name}&apos;s
                </span>{" "}
                Infinote
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            onClick={() => {
              signOutAccount();
              router.push("/");
            }}
            variant="ghost"
            className="w-full h-full"
          >
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
