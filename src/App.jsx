import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Default topics to show when search is empty
  const defaultTopics = ["harry potter", "programming", "science", "fiction"];

  //  Fetch books by title (used for default list)
  
  const fetchBooks = async (query) => {
    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await res.json();

      if (data.docs && data.docs.length > 0) {
        setBooks((prev) => [...prev, ...data.docs.slice(0, 5)]); // only 5 from each topic
      }
    } catch (err) {
      console.error("Failed to fetch default books", err);
    }
  };

  // Load default books when app starts

  useEffect(() => {
    const loadDefaults = async () => {
      setBooks([]); // clear existing
      for (const topic of defaultTopics) {
        await fetchBooks(topic);
      }
    };
    loadDefaults();
  }, []);

  // Search books when user search

  const searchBooks = async (query, searchType = "title") => {
    if (!query.trim()) {
      // empty  show default list again
      setBooks([]);
      for (const topic of defaultTopics) {
        await fetchBooks(topic);
      }
      return;
    }

    try {
      setLoading(true);
      setError("");

      //  Dynamic search by title or author

      const url =
        searchType === "author"
          ? `https://openlibrary.org/search.json?author=${query}`
          : `https://openlibrary.org/search.json?title=${query}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs.slice(0, 20)); // show first 20
      } else {
        setBooks([]);
        setError("No books found for that search.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>📘 Book Finder 📘</h1>

      {/*  Pass both query and searchType */}
      <SearchBar onSearch={searchBooks} />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <BookList books={books} />
    </div>
  );
}

export default App;
