import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Bookshelf from "./components/Bookshelf/Bookshelf";
import BookDetails from "./components/BookDetails/BookDetails";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />

              <Bookshelf onBookSelect={setSelectedBook} />

              {selectedBook && (
                <BookDetails book={selectedBook} />
              )}
            </main>
          }
        />
        <Route
          path="/book/:id"
          element={<BookDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;