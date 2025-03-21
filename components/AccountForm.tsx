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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const formSchema = z.object({
  username: z.string().min(3).max(20),
  description: z.string().min(10).max(100),
});

type FormValues = z.infer<typeof formSchema>;

type AccountFormProps = {
  onSubmit: (values: FormValues) => void;
};

const AccountForm = ({ onSubmit }: AccountFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      description: "",
    },
  });
  
  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Account Details</h2>
          <p className="text-muted-foreground text-center">Complete your profile information</p>
        </CardHeader>
        
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            className="space-y-6"
          >
            <CardContent className="space-y-4">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Username</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter your username"
                        className="focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormDescription>
                      Your public display name (3-20 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Tell us about yourself"
                        className="min-h-24 resize-none focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormDescription>
                      A brief bio about yourself (10-100 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            
            <CardFooter className="flex justify-end border-t pt-4">
              <Button 
                type="submit"
                className="w-full sm:w-auto px-8 transition-all hover:scale-105"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Save Profile"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AccountForm;
