import { useState } from "react";
import "./Categories.css";
import BookCard from "../BookCard/BookCard";

const categoryIcons = {
    All: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
            <rect x="16" y="22" width="10" height="22" rx="2" />
            <rect x="27" y="18" width="10" height="26" rx="2" />
            <rect x="38" y="14" width="10" height="30" rx="2" />
            <path d="M16 44h32" />
        </svg>
    ),
    "Self-Development": (
        <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M22 42c6-8 10-15 10-24" />
            <path d="M32 18c3 6 8 11 14 16" />
            <path d="M32 18V8" />
            <path d="M22 42c4 4 10 6 18 6" />
            <path d="M16 48c7-4 11-6 16-6 8 0 12 2 16 6" />
        </svg>
    ),
    Fantasy: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M20 42l12-24 12 24-12-8-12 8Z" />
            <path d="M18 46h28" />
            <path d="M32 18V8" />
            <path d="M27 12h10" />
        </svg>
    ),
    Fiction: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M16 18c0-3 2-6 6-6h20c4 0 6 3 6 6v27c0 3-2 6-6 6H22c-4 0-6-3-6-6V18Z" />
            <path d="M23 16v31" />
            <path d="M41 16v31" />
            <path d="M16 28h32" />
        </svg>
    ),
    Memoir: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
            <rect x="18" y="14" width="28" height="36" rx="3" />
            <path d="M23 24h18" />
            <path d="M23 31h18" />
            <path d="M23 38h12" />
            <path d="M41 14v36" />
        </svg>
    ),
    default: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
            <rect x="18" y="18" width="28" height="28" rx="4" />
            <path d="M24 24h16" />
            <path d="M24 32h16" />
            <path d="M24 40h10" />
        </svg>
    ),
};

function Categories({ books }) {
    const categories = ["All", ...new Set(books.map((book) => book.category))];
    const [selectedCategory, setSelectedCategory] = useState("All");

    const visibleCategories =
        selectedCategory === "All"
            ? categories.filter((category) => category !== "All")
            : [selectedCategory];

    const categoryBooks = visibleCategories.map((category) => ({
        category,
        books: books.filter((book) => book.category === category),
    }));

    return (
        <main className="categories-library">
            <header className="categories-header">
                <p className="categories-label">FIND YOUR NEXT READ</p>
                <h1>Explore the Library</h1>
                <p>Browse the shelves and discover your next favorite story.</p>
            </header>

            <div className="categories-list" aria-label="Book categories">
                {categories.map((category) => {
                    const isSelected = selectedCategory === category;
                    const illustration = categoryIcons[category] ?? categoryIcons.default;

                    return (
                        <button
                            key={category}
                            type="button"
                            className={
                                isSelected ? "category-button active" : "category-button"
                            }
                            aria-label={`Filter books by ${category} category`}
                            aria-pressed={isSelected}
                            onClick={() => setSelectedCategory(category)}
                        >
                            <span className="category-visual" aria-hidden="true">
                                {illustration}
                            </span>
                            <span className="category-name">{category}</span>
                        </button>
                    );
                })}
            </div>

            <div className="library-bookcase" aria-live="polite">
                {categoryBooks.length > 0 ? (
                    categoryBooks.map(({ category, books: sectionBooks }) => (
                        <section key={category} className="library-shelf-section">
                            <div className="library-shelf-label">{category.toUpperCase()}</div>
                            <div className="library-shelf">
                                {sectionBooks.map((book) => (
                                    <div className="library-book-slot" key={book.id}>
                                        <BookCard book={book} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))
                ) : (
                    <p className="no-category-books">No books found in this category yet.</p>
                )}
            </div>
        </main>
    );
}

export default Categories;