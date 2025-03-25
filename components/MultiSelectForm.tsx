"use client";

import React, { useState } from "react";
import { MultiSelect } from "./ui/multi_select";
import { useGetTech } from "@/features/tech/use-get-tech";
import { Skeleton } from "./ui/skeleton"; // Optional: Import a loading skeleton


interface MultiSelectFormProps {
    // onSubmit: (selectedTech: string[]) => void;
    defaultValues?: string[];
    disabled?: boolean;
}

function MultiSelectForm({  defaultValues, disabled }: MultiSelectFormProps) {
  const { data: TechData, isLoading } = useGetTech();
  const [selectedTech, setSelectedTech] = useState<string[]>(defaultValues || []);

  
  const techOptions = TechData?.techs?.map((tech: { id: number; name: string; img_url: string | null }) => ({
    value: String(tech.id),
    label: tech.name,
  })) || [];
    

  return (
    <div className="p-4 max-w-xl">
      
      {isLoading ? (
        <Skeleton className="h-10 w-full" /> // Loading state
      ) : (
        <MultiSelect
          options={techOptions}
          onValueChange={setSelectedTech}
          defaultValue={selectedTech}
          placeholder="Select technologies"
          variant="inverted"
        />
      )}

      <div className="mt-4">
        <h2 className="text-sm font-semibold">Selected Technologies:</h2>
        <ul className="list-disc list-inside">
          {selectedTech.map((techId) => {
            const selectedTechObj = techOptions.find((tech) => tech.value === techId);
            return selectedTechObj ? <li key={techId}>{selectedTechObj.label}</li> : null;
          })}
        </ul>
      </div>
    </div>
  );
}

export default MultiSelectForm;
