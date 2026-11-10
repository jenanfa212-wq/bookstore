import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import books from "../../data/books";
import "./Navbar.css";

function Navbar({ cart = [], wishlist = [], searchTerm = "", setSearchTerm }) {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [localSearch, setLocalSearch] = useState("");
    const query = typeof setSearchTerm === "function" ? searchTerm : localSearch;
    const updateQuery = typeof setSearchTerm === "function" ? setSearchTerm : setLocalSearch;

    const matchingBooks = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return [];

        return books
            .filter((book) =>
                book.title.toLowerCase().includes(normalizedQuery) ||
                book.author.toLowerCase().includes(normalizedQuery)
            )
            .slice(0, 4);
    }, [query]);

    const cartCount = cart.reduce((total, book) => total + (Number(book.quantity) || 0), 0);
    const wishlistCount = wishlist.length;

    const closeMenu = () => setMobileMenuOpen(false);

    const openBook = (bookId) => {
        navigate(`/book/${bookId}`);
        updateQuery("");
        closeMenu();
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (matchingBooks.length > 0) {
            openBook(matchingBooks[0].id);
        } else if (query.trim()) {
            navigate("/books");
            closeMenu();
        }
    };

    return (
        <header className="site-header">
            <nav className="navbar" aria-label="Main navigation">
                <Link to="/" className="navbar-brand" aria-label="Nook & Novel home" onClick={closeMenu}>
                    <span className="brand-mark" aria-hidden="true">n<span>✦</span></span>
                    <span className="brand-name">Nook <i>&</i> Novel</span>
                </Link>

                <button
                    className="mobile-menu-toggle"
                    type="button"
                    aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={mobileMenuOpen}
                    aria-controls="primary-navigation"
                    onClick={() => setMobileMenuOpen((open) => !open)}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <div id="primary-navigation" className={`nav-links ${mobileMenuOpen ? "is-open" : ""}`}>
                    <Link to="/" onClick={closeMenu}>Home</Link>
                    <Link to="/discover" onClick={closeMenu}>Discover</Link>
                    <Link to="/categories" onClick={closeMenu}>Categories</Link>
                    <Link to="/youth-box" onClick={closeMenu}>Youth Box</Link>
                    <Link to="/contact" onClick={closeMenu}>Contact</Link>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                </div>

                <div className="nav-actions">
                    <form className="nav-search" role="search" onSubmit={handleSearchSubmit}>
                        <span className="search-icon" aria-hidden="true">⌕</span>
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => updateQuery(event.target.value)}
                            placeholder="Search books"
                            aria-label="Search books by title or author"
                            aria-autocomplete="list"
                            aria-controls="navbar-search-results"
                        />
                        {query.trim() && (
                            <button
                                className="search-clear"
                                type="button"
                                aria-label="Clear search"
                                onClick={() => updateQuery("")}
                            >
                                ×
                            </button>
                        )}
                        {query.trim() && (
                            <div className="search-results" id="navbar-search-results" role="listbox">
                                {matchingBooks.length > 0 ? matchingBooks.map((book) => (
                                    <button
                                        className="search-result"
                                        type="button"
                                        role="option"
                                        aria-selected="false"
                                        key={book.id}
                                        onClick={() => openBook(book.id)}
                                    >
                                        <img src={book.image} alt="" />
                                        <span>
                                            <strong>{book.title}</strong>
                                            <small>{book.author}</small>
                                        </span>
                                    </button>
                                )) : (
                                    <p className="search-empty">No matching books yet. Press Enter to browse the collection.</p>
                                )}
                            </div>
                        )}
                    </form>

                    <Link className="nav-icon-link" to="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`} onClick={closeMenu}>
                        <span aria-hidden="true">♡</span>
                        <span className="nav-count">{wishlistCount}</span>
                    </Link>
                    <Link className="nav-icon-link" to="/cart" aria-label={`Shopping cart, ${cartCount} items`} onClick={closeMenu}>
                        <span aria-hidden="true">♧</span>
                        <span className="nav-count">{cartCount}</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
