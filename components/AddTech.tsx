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
import TechForm from "./TechForm";
import { useCreateTech } from "@/features/tech/use-add-tech";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

// Define form schema with Zod
const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
});

type FormValues = z.infer<typeof formSchema>;

const formSchema2 = z.object({
  name: z.string().min(3, "Minimum 3 characters required").max(255),
  img_url: z.string().url({ message: "Invalid image URL" }).optional()
})

type form2Values = z.infer<typeof formSchema2>;


// Types for metadata
interface Metadata {
  websiteName?: string;
  title?: string;
  description?: string;
  ogImage?: string;
  faviconPath?: string;
}


export default function MetadataForm() {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const mutation = useCreateTech();

  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

 
  const onSubmit = (values: form2Values) => {
    setSuccess(null);
    setError(null);
    
    mutation.mutate(values, {
      onSuccess: () => {
        setSuccess("Technology added successfully!");
        setMetadata(null); // Reset form after successful submission
        form.reset();
      },
      onError: (error) => {
        setError(error.message || "Failed to add technology. Please try again.");
      },
    });
  }

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/fetch-metadata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: values.url }),
      });

      if (!response.ok) throw new Error("Failed to fetch metadata");
      const data = await response.json();
      setMetadata(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

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
          <Button type="submit" disabled={loading} className="flex-shrink-0">
            {loading ? "Fetching..." : "Fetch"}
          </Button>
        </form>
      </Form>

      {metadata && (
        <div className="mt-6 bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm transition-all">
          <p className="text-lg text-center font-medium">
            {metadata.websiteName}
          </p>

          <div className="p-4 space-y-4">
            {metadata.ogImage && (
              <div className="relative h-40 w-full overflow-hidden rounded-md">
                <Image
                  src={metadata.ogImage}
                  alt={metadata.title || "Website preview"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
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
        <TechForm
          defaultValues={{ 
            name: metadata.websiteName || "",
            img_url: metadata.faviconPath
          }}
          onSubmit={onSubmit}
          disabled = {mutation.isPending}
        />
      )}
    </>
  );
}
