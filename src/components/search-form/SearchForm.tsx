import { useSearchContext } from "@context/SearchContext";
import { useState } from "react";

function SearchForm() {
  const { query, setQuery } = useSearchContext();
  const [searchQuery, setSearchQuery] = useState<string | undefined>(query);
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setQuery(searchQuery ?? "");
  };

  return (
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
  );
}

export default SearchForm;
