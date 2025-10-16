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
        ? "text-purple-900 font-semibold"
        : "text-gray-800"
    } relative group`;

  return (
    <nav
      ref={navbarRef}
      className="bg-white sticky top-0 z-50 shadow-md transition-all duration-300 supports-[position:sticky]:sticky supports-[position:sticky]:top-0 fixed"
    >
      <div className="w-11/12 mx-auto flex items-center justify-between py-3 sm:px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="SS Overseas Logo"
            className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain transform transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Center Nav Links */}
        <div className="hidden lg:flex flex-1 justify-center items-center space-x-6 xl:space-x-10">
          {[
            { to: "/", label: "Home" },
            { to: "/services", label: "Services" },
            { to: "/courses", label: "Courses" },
            { to: "/all-universities", label: "Universities" },
            { to: "/about", label: "About Us" },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className={getLinkClass(to)}>
              <span className="hover:text-purple-900 transition">{label}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Contact Button */}
        <div className="hidden lg:flex">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-purple-900 text-white px-5 py-2 rounded-lg ring-1 ring-purple-900 transition duration-300 hover:bg-white hover:text-purple-900"
          >
            Contact
            <FaArrowAltCircleRight className="text-yellow-400 group-hover:text-purple-900 transition-colors duration-300" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden ml-4">
          <button
            onClick={toggleMenu}
            className="text-purple-900 focus:outline-none"
          >
            {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-white px-6 py-4 flex flex-col items-start space-y-4 border-t border-gray-200 shadow-md text-base sm:text-lg z-[60]"
        >
          <Link
            onClick={toggleMenu}
            to="/"
            className="text-gray-800 hover:text-purple-900"
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
            to="/universities"
            className={getLinkClass("/universities")}
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
            className="w-full text-center bg-purple-900 text-white py-2 px-4 rounded-lg ring-1 ring-purple-900 hover:bg-white hover:text-purple-900 transition"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
