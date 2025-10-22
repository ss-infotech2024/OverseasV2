import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// === Layout & Shared Components ===
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// === Pages ===
import Home from "./pages/Home";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import Universities from "./pages/Universities";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import UniversityDetails from "./pages/UniversitiesDetails";
import AllUniversities from "./pages/AllUniversities";
import CourseDetails from "./pages/CourseDetails";
import InquiryForm from "./pages/InquiryForm";

// === NEW: Auth & Admin Pages ===
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="font-sans text-baseGray bg-softWhite min-h-screen flex flex-col">
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* === Public Routes === */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/universities/:countryName" element={<Universities />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/university/:universityName" element={<UniversityDetails />} />
            <Route path="/all-universities" element={<AllUniversities />} />
            <Route path="/course/:country/:slug" element={<CourseDetails />} />
            <Route path="/inquiryform" element={<InquiryForm />} />

            {/* === Auth & Admin Routes === */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;