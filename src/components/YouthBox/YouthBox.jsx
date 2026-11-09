import "./YouthBox.css";

function YouthBox() {
    return (
        <main className="youthbox-page">
            <section className="youthbox-hero">
                <p className="page-label">USED BOOKS MARKETPLACE</p>
                <h1>Youth Box</h1>
                <p className="page-intro">
                    A playful corner for gently loved books, student favorites, and family reads.
                </p>
            </section>

            <section className="youthbox-content">
                <div className="youthbox-card">
                    <p className="page-label">COMING SOON</p>
                    <h2>Fresh finds for curious readers.</h2>
                    <p>
                        This placeholder page is ready for the Youth Box marketplace experience.
                        It keeps the brand style consistent while the secondhand browsing flow is developed.
                    </p>
                </div>

                <div className="youthbox-card accent">
                    <h3>What you can expect</h3>
                    <ul>
                        <li>Gently loved titles</li>
                        <li>Student-friendly picks</li>
                        <li>Affordable reading finds</li>
                    </ul>
                </div>
            </section>
        </main>
    );
}

export default YouthBox;
