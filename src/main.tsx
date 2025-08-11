import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "@context/SearchContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchProvider movieIds={[]}>
        <BrowserRouter
          basename={import.meta.env.DEV ? "/" : "/razor-tech-test"}
        >
          <Routes>
            <Route Component={App} path="*" />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </QueryClientProvider>
  </StrictMode>
);
