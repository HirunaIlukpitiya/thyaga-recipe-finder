import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";
import { responseDataToRecipe } from "../utils/utils";
import { useLoading, useSearch } from "../context";

export default function SearchField({
  className,
  showSeperateButton,
  data,
  navigateTo,
  searchTrigger,
  handleChange,
  ...props
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoading } = useLoading();
  const { setSearchResults, setSearchInfo, searchInfo } = useSearch();

  var searchData;
  if (data.searchType) {
    searchData = data;
  } else if (searchInfo.searchType) {
    searchData = searchInfo;
  } else {
    searchData = {
      searchType: "recipe",
      searchKey: "",
    };
  }

  const handleSearch = () => {
    let apiEndpoint = "";
    if (searchData.searchType === "recipe") {
      apiEndpoint = `/search.php?s=${searchData.searchKey}`;
    } else if (searchData.searchType === "ingredient") {
      apiEndpoint = `/filter.php?i=${searchData.searchKey}`;
    } else if (searchData.searchType === "category") {
      apiEndpoint = `/filter.php?c=${searchData.searchKey}`;
    }

    if (!searchData.searchKey.trim()) {
      toast.error("Please enter a search term.");
      return;
    }
    setIsLoading(true);
    api
      .get(apiEndpoint)
      .then((response) => {
        const recipes = responseDataToRecipe(response.data);

        if (recipes.length === 0) {
          toast.info("No recipes found for your search.");
          setSearchResults([]);
          setSearchInfo({
            searchType: searchData.searchType,
            searchKey: searchData.searchKey,
          });
          return;
        }
        setSearchResults(recipes);
        setSearchInfo({
          searchType: searchData.searchType,
          searchKey: searchData.searchKey,
        });
        if (location.pathname === "/search") return;
        navigate("/search");
      })
      .catch((error) => {
        toast.error("Failed to fetch search results. Please try again later.");
        console.error("Error fetching search results:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!searchTrigger) return;
    handleSearch();
  }, [searchTrigger]);

  console.log("Input Data:", searchData);
  console.log("Search Info:", searchInfo);

  return (
    <div
      className={`${className} flex flex-col w-full gap-y-2 md:flex-row md:gap-x-4`}
    >
      <div className="relative w-full md:flex-1">
        <input
          className="border-solid border-2 rounded-md p-2 w-full h-full"
          type="text"
          placeholder={`${
            searchData.searchType === "recipe"
              ? "Search by recipe name"
              : searchData.searchType === "ingredient"
              ? "Search by ingredient"
              : "Search by category"
          }`}
          value={searchData.searchKey}
          name="searchKey"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {!showSeperateButton && (
          <span
            onClick={handleSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <FeatherIcon icon="search" className="ml-2" size={20} />
          </span>
        )}
      </div>
      {showSeperateButton && (
        <button
          onClick={handleSearch}
          className="bg-primary-light gap-3 md:gap-2 flex justify-center items-center py-2 px-4 rounded-md text-white hover:bg-primary transition-colors duration-300 w-full md:w-auto"
        >
          <FeatherIcon icon="search" className="text-white" size={20} />
          <span className="text-white">Search</span>
        </button>
      )}
    </div>
  );
}
