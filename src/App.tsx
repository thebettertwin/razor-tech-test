import { Route, Routes } from "react-router-dom";
import MovieListingPage from "./pages/movie-listing-page/MovieListingPage";

import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieListingPage />} />
      {/* Add a NotFound component for unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
