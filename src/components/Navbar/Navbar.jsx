import "./Navbar.css";

function Navbar() {
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
                <button>Search</button>
                <button>♡</button>
                <button>🛒</button>
            </div>
        </nav>
    );
}

export default Navbar;