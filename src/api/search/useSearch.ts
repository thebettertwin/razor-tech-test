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
    getNextPageParam: (lastPage, allPages) => {
      // Replace this logic with your own pagination logic as needed
      // For example, if lastPage has a property 'nextPage', return it:
      // return lastPage.nextPage;
      // Here, we just increment the page number as a string
      const nextPage = (allPages.length + 1).toString();
      // Optionally, check if there are more pages
      // return lastPage.hasMore ? nextPage : undefined;
      return nextPage;
    },
    enabled: !!searchQuery && enabled,
    refetchOnMount,
  });
}
