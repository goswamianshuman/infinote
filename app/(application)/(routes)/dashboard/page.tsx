"use client";

import { Button } from "@/components/ui/button";
import { account } from "@/config/appwrite.config";
import { useAuthContext } from "@/context/AuthContext";
import React from "react";
import { useRouter } from "next/navigation";

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
    <div>
      <Button onClick={handleLogout}>logout</Button>
    </div>
  );
};

export default Dashboard;
