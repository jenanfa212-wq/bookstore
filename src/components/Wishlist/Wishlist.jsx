import "./Wishlist.css";

function Wishlist({ wishlist, setWishlist }) {
    return (
        <main
            className="wishlist"
            style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "40px",
            }}
        >
            <h1>My Wishlist</h1>

            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div
                    className="wishlist-books"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 180px)",
                        gap: "20px",
                    }}
                >
                    {wishlist.map((book) => (
                        <div
                            className="wishlist-book"
                            key={book.id}
                            style={{
                                width: "180px",
                                padding: "12px",
                                boxSizing: "border-box",
                            }}
                        >
                            <img
                                src={book.image}
                                alt={book.title}
                                style={{
                                    width: "156px",
                                    height: "190px",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />

                            <h2>{book.title}</h2>

                            <p>{book.author}</p>

                            <p>${book.price}</p>
                            <button
    onClick={() =>
        setWishlist((currentWishlist) =>
            currentWishlist.filter((item) => item.id !== book.id)
        )
    }
>
    Remove
</button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Wishlist;