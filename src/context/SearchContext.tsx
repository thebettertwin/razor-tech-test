import { getMovieItem, type IMovieListing } from "@api/movie-item";
import { useSearch } from "@api/search-form";
import { useQueries, type UseQueryResult } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Define the shape of your context
interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
  results: UseQueryResult<IMovieListing>[];
  page: number;
  setPage: (p: number) => void;
  movieIds: string[];
  setMovieIds: (ids: string[]) => void;
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: () => void;
}

// Create the context with a default value (undefined initially)
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// Provider component
interface SearchProviderProps {
  children: ReactNode;
  movieIds: string[];
}

export const SearchProvider = ({
  movieIds: initialMovieIds = [],
  children,
}: SearchProviderProps) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [movieIds, setMovieIds] = useState<string[]>(initialMovieIds);

  const { fetchNextPage, isLoading, error, data } = useSearch({
    searchQuery: query,
  });

  const results = useQueries({
    queries: movieIds.map((id, index) => ({
      queryKey: ["movieItem", id, index], // add idx to ensure uniqueness
      queryFn: async () => {
        const response = await getMovieItem(id);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json() as Promise<IMovieListing>;
      },
    })),
  });

  useEffect(() => {
    const ids =
      data?.pages?.flatMap(
        (page) => page.Search?.map((movie) => movie.imdbID) || []
      ) || [];
    setMovieIds(ids);
  }, [data]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        page,
        setPage,
        movieIds,
        setMovieIds,
        isLoading,
        error: error ?? null,
        fetchNextPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
