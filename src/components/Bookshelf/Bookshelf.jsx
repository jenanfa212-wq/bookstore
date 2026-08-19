import "./Bookshelf.css";
import BookCard from "../BookCard/BookCard";
import books from "../../data/books";
function Bookshelf({ onBookSelect }) {
    return (
        <section className="bookshelf">
            <div className="bookshelf-header">
                <p>EXPLORE</p>
                <h2>Fiction</h2>
            </div>

            <div className="books">
                {books.map((book) => (
                    <BookCard
                        book={book}
                        key={book.id}
                        onSelect={onBookSelect}
                    />
                ))}
            </div>

            <div className="shelf"></div>
        </section>
    );
}

export default Bookshelf;