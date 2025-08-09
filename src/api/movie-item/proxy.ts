import endpoints from "../endpoints";
import { injectQueryParams } from "../helpers";

export async function getMovieItem(id: string) {
  return await fetch(
    injectQueryParams(endpoints.OMDBAPI, {
      i: id,
    })
  );
}
