import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { Toaster } from "./components/ui/toaster";

// Pages
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Skills from "./pages/Skills";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <BrowserRouter>
            <Header />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </BrowserRouter>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
