import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {

    const [searchResults, setSearchResults] = useState([]);
    const [searchInfo, setSearchInfo] = useState({
        searchType: "",
        searchKey: "",
    });

    const clearSearch = () => {
        setSearchResults([]);
        setSearchInfo({ type: "", searchKey: "" });
    };

    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults, searchInfo, setSearchInfo, clearSearch }}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    return useContext(SearchContext);
}