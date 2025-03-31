"use client";

import React, { useState } from "react";
import { MultiSelect } from "../ui/multi_select";
import { Skeleton } from "../ui/skeleton"; 
import { useUpdateTech } from "@/features/tech/use-update-tech"; 
import { Button } from "../ui/button";
import { useGetTags } from "@/features/tags/use-get-tags";
import { useUpdateTags } from "@/features/tags/use-update-tags";

interface MultiSelectFormProps {
  defaultValues?: string[];
  disabled?: boolean;
}

function MultiSelectTags({ defaultValues, disabled }: MultiSelectFormProps) {
  const { data: TagsData, isLoading, error } = useGetTags();
  const [selectedTech, setSelectedTech] = useState<string[]>(defaultValues || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useUpdateTags()

  const tagsOptions =
    TagsData?.tags?.map((tech: { id: number; name: string }) => ({
      value: String(tech.id),
      label: tech.name,
    })) || [];

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const tagsIdsAsNumbers = selectedTech.map(id => parseInt(id, 10));

    try {
      const TechtoUpdate = tagsIdsAsNumbers.map(tags => ({ id: tags }));

      mutation.mutate(TechtoUpdate);

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-xl">
      {isLoading ? (
        <Skeleton className="h-10 w-full bg-black" />
      ) : error ? (
        <div className="text-red-500">Failed to load tags. Please try again later.</div>
      ) : (
        <MultiSelect
          options={tagsOptions}
          onValueChange={setSelectedTech}
          defaultValue={selectedTech}
          placeholder="Select tags"
          variant="inverted"
          disabled={mutation.isPending}
        />
      )}

      <div className="mt-4">
        <h2 className="text-sm font-semibold">Selected Tags:</h2>
        <ul className="list-disc list-inside text-gray-600">
          {selectedTech.map((techId) => {
            const selectedTechObj = tagsOptions.find((tech) => tech.value === techId);
            return selectedTechObj ? <li key={techId}>{selectedTechObj.label}</li> : null;
          })}
        </ul>
      </div>

      <Button
        className="mt-4 px-4 py-2 bg-black text-white w-full"
        onClick={handleSubmit}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Updating..." : "Update Tags"}
      </Button>
    </div>
  );
}

export default MultiSelectTags;
