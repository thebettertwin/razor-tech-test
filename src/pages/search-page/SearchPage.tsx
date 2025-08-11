import { MovieListingItem } from "@components/movie-listing";
import { useSearchContext } from "@context/SearchContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchPage({ fetchNextPage }: { fetchNextPage: () => void }) {
  const { results: movieQueries, movieIds, query } = useSearchContext();
  const navigate = useNavigate();
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  //   the below allows you to tab into the movie listings and move through with them with the arrow keys
  //   future improvement would be to get it to work with up/down
  useEffect(() => {
    itemRefs.current[focusedIndex]?.focus();
  }, [focusedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setFocusedIndex((prev) => (prev + 1) % movieIds.length);
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      setFocusedIndex((prev) => (prev - 1 + movieIds.length) % movieIds.length);
      e.preventDefault();
    }
  };

  return (
    <div>
      <h1 className="sr-only">Search Results</h1>
      {movieIds.length > 0 ? (
        <>
          <div
            role="list"
            aria-label="Movie Listings"
            onKeyDown={handleKeyDown}
            className="grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] gap-10 w-full mb-8"
          >
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
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    tabIndex={index === focusedIndex ? 0 : -1}
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
        query.length > 0 && <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchPage;
