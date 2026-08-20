import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cart, searchTerm, setSearchTerm }) {
    return (
        <nav className="navbar">
            <h1 className="logo">My Bookstore</h1>

            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/books">Books</a>
                <a href="/categories">Categories</a>
                <a href="/about">About</a>
            </div>
            <div className="nav-actions">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>♡</button>
                <Link to="/cart">
                    🛒 {cart.reduce((total, book) => total + book.quantity, 0) || ""}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;