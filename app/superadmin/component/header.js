"use client"; 
import React from "react";
import { Avatar } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="border-b border-secondary/50 w-full py-1 px-5 bg-white sticky top-0 z-10 flex justify-end">
      <div className="flex items-center gap-2 hover:bg-[#bdd7ee9d] rounded p-1">
        <Avatar size="sm" name={user?.name || "Superadmin"} />
        <span className="text-sm">{user?.name || "Superadmin"}</span>
      </div>
    </div>
  );
};

export default Header;
