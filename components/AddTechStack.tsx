import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";




const AddTechStack = () => {
  return (
    <div>
      <Sheet >
        <SheetTrigger>
         <div className="px-2 py-1 bg-black text-white rounded-lg ">Add Tech Stack</div>
        </SheetTrigger>
        <SheetContent >
          <SheetHeader>
            <SheetTitle>Add the url of the tool to add</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          Hello
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddTechStack;
