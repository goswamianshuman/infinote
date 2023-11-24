"use client";

import { ModeToggle } from "@/components/others/mode";
import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/utils/utils";
import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { AuthDailog } from "../../../components/others/authDailog";

type Props = {};

const Header = (props: Props) => {
  const scroll = useScrollTop();

  return (
    <header
      className={cn(
        "z-50 bg-background fixed top-0 w-full py-3 dark:bg-[#121212]",
        scroll && "border-b shadow-sm"
      )}
    >
      <div className="max-w-[90%] md:max-w-7xl mx-auto flex items-center w-full ">
        <Logo />
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-4">
          <ModeToggle />
          <AuthDailog
            header={
              <Button className="flex items-center justify-center bg-[#C024D6] text-white hover:bg-[#9a13ac] transition-all ease-linear duration-200 group">
                Get Started
              </Button>
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
