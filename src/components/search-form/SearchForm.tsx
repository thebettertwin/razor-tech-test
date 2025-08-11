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
    <search className="mb-10">
      <form onSubmit={handleSearch} className="flex gap-4">
        <label className="sr-only" htmlFor="movie">
          Search for a movie
        </label>
        <input
          className="w-full px-4 py-2 rounded-sm border-1 dark:border-white/25 border-gray-800/25"
          type="search"
          id="movie"
          value={searchQuery || ""}
          onChange={handleSearchQueryChange}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>
    </search>
  );
}

export default SearchForm;
