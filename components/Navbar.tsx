'use client'

import { ClerkLoaded, ClerkLoading, UserButton, useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  
  return (
    <header className="fixed inset-x-0 top-0 z-30 w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 py-4 shadow-lg backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <a aria-current="page" className="flex items-center group" href="/">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-3xl font-bold tracking-tight hover:from-blue-400 hover:to-purple-400 transition-all duration-300">
                ShowwCase
              </span>
            </a>
          </div>
          
          <div className="flex items-center justify-end gap-4">
            <ClerkLoading>
              <div className="h-9 w-9 animate-pulse rounded-full bg-gray-700/50" />
            </ClerkLoading>
            
            <ClerkLoaded>
              {!isSignedIn ? (
                <>
                  <a className="hidden items-center justify-center rounded-xl bg-gray-800/50 px-4 py-2 text-sm font-medium text-gray-200 shadow-sm ring-1 ring-gray-700/50 transition-all duration-300 hover:bg-gray-700/50 hover:text-white sm:inline-flex"
                    href="/sign-up">Sign up</a>
                  <a className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-blue-500 hover:to-purple-500"
                    href="/sign-in">Sign in</a>
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