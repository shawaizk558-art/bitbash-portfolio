import { createContext, useContext, useState, ReactNode } from "react";

interface ProjectsSearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCount: number;
  setFilteredCount: (count: number) => void;
  totalCount: number;
  setTotalCount: (count: number) => void;
}

// Use undefined as default to avoid minification issues with function references
const ProjectsSearchContext = createContext<ProjectsSearchContextType | undefined>(undefined);

export const ProjectsSearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCount, setFilteredCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  return (
    <ProjectsSearchContext.Provider value={{ 
      searchQuery, 
      setSearchQuery,
      filteredCount,
      setFilteredCount,
      totalCount,
      setTotalCount,
    }}>
      {children}
    </ProjectsSearchContext.Provider>
  );
};

export const useProjectsSearch = () => {
  const context = useContext(ProjectsSearchContext);
  if (context === undefined) {
    throw new Error("useProjectsSearch must be used within a ProjectsSearchProvider");
  }
  return context;
};
