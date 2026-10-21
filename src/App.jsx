import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { About, Services, Work, Contact } from "./components/Sections";

export default function App() {
  return (
    <>
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