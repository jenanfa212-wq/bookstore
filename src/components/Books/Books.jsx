import { useState } from "react";
import "./Books.css";
import BookCard from "../BookCard/BookCard";
import books from "../../data/books";

function Books() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...new Set(books.map((book) => book.category))];

    const filteredBooks = books.filter((book) => {
        const matchesCategory =
            selectedCategory === "All" || book.category === selectedCategory;

        const query = searchTerm.trim().toLowerCase();
        const matchesSearch =
            query === "" ||
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    return (
        <main className="all-books">
            <header className="all-books-header">
                <p className="all-books-label">OUR COLLECTION</p>
                <h1>Discover Your Next Read</h1>
                <p>Explore our collection and find a book you'll love.</p>
            </header>

            <div className="all-books-controls">
                <label className="all-books-search" htmlFor="book-search">
                    <span className="sr-only">Search books by title or author</span>
                    <input
                        id="book-search"
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </label>

                <div className="all-books-categories" aria-label="Book categories">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={`all-books-category ${selectedCategory === category ? "is-active" : ""
                                }`}
                            onClick={() => setSelectedCategory(category)}
                            aria-pressed={selectedCategory === category}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <section className="all-books-grid" aria-live="polite">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))
                ) : (
                    <div className="no-books">
                        <p>No books match your search or selected category.</p>
                        <span>Try another title, author, or filter.</span>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Books;