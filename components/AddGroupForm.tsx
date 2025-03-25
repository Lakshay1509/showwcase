import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(3).max(20),
});

type FormValues = z.infer<typeof formSchema>;

type CreateNewGroupProps = {
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

const CreateNewGroup = ({ onSubmit, disabled }: CreateNewGroupProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        className="space-y-6 p-3"
      >

        <FormField
        name = "name"
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>
                    Name
                </FormLabel>
                <FormControl>
                    <Input
                    {...field}
                    placeholder="Eg. Frontend , Backend"
                    className="focus:ring-2 focus:ring-primary/20"
                    disabled = {disabled}
                    />
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
        >

        </FormField>

        <Button 
                type="submit"
                className="w-full sm:w-auto px-8 transition-all hover:scale-105"
                disabled={disabled}
        >
            {form.formState.isSubmitting ? "Submitting..." : "Add Group"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateNewGroup;
