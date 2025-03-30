'use client'

import AccountForm from "@/components/AccountForm"
import { useCreateAccount } from "@/features/users/use-create-new-user";
import { z } from 'zod';
import { useUser } from "@clerk/nextjs";
import { useGetUser } from "@/features/users/use-get-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id ?? "";

  const { data, isLoading } = useGetUser();
  const mutation = useCreateAccount();
  
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (userId && !isLoading && data) {
      setRedirecting(true);
      router.replace("/");
    }
  }, [userId, isLoading, data, router]);

  
  if (redirecting || isLoading) {

    return (
      <div className="flex justify-center items-center w-full h-screen">
      <Loader/>
      </div>
    )
  }

  
  const formSchema = z.object({
    username: z.string().min(3).max(20),
    description: z.string().min(10).max(100),
  });

  type FormValues = z.infer<typeof formSchema>;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        router.replace(`/profile/${values.username}`);
      }
    });
  };
  

  return (
    <div className="min-h-screen py-8 mt-20">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Hi, {user?.firstName}!
        </h1>
        <p>Pick a username & flex a little!</p>
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending}  />
      </div>
    </div>
  );
}
