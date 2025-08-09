import { useQueries } from "@tanstack/react-query";
import { useSearch } from "@api/search";
import { useState } from "react";
import { MovieListingItem } from "@components/movie-listing";
import { getMovieItem, type IMovieListing } from "@api/movie-item";

import { Route, Routes, useNavigate } from "react-router-dom";
import MovieListingPage from "./pages/movie-listing-page/MovieListingPage";

export default function App() {
  return (
    <Routes>
      <Route Component={Search} path="/" />
      <Route Component={MovieListingPage} path="/movie/:id" />
      {/* Add a NotFound component for unmatched routes */}
      {/* <Route Component={NotFound} path="*" /> */}
    </Routes>
  );
}

function Search() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const [submittedQuery, setSubmittedQuery] = useState<string | undefined>();
  const navigate = useNavigate();

  const { fetchNextPage, isLoading, error, data } = useSearch({
    searchQuery: submittedQuery,
  });

  // Collect all imdbIDs from the search results
  const movieIds =
    data?.pages?.flatMap(
      (page) => page.Search?.map((movie) => movie.imdbID) || []
    ) || [];

  // Use useQueries to fetch details for each movie
  const movieQueries = useQueries({
    queries: movieIds.map((id, index) => ({
      queryKey: ["movieItem", id, index], // add idx to ensure uniqueness
      queryFn: async () => {
        const response = await getMovieItem(id);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json() as Promise<IMovieListing>;
      },
      enabled: !!data,
    })),
  });

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setSubmittedQuery(searchQuery);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <search>
        <form onSubmit={handleSearch}>
          <label htmlFor="movie">Find a Movie</label>
          <input
            type="search"
            id="movie"
            value={searchQuery || ""}
            onChange={handleSearchQueryChange}
          />
          <button type="submit">Search</button>
        </form>
      </search>
      <br />
      <br />
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
      <p>Total Results: {data?.pages?.[0]?.totalResults}</p>
      <p>Response Status: {data?.pages?.[0]?.Response}</p>
    </div>
  );
}
