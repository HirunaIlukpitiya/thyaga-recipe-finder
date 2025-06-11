import { useEffect, useState } from "react";
import AppContainer from "../components/layout/AppContainer";
import SearchField from "../components/SearchField";
import { useSearch } from "../context";
import RecipeCard from "../components/RecipeCard";
import noFood from "../assets/noFood.svg";
import Pagination from "../utils/components/Pagination";

export default function SearchResultPage() {
  const { searchResults, searchInfo } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const [inputData, setInputData] = useState({
    searchType: searchInfo.searchType || "recipe",
    searchKey: searchInfo.searchKey || "",
  });

  const itemsPerPage = 8;
  const totalPages =
    searchResults.length > itemsPerPage
      ? Math.ceil(searchResults.length / itemsPerPage)
      : 1 || 1;

  const currentRecipes = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  useEffect(() => {
    window.scrollTo({
      top: -10,
      behavior: "smooth",
    });
  }, [currentPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (searchInfo?.searchKey) {
      setInputData({
        searchType: searchInfo.searchType || "recipe",
        searchKey: searchInfo.searchKey,
      });
    }
  }, [searchInfo]);

  console.log("Search Results:", searchResults);
  return (
    <AppContainer>
      <div className="">
        <div className="py-4">
          <SearchField data={inputData} handleChange={handleInputChange} />
        </div>
        <div className="">
          <h1 className="text-lg font-bold">
            Search Results for "{searchInfo.searchKey}"
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            {searchResults.length} recipes found
          </p>
        </div>
        {searchResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
              {currentRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="my-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 ">
            <img
              src={noFood}
              alt="noFood"
              className="mx-auto w-auto h-74 object-contain mb-4"
            />
            <p className="text-gray-500">
              No recipes found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </AppContainer>
  );
}
