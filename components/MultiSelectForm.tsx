"use client";

import React, { useState } from "react";
import { MultiSelect } from "./ui/multi_select";
import { useGetTech } from "@/features/tech/use-get-tech";
import { Skeleton } from "./ui/skeleton"; // Optional: Import a loading skeleton
import { toast } from "sonner"; // assuming you have toast installed
import { useUpdateTech } from "@/features/tech/use-update-tech"; // Import the useUpdateTech hook
import { Button } from "./ui/button";

interface MultiSelectFormProps {
  defaultValues?: string[];
  disabled?: boolean;
  id: string
}

function MultiSelectForm({ defaultValues, disabled, id }: MultiSelectFormProps) {
  const { data: TechData, isLoading } = useGetTech();
  const [selectedTech, setSelectedTech] = useState<string[]>(defaultValues || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateGroupTech = useUpdateTech(id);

  const techOptions =
    TechData?.techs?.map((tech: { id: number; name: string; img_url: string | null }) => ({
      value: String(tech.id),
      label: tech.name,
    })) || [];

  const handleSubmit = async() => {
    setIsSubmitting(true);
    // Convert string IDs to numbers before sending
    const techIdsAsNumbers = selectedTech.map(id => parseInt(id, 10));

    try{

    const TechtoUpdate = techIdsAsNumbers.map(techId => ({ id: techId }));

    await updateGroupTech.mutateAsync(TechtoUpdate);
    
    setIsSubmitting(false);
    
    }catch(error){
      setIsSubmitting(false);
      
    }

  };

  return (
    <div className="p-4 max-w-xl">
      {isLoading ? (
        <Skeleton className="h-10 w-full bg-black" /> // Loading state
      ) : (
        <MultiSelect
          options={techOptions}
          onValueChange={setSelectedTech}
          defaultValue={selectedTech}
          placeholder="Select technologies"
          variant="inverted"
          disabled={disabled || isSubmitting}
        />
      )}

      <div className="mt-4">
        <h2 className="text-sm font-semibold">Selected Technologies:</h2>
        <ul className="list-disc list-inside text-gray-600">
          {selectedTech.map((techId) => {
            const selectedTechObj = techOptions.find((tech) => tech.value === techId);
            return selectedTechObj ? <li key={techId}>{selectedTechObj.label}</li> : null;
          })}
        </ul>
      </div>

      <Button
        className="mt-4 px-4 py-2 bg-black text-white w-full"
        
        onClick={handleSubmit}
        disabled={disabled || isSubmitting || selectedTech.length === 0}
      >
        {isSubmitting ? "Updating..." : "Update Technologies"}
      </Button>
    </div>
  );
}

export default MultiSelectForm;
