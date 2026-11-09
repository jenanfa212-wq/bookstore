import "./Contact.css";

function Contact() {
    return (
        <main className="contact-page">
            <section className="contact-hero">
                <p className="page-label">CONTACT</p>
                <h1>We’d love to hear from you.</h1>
                <p className="page-intro">
                    Questions, reading recommendations, or a quick hello — this page is ready for
                    customer contact details and support updates.
                </p>
            </section>

            <section className="contact-card">
                <div>
                    <p className="contact-heading">How to reach us</p>
                    <p>
                        We’re preparing the contact details for this bookstore experience. Until then,
                        this page keeps the flow accessible and consistent with the rest of the site.
                    </p>
                </div>

                <div className="contact-badges">
                    <span>Book recommendations</span>
                    <span>Store updates</span>
                    <span>Reader support</span>
                </div>
            </section>
        </main>
    );
}

export default Contact;
