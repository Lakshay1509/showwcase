import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
    name: z.string().min(3, "Minimum 3 characters required").max(255),
    img_url: z.string().url({ message: "Invalid image URL" }).optional()
});

type FormValues = z.infer<typeof formSchema>;

type TechFormProps = {
  onSubmit: (values: FormValues) => void;
  defaultValues?: FormValues;
  disabled?: boolean;
};

const TechForm = ({ onSubmit, defaultValues,disabled }: TechFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Name"
                  disabled = {disabled}
                  className="resize-none focus:ring-2 focus:ring-primary/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="img_url"
          control={form.control}
          render={({ field }) => (
            <input type="hidden" {...field} />
          )}
        />
        
        <Button type="submit" className="mt-4" disabled={disabled}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default TechForm;