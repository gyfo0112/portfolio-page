import './index.css';
import './styles/scroll.css';
import './styles/glass.css';
import './styles/darkmode.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BlobBackground from './components/BlobBackground';
import ThemeToggle from './components/ThemeToggle';
import { useScrollAnimation } from './hooks/useScrollAnimation';

function App() {
  useScrollAnimation();

  return (
    <>
      <BlobBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
      <ThemeToggle />
    </>
  );
}

export default App;
