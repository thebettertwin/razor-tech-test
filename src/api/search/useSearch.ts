import { useQuery } from "@tanstack/react-query";
import type { ISearchResponse } from "./types";
import { getMovieListings } from "./proxy";

export default function useSearch({
  enabled = true,
  refetchOnMount = false,
  searchQuery = "",
}: {
  enabled?: boolean;
  refetchOnMount?: boolean;
  searchQuery?: string;
} = {}) {
  return useQuery<ISearchResponse, Error>({
    queryKey: ["searchResult"],
    queryFn: async () => {
      const response = await getMovieListings(searchQuery);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<ISearchResponse>;
    },
    enabled,
    refetchOnMount,
  });
}
