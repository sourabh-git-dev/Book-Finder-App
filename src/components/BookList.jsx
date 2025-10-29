import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books }) => {

  // error handling for if the api not loaded
  if (!books || books.length === 0) {
    return (<p className="info-text">No books to display 📖</p>);
  }

  return (

    <div className="book-list">
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
};

export default BookList;
