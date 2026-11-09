
import "./Bookshelf.css";
import { Link } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import books from "../../data/books";

function Bookshelf() {
    const categories = [
        {
            name: "Fiction",
            description: "Stories that take you somewhere new.",
        },
        {
            name: "Fantasy",
            description: "Discover extraordinary worlds.",
        },
        {
            name: "Self-Development",
            description: "Ideas to help you grow.",
        },
        {
            name: "Memoir",
            description: "Real lives and inspiring journeys.",
        },
    ];

    const sections = [
        {
            title: "Bestsellers",
            subtitle: "Reader favorites worth discovering",
            books: books.filter((book) => book.isBestseller),
        },
        {
            title: "New Arrivals",
            subtitle: "Fresh additions to the collection",
            books: books.filter((book) => book.isNewArrival),
        },
        {
            title: "Editor's Picks",
            subtitle: "A few reads we think you'll love",
            books: [books[0], books[2], books[4]].filter(Boolean),
        },
    ];

    return (
        <section className="bookshelf">
            <header className="library-heading">
                <p className="library-label">THE DIGITAL LIBRARY</p>
                <h2>Find your next chapter.</h2>
                <p className="library-intro">
                    Discover books that spark wonder, deepen your thinking, and keep you company long after the final page.
                </p>
                <Link to="/books" className="library-button">
                    Explore All Books
                </Link>
            </header>

            {sections.map((section) => (
                <section className="library-section" key={section.title}>
                    <header className="bookshelf-header">
                        <p>DISCOVER YOUR NEXT READ</p>
                        <h2>{section.title}</h2>
                        <span>{section.subtitle}</span>
                    </header>

                    <div className="library-shelf">
                        <div className="books">
                            {section.books.map((book) => (
                                <BookCard book={book} key={book.id} />
                            ))}
                        </div>
                        <div className="shelf" aria-hidden="true" />
                    </div>
                </section>
            ))}

            <section className="library-section">
                <header className="bookshelf-header">
                    <p>FIND YOUR GENRE</p>
                    <h2>Browse by Category</h2>
                    <span>Find stories and ideas that match your interests.</span>
                </header>

                <div className="category-grid">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            to="/categories"
                            className="category-card"
                        >
                            <span className="category-card-icon">✦</span>
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                            <span className="category-card-link">Explore category →</span>
                        </Link>
                    ))}
                </div>
            </section>
        </section>
    );
}

export default Bookshelf;
