import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaArrowAltCircleRight } from "react-icons/fa";
import gsap from "gsap";
import Logo from "./../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = () => setIsOpen(!isOpen);

  // Hide/Show navbar on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const scrollThreshold = 50; // Minimum scroll distance to trigger hide/show

    const handleScroll = () => {
      if (!ticking && !isOpen) {
        // Disable scroll animation when mobile menu is open
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Only animate if scroll difference exceeds threshold
          if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
            if (currentScrollY > lastScrollY) {
              gsap.to(navbarRef.current, {
                y: "-100%",
                duration: 0.4,
                ease: "power2.out",
              });
            } else {
              gsap.to(navbarRef.current, {
                y: "0%",
                duration: 0.4,
                ease: "power2.out",
              });
            }
            lastScrollY = currentScrollY;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Animate mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isOpen]);

  const getLinkClass = (pathMatch) =>
    `${
      currentPath.startsWith(pathMatch)
        ? "text-purple-900 font-extrabold"
        : "text-gray-800 font-bold"
    } relative group transition-all duration-300 hover:text-purple-900`;

  return (
    <nav
      ref={navbarRef}
      className="bg-white sticky top-0 z-50 shadow-lg transition-all duration-300 supports-[position:sticky]:sticky supports-[position:sticky]:top-0 fixed"
    >
      <div className="w-11/12 mx-auto flex items-center justify-between py-2 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="SS Overseas Logo"
            className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto object-contain transform transition-transform duration-300 hover:scale-110"
          />
        </Link>

        {/* Center Nav Links */}
        <div className="hidden lg:flex flex-1 justify-center items-center space-x-8 xl:space-x-12">
          {[
            { to: "/", label: "Home" },
            { to: "/services", label: "Services" },
            { to: "/courses", label: "Courses" },
            { to: "/all-universities", label: "Universities" },
            { to: "/about", label: "About Us" },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className={getLinkClass(to)}>
              <span className="text-lg font-bold tracking-wide hover:text-purple-900 transition-colors duration-300">
                {label}
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Contact Button */}
        <div className="hidden lg:flex">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-900 to-blue-900 text-white px-6 py-3 rounded-xl ring-1 ring-purple-900 transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-black hover:ring-yellow-400 shadow-md hover:shadow-lg"
          >
            <span className="text-lg font-extrabold">Contact</span>
            <FaArrowAltCircleRight className="text-yellow-400 group-hover:text-black w-5 h-5 transition-colors duration-300" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden ml-4">
          <button
            onClick={toggleMenu}
            className="text-purple-900 focus:outline-none"
          >
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-white px-6 py-6 flex flex-col items-start space-y-5 border-t border-gray-200 shadow-lg text-base sm:text-lg z-[60]"
        >
          <Link
            onClick={toggleMenu}
            to="/"
            className="text-gray-800 font-bold hover:text-purple-900 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            onClick={toggleMenu}
            to="/services"
            className={getLinkClass("/services")}
          >
            Services
          </Link>
          <Link
            onClick={toggleMenu}
            to="/courses"
            className={getLinkClass("/courses")}
          >
            Courses
          </Link>
          <Link
            onClick={toggleMenu}
            to="/all-universities"
            className={getLinkClass("/all-universities")}
          >
            Universities
          </Link>
          <Link
            onClick={toggleMenu}
            to="/about"
            className={getLinkClass("/about")}
          >
            About Us
          </Link>
          <Link
            onClick={toggleMenu}
            to="/contact"
            className="w-full text-center bg-gradient-to-r from-purple-900 to-blue-900 text-white font-extrabold py-3 px-6 rounded-xl ring-1 ring-purple-900 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-black hover:ring-yellow-400 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;