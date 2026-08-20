import "./Cart.css";
function Cart({ cart, removeFromCart, updateQuantity }) {
    const total = cart.reduce(
        (sum, book) => sum + Number(book.price) * book.quantity,
        0
    );

    return (
        <main className="cart">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cart.map((book) => (
                    <div className="cart-item" key={book.id}>
                        <img src={book.image} alt={book.title} />
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        <p>{book.price}</p>
                        <div className="quantity-controls">
                            <button onClick={() => updateQuantity(book.id, -1)}>
                                −
                            </button>

                            <span>{book.quantity}</span>

                            <button onClick={() => updateQuantity(book.id, 1)}>
                                +
                            </button>
                        </div>
                        <button onClick={() => removeFromCart(book.id)}>
                            Remove
                        </button>
                    </div>
                ))
            )}
            {cart.length > 0 && (
                <div className="cart-total">
                    <h2>Total: ${total}</h2>
                </div>
            )}
        </main>
    );
}

export default Cart;