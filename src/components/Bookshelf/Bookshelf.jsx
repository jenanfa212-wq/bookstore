import "./Bookshelf.css";
const books = [
    { id: 1, title: "Book One" },
    { id: 2, title: "Book Two" },
    { id: 3, title: "Book Three" },
    { id: 4, title: "Book Four" },
    { id: 5, title: "Book Five" },
];

function Bookshelf() {
    return (
        <section className="bookshelf">
            <div className="bookshelf-header">
                <p>EXPLORE</p>
                <h2>Fiction</h2>
            </div>

            <div className="books">
                {books.map((book) => (
                    <div className="book" key={book.id}>
                        {book.title}
                    </div>
                ))}
            </div>

            <div className="shelf"></div>
        </section>
    );
}

export default Bookshelf;