import { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import MainLayout from "./components/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import SearchResultPage from "./pages/SearchResultPage";
import { FavoritesProvider, LoadingProvider, SearchProvider } from "./context";
import FavoritesPage from "./pages/FavoritesPage";
import ErrorScreen from "./utils/components/ErrorScreen";

function App() {
  return (
    <LoadingProvider>
      <FavoritesProvider>
        <SearchProvider>
          <div className="bg-background">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <BrowserRouter>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchResultPage />} />
                  <Route path="/recipe/:id" element={<RecipePage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="*" element={<ErrorScreen />} />
                </Routes>
              </MainLayout>
            </BrowserRouter>
          </div>
        </SearchProvider>
      </FavoritesProvider>
    </LoadingProvider>
  );
}

export default App;
