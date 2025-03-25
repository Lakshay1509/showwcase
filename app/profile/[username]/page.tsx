"use client";

import { useParams } from "next/navigation";
import { useGetUsername } from "@/features/users/use-get-username";
import EditAccount from "@/components/EditAccountForm";
import { UserProfile } from "@/components/UserProfile";
import { useEditAccount } from "@/features/users/use-update-user";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { useState } from "react";
import AddTechStack from "@/components/AddTechStack";
import EditTagsForm from "@/components/EditTagsForm";
import { useGetTagsByUser } from "@/features/tags/use-get-byUser";
import Loader from "@/components/Loader";
import TechGroup from "@/components/TechGroup";
import AddGroup from "@/components/AddGroupSheet";
import { useGetUserGroup } from "@/features/group/use-get-byuser";

export default function DynamicPage() {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  

  const mutation = useEditAccount(user?.id || " ");
  const params = useParams();
  const rawName = Array.isArray(params?.username)
    ? params.username[0]
    : params?.username || "Guest";

  const name = decodeURIComponent(rawName);
  const { data,  } = useGetUsername(name);
  const {data:GroupsData} = useGetUserGroup(name);
  const { data: tagsData,  } = useGetTagsByUser();

  if (!data || !tagsData) {
    return (
      <div className="flex justify-center items-center h-screen">
    <Loader />
    </div>
    
  )
  }

  const formSchema = z.object({
    description: z.string().min(10).max(100),
    location: z.string().min(3).max(50),
  });

  type FormValues = z.infer<typeof formSchema>;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <main className="min-h-screen mt-12 w-full py-12 px-4 bg-background flex flex-col lg:flex-row ">
      <div className="">
        <div className="max-w-7xl mx-auto">
          <UserProfile user={data.user} tags={tagsData?.tagsData || []} />

          <div className="flex flex-row space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-2 py-1  bg-black text-sm text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Edit Profile
            </button>

            <button
              onClick={() => setIsTagsModalOpen(true)}
              className="mt-4 px-2 py-1  bg-black text-sm text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Edit Tags
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit Profile</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <EditAccount onSubmit={onSubmit} />
            </div>
          </div>
        )}

        {isTagsModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setIsTagsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <EditTagsForm />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col w-[100%] lg:w-[70%]">
       
        <div className="flex justify-end flex-wrap space-x-2" >
          <AddTechStack />
          <AddGroup />
        </div>


        {GroupsData && GroupsData.techGroups.map((group) => (
  <TechGroup 
    key={group.id}
    name={group.name}
    techs={group.techs}
  />
))}

       
      </div>
    </main>
  );
}
