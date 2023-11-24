import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/utils/utils";

type Props = {};

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = (props: Props) => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image src="/logo.png" height={40} width={40} alt="logo" />
      <p className={cn("font-semibold", font.className)}>Infinote</p>
    </div>
  );
};

export default Logo;
