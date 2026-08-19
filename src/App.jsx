import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Bookshelf from "./components/Bookshelf/Bookshelf";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Bookshelf />
      </main>
    </>
  );
}

export default App;