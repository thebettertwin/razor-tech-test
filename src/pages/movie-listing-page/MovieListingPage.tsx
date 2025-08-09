import { getMovieItem, type IMovieListing } from "@api/movie-item";
import Rating from "@components/rating/rating";
import { useSearchContext } from "@context/SearchContext";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

function MovieListingPage() {
  const { id } = useParams(); // imdbID
  const context = useSearchContext();
  const cachedItem = context?.results.find((q) => q.data?.imdbID === id)?.data;

  const [score, setScore] = useState(0);

  const { data, isLoading, isError } = useQuery<IMovieListing>({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await getMovieItem(id!);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json() as Promise<IMovieListing>;
    },
    enabled: !cachedItem, // skip if we already have it
  });

  const movie = cachedItem || data;

  if (isLoading && !movie) return <p>Loading...</p>;
  if (isError && !movie) return <p>Error loading movie.</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl">{movie.Title}</h1>
        <p className="text-gray-500">
          {movie.Year} | {movie.Rated} | {movie.Runtime}
        </p>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <img src={movie.Poster} alt={movie.Title} className="w-52 h-72" />
          <div className="flex justify-between w-52">
            <div className="flex flex-col gap-1">
              IMDb rating:
              <span>{movie.imdbRating}</span>
            </div>
            <div className="flex flex-col gap-1">
              Your rating: <Rating score={score} setScore={setScore} />
            </div>
          </div>
        </div>
        <div className="text-left">
          <p className="text-white">{movie.Plot}</p>
          <p className="text-gray-500">
            Directed by {movie.Director} | Starring {movie.Actors}
          </p>
          <p className="text-gray-500">
            Genre: {movie.Genre} | Language: {movie.Language} | Country:{" "}
            {movie.Country}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieListingPage;
