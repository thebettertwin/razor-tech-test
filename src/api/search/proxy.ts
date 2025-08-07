import endpoints from "../endpoints";
import { injectQueryParams } from "../helpers";

export async function getMovieListings(searchQuery: string) {
  return await fetch(
    injectQueryParams(endpoints.OMDBAPI, {
      s: searchQuery,
    })
  );
}
