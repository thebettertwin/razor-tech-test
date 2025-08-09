import { useQuery } from "@tanstack/react-query";
import type { IMovieListing } from "./types";
import { getMovieItem } from "./proxy";

export default function useMovieItem({
  enabled = true,
  refetchOnMount = false,
  id,
}: {
  enabled?: boolean;
  refetchOnMount?: boolean;
  id: string;
}) {
  return useQuery<IMovieListing, Error>({
    queryKey: ["MovieItem"],
    queryFn: async () => {
      const response = await getMovieItem(id);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<IMovieListing>;
    },
    enabled,
    refetchOnMount,
  });
}
