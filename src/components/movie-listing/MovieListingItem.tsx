import { forwardRef } from "react";
import type { MovieListingItemType } from "./types";

const MovieListingItem = forwardRef<HTMLDivElement, MovieListingItemType>(
  ({ movie, onItemClick, tabIndex }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        onItemClick?.();
      }
    };
    return (
      <figure
        tabIndex={tabIndex}
        ref={ref}
        className="relative group hover:cursor-pointer focus:outline-pink-500"
        onClick={onItemClick}
        onKeyDown={handleKeyDown}
      >
        <img
          className="h-full"
          src={movie.Poster}
          alt={`${movie.Title} poster`}
        />
        <figcaption className="text-white p-4 opacity-0 scale-50  group-hover:opacity-100 group-active:opacity-100 transition-all group-hover:scale-100 group-active:scale-100 delay-50 duration-300 ease-in-out h-full flex flex-col justify-center-safe absolute top-0 bg-gradient-to-br from-purple-400/90 via-pink-500/90 to-red-500/90 max-h-full overflow-auto">
          <h2 className="text-xl mb-8 font-bold">{movie.Title}</h2>
          <p className="text-left">
            <span className="font-bold">Director:</span> {movie.Director}
          </p>
          <p className="text-left">
            <span className="font-bold">Actors:</span> {movie.Actors}
          </p>
        </figcaption>
      </figure>
    );
  }
);
export default MovieListingItem;
