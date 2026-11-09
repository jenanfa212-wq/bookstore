import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Bookshelf from "./components/Bookshelf/Bookshelf";
import BookDetails from "./components/BookDetails/BookDetails";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import books from "./data/books";
import Wishlist from "./components/Wishlist/Wishlist";
import Books from "./components/Books/Books";
import About from "./components/About/About";
import Discover from "./components/Discover/Discover";
import YouthBox from "./components/YouthBox/YouthBox";
import Contact from "./components/Contact/Contact";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
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
        wishlist={wishlist}
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
        <Route path="/books" element={<Books />} />
        <Route path="/discover" element={<Discover addToCart={addToCart} />} />
        <Route path="/categories" element={<Categories books={books} />} />
        <Route path="/youth-box" element={<YouthBox />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/book/:id"
          element={
            <BookDetails
              addToCart={addToCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
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
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;