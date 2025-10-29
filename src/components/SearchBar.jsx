import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("title"); // for search type default for title 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, searchType);
  };

  return (
    // to change search type  by title or author
    <form onSubmit={handleSubmit} className="search-bar">
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="search-select"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
        
      {/*input for the book search*/}
      
      <input
        type="text"
        placeholder={`Search for books by ${searchType}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
