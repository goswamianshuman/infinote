"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image src="/error.svg" height="300" width="300" alt="error" />
      <h2 className="text-xl font-medium">Something went wrong</h2>

      <Button asChild>
        <Link href="/dashboard">back to dashboard</Link>
      </Button>
    </div>
  );
};

export default Error;
