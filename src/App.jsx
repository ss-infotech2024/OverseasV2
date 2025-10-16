import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import Universities from "./pages/Universities";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import UniversityDetails from "./pages/UniversitiesDetails";
import Footer from "./components/Footer";
import AllUniversities from "./pages/AllUniversities";
import CourseDetails from "./pages/CourseDetails"; // Added import for CourseDetails
import InquiryForm from "./pages/InquiryForm";

const App = () => {
  return (
    <Router>
      <div className="font-sans text-baseGray bg-softWhite min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/universities/:countryName" element={<Universities />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/university/:universityName" element={<UniversityDetails />} />
          <Route path="/all-universities" element={<AllUniversities />} />
          <Route path="/inquiryform" element={< InquiryForm />} />

        
          
          {/* Added route for Course Details */}
          <Route path="/course/:country/:slug" element={<CourseDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;