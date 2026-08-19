import "./Hero.css";
function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <p className="hero-label">WELCOME TO OUR LIBRARY</p>

                <h2>Welcome to your next chapter.</h2>

                <p>
                    Discover books, explore new worlds, and find your next favorite read.
                </p>

                <div className="hero-buttons">
                    <button>Explore the Library</button>
                    <button>Browse Categories</button>
                </div>
            </div>
        </section>
    );
}

export default Hero;