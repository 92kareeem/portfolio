import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { AllNews, NewsArticle } from './components/AINews'; // Corrected imports

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-5xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <div className="min-h-screen bg-gray-950 text-gray-100">
          <Navigation />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
              </>
            } />
            {/* Updated news routes */}
            <Route path="/news" element={<AllNews />} />
            <Route path="/news/:slug" element={<NewsArticle />} />
            {/* Keep blog routes if needed for backward compatibility */}
            <Route path="/blog" element={<AllNews />} />
            <Route path="/blog/:slug" element={<NewsArticle />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;