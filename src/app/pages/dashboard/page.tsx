'use client';

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
 
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/',
      redirect: true
    });
  };

  return (
    <>
    <p>{session?.user.name}</p>
    <div className="min-h-screen flex justify-end pr-2">
      
      <Button 
        onClick={handleSignOut}
        variant="ghost" 
        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white hover:text-white"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
    </>
  );
}