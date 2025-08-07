import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useSearch } from "./api/search";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isPending, error, data } = useSearch({
    enabled: true,
    refetchOnMount: false,
    searchQuery: "Inception",
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <div>
      <h1>Search Results</h1>
      {data?.Search ? (
        <ul>
          {data.Search.map((movie) => (
            <li key={movie.imdbID}>
              {movie.Title} ({movie.Year})
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
      <p>Total Results: {data?.totalResults}</p>
      <p>Response Status: {data?.Response}</p>
      <p>Search Query: "Inception"</p>
    </div>
  );
}
