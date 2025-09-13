"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 gap-4  bg-gray-50 max-w-3xl h-16  container mx-auto px-6">
      <div>
        <h1 className="text-2xl font-bold">Taskly</h1>
      </div>

      <div className="flex justify-between items-center gap-4 ">
        <Unauthenticated>
          <SignInButton forceRedirectUrl={"/main"} mode="modal">
            <Button variant={"secondary"}>Sign In</Button>
          </SignInButton>
          <SignUpButton forceRedirectUrl={"/main"} mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton>
        </Unauthenticated>
        <Authenticated>
          <UserButton />
        </Authenticated>
        <AuthLoading>
          <div>Loading...</div>
        </AuthLoading>
      </div>
    </header>
  );
};

export default Header;
