import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditGroup } from "@/features/group/use-edit-group";
import { Pencil } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3).max(20),
  position: z.number(),
});

type FormValues = z.infer<typeof formSchema>;

type EditGroupProps = {
  name: string;
  position: number;
  id: string;
  maxPosition: number;
};

const EditGroup = ({ name, position, id,maxPosition }: EditGroupProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      position: position,
    },
  });

  const mutation = useEditGroup(id);

  const handleSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <div className=" ">
          <Pencil className="h-3 w-3 " />
          </div>
        </SheetTrigger>
        <SheetContent className="p-1">
          <SheetHeader>
            <SheetTitle>Edit the name and position of the group</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex items-center p-2 space-x-2 w-full"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-grow w-full">
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem className="flex-grow w-full">
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        min="0"
                        max={maxPosition}
                        type="number"
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="flex-shrink-0">
                Save
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditGroup;
