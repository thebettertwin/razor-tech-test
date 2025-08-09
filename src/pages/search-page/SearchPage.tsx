import { MovieListingItem } from "@components/movie-listing";
import { useSearchContext } from "@context/SearchContext";
import { useNavigate } from "react-router-dom";

function SearchPage({ fetchNextPage }: { fetchNextPage: () => void }) {
  const { results: movieQueries, movieIds } = useSearchContext();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Search Results</h1>
      {movieIds.length > 0 ? (
        <>
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] gap-10 w-full">
            {movieQueries.map((query, index) => {
              // Find the imdbID for this index
              const imdbID = movieIds[index];
              if (query.isLoading) {
                return <p key={imdbID + "-loading"}>Loading</p>;
              } else if (query.isError) {
                return <p key={imdbID + "-error"}>Error</p>;
              } else if (query.data) {
                return (
                  <MovieListingItem
                    onItemClick={() =>
                      navigate(`/movie/${imdbID}`, {
                        state: { item: query.data },
                      })
                    }
                    key={imdbID}
                    movie={query.data}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          <button onClick={() => fetchNextPage()}>Load More</button>
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchPage;
