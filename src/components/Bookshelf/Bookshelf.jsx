import "./Bookshelf.css";
import BookCard from "../BookCard/BookCard";
import books from "../../data/books";
function Bookshelf({ searchTerm }) {
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <section className="bookshelf">
            <div className="bookshelf-header">
                <p>EXPLORE</p>
                <h2>Fiction</h2>
            </div>

            <div className="books">
                {filteredBooks.map((book) => (
                    <BookCard
                        book={book}
                        key={book.id}

                    />
                ))}
            </div>

            <div className="shelf"></div>
        </section>
    );
}

export default Bookshelf;