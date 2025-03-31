import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "./ui/input";

const formSchema = z.object({
  description: z.string().min(10).max(100),
  location: z.string().min(2).max(50),
  username : z.string().min(3).max(50),
});

type FormValues = z.infer<typeof formSchema>;

type AccountFormProps = {
  onSubmit: (values: FormValues) => void;
  description: string | null;
  country: string | null;
  username : string
  disabled?: boolean;
  
};

type Country = {
  code: string;
  country: string;
  region: string;
};

const EditAccount = ({ onSubmit,description,disabled,country,username }: AccountFormProps) => {
  const [countries, setCountries] = useState<Record<string, Country>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://api.first.org/data/v1/countries");
        const data = await response.json();

        // Transform the data to include the code
        const transformedData: Record<string, Country> = {};
        Object.entries(data.data).forEach(([code, info]: [string, any]) => {
          transformedData[code] = {
            code,
            country: info.country,
            region: info.region,
          };
        });

        setCountries(transformedData);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description || '',
      location: country || '',
      username: username 
    }
  });

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-full max-w-2xl mx-auto">
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
                disabled={disabled}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Username"
                        className=" resize-none focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormDescription>
                      Edit your username
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Location</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={disabled}
                        
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-primary/20">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoading ? (
                            <SelectItem value="loading" disabled>
                              Loading countries...
                            </SelectItem>
                          ) : (
                            Object.values(countries).map((country) => (
                              <SelectItem
                                key={country.code}
                                value={country.country}
                              >
                                {country.country}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Edit your country</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                disabled={disabled}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us about yourself"
                        className="min-h-24 resize-none focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormDescription>
                      Edit your bio (10-100 characters)
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
                disabled={disabled}
              >
                {disabled ? "Submitting..." : "Save Profile"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EditAccount;
