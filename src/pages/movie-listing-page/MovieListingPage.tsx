import { useLocation } from "react-router-dom";

function MovieListingPage() {
  const location = useLocation();
  const { item } = location.state || {};
  console.log("MovieListingPage item:", item);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl">{item.Title}</h1>
        <p className="text-gray-500">
          {item.Year} | {item.Rated} | {item.Runtime}
        </p>
      </div>
      <div className="flex gap-8">
        <img src={item.Poster} alt={item.Title} className="w-48 h-72" />
        <div className="text-left">
          <p className="text-white">{item.Plot}</p>
          <p className="text-gray-500">
            Directed by {item.Director} | Starring {item.Actors}
          </p>
          <p className="text-gray-500">
            Genre: {item.Genre} | Language: {item.Language} | Country:{" "}
            {item.Country}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieListingPage;
