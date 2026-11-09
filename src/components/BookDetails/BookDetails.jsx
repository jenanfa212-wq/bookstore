import { useParams } from "react-router-dom";
import "./BookDetails.css";
import books from "../../data/books";
function BookDetails({ addToCart, wishlist, setWishlist }) {
    const { id } = useParams();
    const book = books.find((book) => book.id === Number(id));
    const isInWishlist = wishlist.some((item) => item.id === book?.id);
    const toggleWishlist = () => {
        if (isInWishlist) {
            setWishlist((currentWishlist) =>
                currentWishlist.filter((item) => item.id !== book.id)
            );
        } else {
            setWishlist((currentWishlist) => [...currentWishlist, book]);
        }
    };
    console.log("Book ID:", id);
    return (
        <section className="book-details">
            {book ? (
                <div>
                    <img src={book.image} alt={book.title} />
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.price}</p>

                    <button onClick={() => addToCart(book)}>
                        Add to Cart
                    </button>

                    <button onClick={toggleWishlist}>
                        {isInWishlist ? "♥ Remove from Wishlist" : "♡ Add to Wishlist"}
                    </button>
                </div>
            ) : (
                <p>Book not found.</p>
            )}
        </section>
    );
}

export default BookDetails;