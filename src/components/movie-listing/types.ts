import type { IMovieListing } from "@api/movie-item";

export type MovieListingItemType = {
  movie: IMovieListing;
  onItemClick?: () => void;
};
