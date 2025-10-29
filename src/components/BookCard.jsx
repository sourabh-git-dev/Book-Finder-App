import React from "react";

  const BookCard = ({ book }) => {
  const coverId = book.cover_i; 
  // image 
  const imageUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
        
    //book card format for fetched books
       <div className="book-card">

      <img src={imageUrl} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p> {/* fetch the author name if author name not exits it show unknown author */}

    </div>
  );
};

export default BookCard;
