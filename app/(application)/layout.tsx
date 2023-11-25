import React from "react";
import { AuthContextProvider } from "@/context/AuthContext";
import Sidebar from "./_components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex dark:bg-[#121212] relative">
      <AuthContextProvider>
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto">{children}</main>
      </AuthContextProvider>
    </div>
  );
}
