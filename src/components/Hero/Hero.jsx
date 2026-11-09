import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <p className="eyebrow">Curated stories for curious minds</p>
                <h1>Find Your Next Chapter.</h1>

                <p className="hero-description">
                    Discover beautifully written stories, timeless ideas, and unforgettable worlds that stay with you long after the last page.
                </p>

                <div className="hero-buttons">
                    <Link to="/categories" className="primary-button">
                        Browse Categories
                    </Link>

                    <Link to="/discover" className="secondary-button">
                        Discover Your Next Read
                    </Link>
                </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
                <div className="hero-stack">
                    <span className="book-spine book-spine-one" />
                    <span className="book-spine book-spine-two" />
                    <span className="book-spine book-spine-three" />
                    <span className="book-spine book-spine-four" />
                </div>
            </div>
        </section>
    );
}

export default Hero;