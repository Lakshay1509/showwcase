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
import { Textarea } from "../ui/textarea";
import { useCreateHero } from "@/features/hero/use-create-hero";

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  title: z.string(),
  description: z.string(),
  faviconPath: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type NewHeroProps = {
  id?: string;
  disable?: boolean;
  defaultValues: FormValues;
};

const NewHero = ({ defaultValues }: NewHeroProps) => {
    const mutation = useCreateHero();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    mutation.mutate(values,{
        onSuccess : ()=>{
            form.reset();
        }
    }
    )
    

  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} >
          <FormField
            control={form.control}
            name="url"
            
            render={({ field }) => (
              <FormItem className="flex-grow w-full">
                <FormControl>
                  <Input
                  disabled = {mutation.isPending}
                    placeholder="Enter website URL"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
           
            render={({ field }) => (
              <FormItem className="flex-grow w-full">
                <FormControl>
                  <Textarea
                  disabled = {mutation.isPending}
                    placeholder="Enter website title"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            
            render={({ field }) => (
              <FormItem className="flex-grow w-full">
                <FormControl>
                  <Textarea
                  disabled = {mutation.isPending}
                    placeholder="Enter website description"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="faviconPath"
            render={({ field }) => (
              <FormItem className="hidden">
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
          <Button type="submit"  className="flex-shrink-0" disabled = {mutation.isPending}>
                    Add
            </Button>
        </form>
      </Form>
    </>
  );
};

export default NewHero;
