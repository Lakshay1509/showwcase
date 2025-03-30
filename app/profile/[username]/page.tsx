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
import { useGetHero } from "@/features/hero/use-get-hero";
import AddHero from "@/components/hero/AddHero";
import HeroCard from "@/components/hero/HeroCard";

export default function DynamicPage() {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);

  const mutation = useEditAccount(user?.id || " ");
  const params = useParams();
  const rawName = Array.isArray(params?.username)
    ? params.username[0]
    : params?.username || "";

  

  const name = decodeURIComponent(rawName);
  
  const { data, isFetching: userFetching } = useGetUsername(name);

  
  const {
    data: GroupsData,
    isLoading: GroupsLoading,
    isFetching,
  } = useGetUserGroup(name);
  const { data: tagsData } = useGetTagsByUser(name);
  const { data: HeroData } = useGetHero(name);

  

  if (!data || !tagsData || userFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  const formSchema = z.object({
    description: z.string().min(10).max(100),
    location: z.string().min(3).max(50),
  });

  type FormValues = z.infer<typeof formSchema>;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
    if (mutation.isSuccess) {
      setIsModalOpen(false);
    }
  };

  return (
    <main className="min-h-screen mt-12 w-full py-12 px-4 bg-background flex flex-col lg:flex-row ">
      <div className="">
        <div className="max-w-7xl mx-auto">
          <UserProfile user={data.user} tags={tagsData?.tagsData || []} />

          {data.user.id === user?.id && (
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
          )}
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
              <EditAccount
                onSubmit={onSubmit}
                description={data.user.description}
                disabled={mutation.isPending}
              />
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

      <div className="flex flex-col-reverse w-[100%] lg:w-[70%] lg:flex-col">
        {data.user.id === user?.id && (
          <div className="flex justify-end flex-wrap space-x-2">
            <AddHero />
            <AddTechStack />
            <AddGroup />
          </div>
        )}

        

        <div className="px-6 py-2 flex flex-row space-x-2">
          {HeroData?.hero?.map((value) => (

            
            <HeroCard key={value.id} title = {value.title} description={value.description} url = {value.url} favicon={value.faviconPath} id={value.id} render={data.user.id === user?.id}/>
            
          ))}
        </div>

        {(GroupsLoading || isFetching) && (
          <div className="flex justify-center items-center h-[300px]">
            <Loader />
          </div>
        )}


        <div className="mt-8">
          {!GroupsLoading &&
            !isFetching &&
            GroupsData &&
            GroupsData.techGroups.map((group) => (
              <TechGroup
                id={group.id}
                key={group.id}
                name={group.name}
                techs={group.techs}
                position={group.position}
                renderEdit={data.user.id === user?.id}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
