'use client'

import { ClerkLoaded, ClerkLoading, UserButton, useAuth } from "@clerk/nextjs";
import { useGetUser } from "@/features/users/use-get-user";

import Link from "next/link";

const Navbar = () => {
  const { isSignedIn } = useAuth();

  const {data} = useGetUser();
  
  
  return (
    <header className="fixed  inset-x-0 top-0 z-30 w-full py-4 shadow-lg backdrop-blur-md ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link aria-current="page" className="flex items-center group" href="/">
              <span className=" text-3xl font-bold ">
                showWcase
              </span>
            </Link>
          </div>
          
          <div className="flex items-center justify-end gap-4">
            <ClerkLoading>
              <div className="h-9 w-9 animate-pulse rounded-full bg-gray-700/50" />
            </ClerkLoading>

            {data && (
  <div>
    <Link href={`/profile/${data.user.username}`}>
      Profile
    </Link>
  </div>
)}

            
            <ClerkLoaded>
              {!isSignedIn ? (
                <>
                  <Link className="hidden items-center justify-center rounded-xl bg-gray-800/50 px-4 py-2 text-sm font-medium text-gray-200 shadow-sm ring-1 ring-gray-700/50 transition-all duration-300 hover:bg-gray-700/50 hover:text-white sm:inline-flex"
                    href="/sign-up">Sign up</Link>
                  <Link className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-blue-500 hover:to-purple-500"
                    href="/sign-in">Sign in</Link>
                </>
              ) : (
                <UserButton afterSignOutUrl="/" />
              )}
            </ClerkLoaded>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar