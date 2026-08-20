import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Bookshelf from "./components/Bookshelf/Bookshelf";
import BookDetails from "./components/BookDetails/BookDetails";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import books from "./data/books";
function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (book) => {
    setCart((currentCart) => {
      const existingBook = currentCart.find(
        (item) => item.id === book.id
      );

      if (existingBook) {
        return currentCart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...book, quantity: 1 }];
    });
  };
  const removeFromCart = (bookId) => {
    setCart((currentCart) =>
      currentCart.filter((book) => book.id !== bookId)
    );
  };
  const updateQuantity = (bookId, amount) => {
    setCart((currentCart) =>
      currentCart.map((book) =>
        book.id === bookId
          ? {
            ...book,
            quantity: Math.max(1, book.quantity + amount),
          }
          : book
      )
    );
  };
  return (
    <BrowserRouter>
      <Navbar
        cart={cart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <Bookshelf searchTerm={searchTerm} />
            </main>
          }
        />
        <Route
          path="/categories"
          element={<Categories books={books} />}
        />
        <Route
          path="/book/:id"
          element={<BookDetails addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;