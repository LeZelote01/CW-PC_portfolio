import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Layout from "./components/common/Layout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Skills from "./pages/Skills";
import Testimonials from "./pages/Testimonials";
import Services from "./pages/Services";
import Messages from "./pages/Messages";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/messages" element={<Messages />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;