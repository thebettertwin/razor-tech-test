import { useInfiniteQuery } from "@tanstack/react-query";
import type { ISearchResponse } from "./types";
import { getMovieListings } from "./proxy";

export default function useSearch({
  enabled = true,
  refetchOnMount = false,
  searchQuery,
}: {
  enabled?: boolean;
  refetchOnMount?: boolean;
  searchQuery?: string;
} = {}) {
  return useInfiniteQuery<ISearchResponse, Error>({
    queryKey: ["searchResult", searchQuery],
    queryFn: async ({ pageParam = "1" }) => {
      const response = await getMovieListings(
        searchQuery ?? "",
        pageParam as string
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<ISearchResponse>;
    },
    initialPageParam: "1",
    getNextPageParam: (_, allPages) => {
      // Future improvement to implement last page logic
      const nextPage = (allPages.length + 1).toString();
      return nextPage;
    },
    enabled: !!searchQuery && enabled,
    refetchOnMount,
  });
}
