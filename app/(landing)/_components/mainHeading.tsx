"use client";

import { AuthDailog } from "@/components/others/authDailog";
import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosArrowRoundForward as ArrowRight } from "react-icons/io";

const MainHeading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl md:text-6xl font-bold">
        Your thoughts, files, and strategies, harmoniously connected. Step into
        the realm of{" "}
        <span className="uppercase font-mono tracking-widest text-[#C024D6]">
          Infinote
        </span>
      </h1>

      <h3 className="text-base md:text-2xl font-medium text-black/80 dark:text-white/80">
        Infinote: Transforming work with a connected <br />
        space for enhanced speed and excellence.
      </h3>
      <AuthDailog
        header={
          <Button className="mx-auto flex items-center justify-center bg-[#C024D6] text-white hover:bg-[#9a13ac] transition-all ease-linear duration-200 group">
            Get Started{" "}
            <ArrowRight className="h-4 w-4 ml-2 group-hover:scale-[1.1] transition-all ease-linear duration-100" />
          </Button>
        }
      />
    </div>
  );
};

export { MainHeading };
