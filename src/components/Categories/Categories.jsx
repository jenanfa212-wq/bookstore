import { useState } from "react";
import "./Categories.css"
import BookCard from "../BookCard/BookCard";
function Categories({ books }) {
    const categories = [
        "All",
        ...new Set(books.map((book) => book.category)),
    ];
    const [selectedCategory, setSelectedCategory] = useState("All");
    const filteredBooks =
        selectedCategory === "All"
            ? books
            : books.filter((book) => book.category === selectedCategory);
    return (
        <main className="categories">
            <h1>Categories</h1>
            <p>Choose a category</p>

            <div className="categories-list">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="category-books">
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                    />
                ))}
            </div>
        </main>
    );
}

export default Categories;