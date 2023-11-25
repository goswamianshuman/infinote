"use client";

import { account } from "@/config/appwrite.config";
import { useAuthContext } from "@/context/AuthContext";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BsPlusCircle } from "react-icons/bs";
// import { Loading } from "@/components/others/loader";

type Props = {};

const Dashboard = (props: Props) => {
  const { user }: any = useAuthContext();
  const router = useRouter();

  console.log(user);

  const handleLogout = () => {
    try {
      account.deleteSession(user.$id).then((res) => {
        if (res) router.push("/");
      });
    } catch (error) {
      console.log(error);
    }
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

      <h2 className="text-lg font-medium text-center max-w-[80%]">
        Explore the endless possibilities at{" "}
        <span className="text-[#C024D6] underline">{user?.name}&apos;s</span>{" "}
        Infinote.
      </h2>
      <Button className="flex items-center justify-center gap-3 mx-auto">
        <BsPlusCircle className="h-4 w-4" />
        create a note
      </Button>

      {/* <img src={avatar.getInitials()} alt="" srcset="" /> */}
    </div>
  );
};

export default Dashboard;
