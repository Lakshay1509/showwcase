"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";


import { useGetMetdata } from "@/features/tech/use-get-metadata";
import NewHero from "./CreateNew";



const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
});

type FormValues = z.infer<typeof formSchema>;


interface Metadata {
  websiteName?: string;
  title?: string;
  description?: string;
  faviconPath?: string;
}


export default function AddMetadataHero() {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const Getmetdata = useGetMetdata();

  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        url: "",
        },
  });

  const handleSubmit = async (values: FormValues) => {
  
  
    Getmetdata.mutate(values, {
      onSuccess: (data: any) => {
        setMetadata(data as Metadata);
      },
    });
    
  };

  return (
    <>
    
      
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex items-center p-2 space-x-2 w-full"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex-grow w-full">
                <FormControl>
                  <Input
                    placeholder="Enter website URL"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={Getmetdata.isPending} className="flex-shrink-0">
            Fetch
          </Button>
        </form>
      </Form>

      {metadata && (
        <div className="mt-6 bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm transition-all">
          <p className="text-lg text-center font-medium">
            {metadata.websiteName}
          </p>

          <div className="p-4 space-y-4">
            
            <div className="flex items-center gap-3">
              {metadata.faviconPath && (
                <div className="relative h-8 w-8 flex-shrink-0">
                  <Image
                    src={metadata.faviconPath}
                    alt="Site favicon"
                    width={32}
                    height={32}
                    className="rounded-sm"
                  />
                </div>
              )}

              {metadata.title && (
                <h3 className="font-medium text-lg line-clamp-1">
                  {metadata.title}
                </h3>
              )}
            </div>

            {metadata.description && (
              <p className="text-sm text-gray-600 line-clamp-3">
                {metadata.description}
              </p>
            )}
          </div>
        </div>
      )}

      {metadata && (

<NewHero defaultValues={{
  url: form.getValues("url"),
  title: metadata.title || "",
  description: metadata.description || "",
  faviconPath: metadata.faviconPath
}}/>
        
      )}
    </>
  );
}
