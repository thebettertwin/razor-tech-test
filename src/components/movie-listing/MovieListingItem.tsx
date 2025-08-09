import type { MovieListingItemType } from "./types";

function MovieListingItem({ movie, onItemClick }: MovieListingItemType) {
  return (
    <figure onClick={onItemClick}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <figcaption>
        <h2>{movie.Title}</h2>
        <p>Director: {movie.Director}</p>
        <p>Actors: {movie.Actors}</p>
      </figcaption>
    </figure>
  );
}
export default MovieListingItem;
