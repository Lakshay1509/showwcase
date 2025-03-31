'use client'

import Link from "next/link"
import { ClerkLoaded, ClerkLoading, UserButton, useAuth } from "@clerk/nextjs";
import { useGetUser } from "@/features/users/use-get-user";

const SignUpButton = () => {


   const { isSignedIn } = useAuth();
    
    const { data, isLoading, isFetching } = useGetUser();

  return (
    <>
    <Link href={data?.user?.username && isSignedIn ? `/profile/${data.user.username}` : "/sign-up"}>
  <button className="relative inline-flex h-12 w-48 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-[20px] font-medium text-white backdrop-blur-3xl">
      {data?.user?.username && isSignedIn ? "Profile" : "Sign Up"}
    </span>
  </button>
</Link>

    </>
  )
}

export default SignUpButton