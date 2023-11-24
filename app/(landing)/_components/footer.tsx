import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full p-6 bg-background z-50 dark:bg-[#121212]">
      <div className="flex items-center w-full max-w-[90%] md:max-w-7xl mx-auto">
        <Logo />
        <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
          <Button variant="ghost" size="sm">
            Privacy Policy
          </Button>
          <Button variant="ghost" size="sm">
            Terms & Conditions
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
