import "./About.css";
function About() {
    return (<main className="about-page"> <section className="about-hero"> <p className="about-label">OUR STORY</p>
        <h1>
            A little world
            <br />
            of books.
        </h1>

        <p className="about-intro">
            Every book opens a door to a new world.
            We created DigitalBookStore to help you
            discover stories, explore ideas, and find
            your next favorite read.
        </p>
    </section>

        <section className="about-story">
            <div className="about-story-content">
                <p className="about-label">WHO WE ARE</p>

                <h2>More than just a bookstore.</h2>

                <p>
                    DigitalBookStore is an online space
                    for curious minds and passionate readers.
                    Whether you love getting lost in fiction,
                    discovering new perspectives, or learning
                    something new, there is always something
                    waiting for you here.
                </p>
            </div>

            <div className="about-quote">
                <span className="quote-mark">“</span>
                <p>
                    A book is a journey you can take
                    without leaving your favorite place.
                </p>
            </div>
        </section>

        <section className="about-mission">
            <p className="about-label">OUR MISSION</p>

            <h2>Helping every reader find their next chapter.</h2>

            <p>
                We believe finding a good book should feel
                simple, inspiring, and personal. Our goal is
                to make exploring books an enjoyable part
                of your everyday life.
            </p>
        </section>
    </main>
    );
}
export default About;