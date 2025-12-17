import { createContext, useContext, useState, ReactNode } from "react";

interface ProjectsSearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCount: number;
  setFilteredCount: (count: number) => void;
  totalCount: number;
  setTotalCount: (count: number) => void;
}

const ProjectsSearchContext = createContext<ProjectsSearchContextType>({
  searchQuery: "",
  setSearchQuery: () => {},
  filteredCount: 0,
  setFilteredCount: () => {},
  totalCount: 0,
  setTotalCount: () => {},
});

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
  return useContext(ProjectsSearchContext);
};
