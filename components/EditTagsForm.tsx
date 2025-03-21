import { useGetTags } from "@/features/tags/use-get-tags";
import { useUpdateTags } from "@/features/tags/use-update-tags";
import { useState, useRef, useEffect } from "react";

const EditTagsForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { data: tags, error } = useGetTags();
  console.log(tags);
  const [selectedTags, setSelectedTags] = useState<Array<{ id: number; name: string }>>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const updateTagsMutation = useUpdateTags();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTag = (tag: { id: number; name: string }) => {
    setSelectedTags(prevSelected => {
      const isAlreadySelected = prevSelected.some(item => item.id === tag.id);
      if (isAlreadySelected) {
        return prevSelected.filter(item => item.id !== tag.id);
      } else {
        return [...prevSelected, tag];
      }
    });
  };

  const removeTag = (tagId: number) => {
    setSelectedTags(prevSelected => prevSelected.filter(tag => tag.id !== tagId));
  };

  const handleSubmit = async () => {
    try {
      
      const tagsToUpdate = selectedTags.map(tag => ({ id: tag.id }));
      
     
      await updateTagsMutation.mutateAsync(tagsToUpdate);
      
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to update tags:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-auto p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Tags</h2>
        <p className="text-gray-500 mb-6 text-sm">Select tags that best describe your interests or expertise.</p>
        
        <div className="relative w-full" ref={dropdownRef}>
          <div 
            className="border border-gray-200 rounded-lg p-3 min-h-12 flex flex-wrap gap-2 cursor-text transition-all focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent"
            onClick={() => setIsDropdownOpen(true)}
          >
            {selectedTags.length > 0 ? (
              selectedTags.map(tag => (
                <div 
                  key={tag.id} 
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium"
                >
                  {tag.name}
                  <button 
                    type="button" 
                    className="text-blue-700 hover:text-blue-900 font-bold ml-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(tag.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              <div className="text-gray-400">Select tags...</div>
            )}
          </div>
          
          {isDropdownOpen && tags && tags.tags && tags.tags.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1 border rounded-lg shadow-lg bg-white z-10 max-h-60 overflow-y-auto divide-y divide-gray-100">
              {tags.tags.map(tag => (
                <div 
                  key={tag.id} 
                  className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => toggleTag(tag)}
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.some(item => item.id === tag.id)}
                    onChange={() => {}}
                    className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{tag.name}</span>
                </div>
              ))}
            </div>
          )}
          
          {error && <div className="text-red-500 mt-1 text-sm">Error loading tags</div>}
          
          <div className="mt-6 flex items-center justify-between">
            <button 
              type="button"
              onClick={handleSubmit}
              disabled={updateTagsMutation.isPending}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors font-medium flex items-center justify-center min-w-[100px]"
            >
              {updateTagsMutation.isPending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : "Save Tags"}
            </button>
            
            {updateTagsMutation.isError && (
              <div className="text-red-500 text-sm">Failed to update tags</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTagsForm;