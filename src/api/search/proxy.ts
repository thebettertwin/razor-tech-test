import endpoints from "../endpoints";
import { injectQueryParams } from "../helpers";

export async function getMovieListings(searchQuery: string, page = "1") {
  return await fetch(
    injectQueryParams(endpoints.OMDBAPI, {
      type: "movie",
      s: searchQuery,
      page,
    })
  );
}
