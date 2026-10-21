import { useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { About, Services, Work, Contact } from "./components/Sections";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Contact />
      </main>
    </>
  );
}