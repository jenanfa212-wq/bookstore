
import { Link } from "react-router-dom";
import "./BookCard.css"
function BookCard({ book }) {
    return (
        <Link
            to={`/book/${book.id}`}
            className="book book-link"
            aria-label={`View details for ${book.title} by ${book.author}`}
        >
            <img src={book.image} alt={book.title} />

            <h3>{book.title}</h3>

            <p>{book.author}</p>

            <span>{book.price} LYD</span>
        </Link>
    );
}

export default BookCard;
