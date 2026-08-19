import { useNavigate } from "react-router-dom";
function BookCard({ book, onSelect }) {
    const navigate = useNavigate();
    return (
        <article
            className="book"
            onClick={() => navigate(`/book/${book.id}`)}
        >
            <img src={book.image} alt={book.title} />

            <h3>{book.title}</h3>

            <p>{book.author}</p>

            <span>{book.price}</span>
        </article>
    );
}

export default BookCard;