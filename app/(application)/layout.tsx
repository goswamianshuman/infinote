import React, { useEffect } from "react";
import { AuthContextProvider } from "@/context/AuthContext";
import Sidebar from "./_components/sidebar";
import SearchCommand from "@/components/others/searchCommand";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex dark:bg-[#121212] relative">
      <AuthContextProvider>
        <Sidebar />
        <SearchCommand />
        <main className="flex-1 h-full overflow-y-auto">{children}</main>
      </AuthContextProvider>
    </div>
  );
}
