import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cart, wishlist }) {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <Link to="/">
                <img
                    src="/logo/brand-logo.jpg"
                    alt="Nook & Novel"
                    className="navbar-logo"
                />
            </Link>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/discover">Discover</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/youth-box">Youth Box</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>
            </div>

            <div className="nav-actions">
                <button type="button" onClick={() => navigate("/wishlist")}>
                    ♡ {wishlist.length}
                </button>

                <Link to="/cart">
                    🛒 {cart.reduce(
                        (total, book) => total + book.quantity,
                        0
                    )}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;