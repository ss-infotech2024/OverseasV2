import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "../components/HerosSection";
import CoreValuesSection from "../components/CoreValues";
import OfferedCountriesSection from "../components/offeredCountries";
import TestimonialSection from "../components/TestimonialCard";
import Programs from "../components/Programs";
import OurServices from "../components/ServiceCard";
import "../App.css";
import AbroadStudyFeatures from "../components/AbroadStudy";
import StepsSection from "../components/StepsSection";
import DestinationComponent from "../components/DestinationComponent";
import BannerComponent from "../components/BannerComponent";
import TrendingCourses from "../components/TrendingCourses"
import Earth from "../components/Earth";
import VideoAD from "../components/VideoAD"
import VideoAD1 from "../components/VideoAD1"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isReducedMotion) {
      // Animate HeroSection on load
      gsap.fromTo(
        ".hero-section",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Scroll-triggered animations for other sections
      gsap.utils.toArray(".section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Staggered animation for child elements (e.g., cards, buttons)
        const children = section.querySelectorAll(".card, button, a");
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Parallax effect for HeroSection background (if it has a background image)
      gsap.to(".hero-section", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Cleanup ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle click animation for buttons/links
  const handleClickAnimation = (e) => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isReducedMotion) {
      gsap.to(e.target, {
        scale: 0.95,
        duration: 0.2,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
      });
    }
  };

  return (
    <main ref={mainRef} className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="section hero-section">
        <HeroSection />
      </section>

      {/* Offered Countries Section */}
      <section className="section">
        <OfferedCountriesSection />
      </section>

      

       <section className="section">
        <DestinationComponent />
      </section>


        <section className="">
        < TrendingCourses />
      </section>
     

      <section className="">
        <BannerComponent />
      </section>


    


      <section className="section">
        <StepsSection />
      </section>


      

        <section className="section">
        <VideoAD1 />
      </section> 

      {/* Our Services Section */}
      <section className="section">
        <OurServices />
      </section>



       {/* Testimonials Section */}
      <section className="section">
        <TestimonialSection />
      </section>

        {/* <section className="section">
        <VideoAD />
      </section> */}

      
     
    </main>
  );
};

export default Home;
