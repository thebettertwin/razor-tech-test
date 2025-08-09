import { SearchForm } from "@components/search-form";
import SearchPage from "../search-page/SearchPage";
import { useSearchContext } from "@context/SearchContext";

function Home() {
  const { isLoading, error, fetchNextPage } = useSearchContext();
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <SearchForm />
      <br />
      <br />
      {isLoading ? (
        <p>Loading search results...</p>
      ) : (
        <SearchPage fetchNextPage={fetchNextPage} />
      )}
    </>
  );
}

export default Home;
