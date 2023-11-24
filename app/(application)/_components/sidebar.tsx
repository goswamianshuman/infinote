"use client";

import { cn } from "@/utils/utils";
import { ChevronLeftIcon as LeftIcon, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizeRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"header">>(null);
  const [reset, setReset] = useState(false);
  const [collapsed, setCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      handleCollapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      handleCollapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    isResizeRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizeRef.current) return;
    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizeRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setCollapsed(false);
      setReset(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => setReset(false), 300);
    }
  };

  const handleCollapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setCollapsed(true);
      setReset(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setReset(false), 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary/40 overflow-y-auto relative flex w-60 flex-col z-[99999]",
          reset && "transition-all ease-linear duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={handleCollapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-stone-300 dark:hover:bg-stone-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition cursor-pointer",
            isMobile && "opacity-100"
          )}
        >
          <LeftIcon className="h-6 w-6" />
        </div>
        <div>
          <p>Action items</p>
        </div>

        <div className="mt-4">
          <p>Documents</p>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition-all duration-100 ease-linear cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>

      <header
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          reset && "transition-all ease-linear duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {collapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </header>
    </>
  );
};

export default Sidebar;
