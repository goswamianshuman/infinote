"use client";

import { useAuthContext } from "@/context/AuthContext";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BsPlusCircle } from "react-icons/bs";
import { onCreate } from "@/utils/actionFunctions";
import { useTrigger } from "@/hooks/useTrigger";

type Props = {};

const Dashboard = (props: Props) => {
  const { user }: any = useAuthContext();
  const router = useRouter();
  const trigger = useTrigger();

  const handleCreate = async () => {
    onCreate({ user_id: user?.$id, title: "Untitled" });
    trigger.activate();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.svg"
        height={300}
        width={300}
        alt="empty document"
        className="object-center object-contain"
      />

      <h2 className="text-lg md:text-2xl font-medium text-center max-w-[80%]">
        Explore the endless possibilities at{" "}
        <span className="text-[#C024D6] underline">{user?.name}&apos;s</span>{" "}
        Infinote.
      </h2>

      <Button
        onClick={handleCreate}
        className="flex items-center justify-center gap-3 mx-auto"
      >
        <BsPlusCircle className="h-4 w-4" />
        create a note
      </Button>

      {/* <img src={avatar.getInitials()} alt="" srcset="" /> */}
    </div>
  );
};

export default Dashboard;
