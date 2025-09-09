"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16">
      <div>
        <h1 className="text-2xl font-bold">Taskly</h1>
      </div>

      <div className="flex justify-between items-center gap-4 ">
        <Unauthenticated>
          <SignInButton mode="modal">
            <Button variant={"secondary"}>Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton>
        </Unauthenticated>
        <Authenticated>
          <UserButton />
        </Authenticated>
      </div>
    </header>
  );
};

export default Header;
