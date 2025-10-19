import React, { useEffect, useRef, useState } from "react";
import { Star, BookOpen, Users, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AbroadStudyFeatures from "./AbroadStudy";
import { FaArrowRight, FaPaperPlane } from "react-icons/fa";
import image1 from "../assets/image1.jpg"; // Replace with your images
import video1 from "../assets/video1.mp4"; // Replace with your videos
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Form schema with Zod for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const HeroSection = () => {
  const sectionRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRefs = useRef([]);
  const formRef = useRef(null);
  const [submitStatus, setSubmitStatus] = useState(null); // For feedback: success/error

  // Slider state
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Media assets for slider (mix images and videos)
  const sliderMedia = [
    { type: "image", src: image1, alt: "Slide 1" },
    { type: "video", src: video1, alt: "Slide video 1" },
    { type: "video", src: video2, alt: "Slide video 2" },
    { type: "video", src: video3, alt: "Slide video 3" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isReducedMotion) {
      // Animate left section (text)
      gsap.fromTo(
        leftSectionRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // Animate right section (form) - only if exists
      if (rightSectionRef.current) {
        gsap.fromTo(
          rightSectionRef.current,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.4 }
        );
      }

      // Animate form fields on load with stagger
      gsap.fromTo(
        ".form-field",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.6,
        }
      );

      // Animate floating stats with stagger
      statsRefs.current.forEach((stat, index) => {
        gsap.fromTo(
          stat,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate AbroadStudyFeatures on scroll
      gsap.fromTo(
        ".features-section",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".features-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax for slider container
      gsap.to(sliderRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        },
      });
    }

    // Auto-swipe slider every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderMedia.length);
    }, 5000);

    // Cleanup ScrollTriggers and interval
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      clearInterval(interval);
    };
  }, []);

  // Handle manual swipe (optional dots or arrows can be added)
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Handle button click animation
  const handleButtonClick = () => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.2,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
      });
    }
  };

  // Handle stat hover animation
  const handleStatHover = (stat) => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(stat, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleStatLeave = (stat) => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(stat, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Handle form submission (simulate API call)
  const onSubmit = (data) => {
    setSubmitStatus("loading");
    setTimeout(() => {
      console.log("Form submitted:", data);
      setSubmitStatus("success");
      reset();
      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1000);
  };

  // Handle input focus animation
  const handleInputFocus = (e) => {
    gsap.to(e.target, { scale: 1.02, duration: 0.2, ease: "power1.out" });
  };

  const handleInputBlur = (e) => {
    gsap.to(e.target, { scale: 1, duration: 0.2, ease: "power1.out" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden h-96 sm:min-h-screen px-3 xs:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-12 sm:pt-0"
    >
      {/* Background Slider (auto-swiping, mix of images and videos) */}
      <div
        ref={sliderRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {/* Dark overlay for better text visibility on slider */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sliderMedia.map((media, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              {media.type === "image" ? (
                <img
                  src={media.src}
                  alt={media.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={media.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {/* Slider Dots for manual control */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {sliderMedia.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index ? "bg-white w-8" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center sm:justify-start">
        {/* Adjusted padding on sm+ to shift left content right (not fully left-aligned) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-center w-full h-full px-4 sm:px-0 sm:pl-20 lg:pl-32">
          {/* Left Section - Content (Text + Button) */}
          {/* On desktop (sm+): Shifted right via parent pl-20/lg:pl-32 to avoid sticking to extreme left edge */}
          {/* On mobile (xs): Additional right shift of 60px as requested previously */}
          <div
            ref={leftSectionRef}
            className="text-white flex flex-col items-center sm:items-start text-center sm:text-left sm:pr-8 lg:pr-16 translate-x-0 sm:translate-x-0 xs:translate-x-[60px]"
          >
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
              We Help to <span className="text-purple-400">Build</span> 
              <br /> Your Dream
            </h1>
            <p className="text-xs xs:text-sm sm:text-base mb-4 leading-relaxed drop-shadow-md max-w-md mx-auto sm:mx-0">
              Our team of experts is dedicated to guiding you through every step
              of the process, ensuring a smooth and successful journey towards
              your academic goals.
            </p>

            <div className="flex flex-col gap-3 w-full max-w-xs mx-auto sm:mx-0 mb-4">
              <Link to="/contact">
                <Button
                  ref={buttonRef}
                  size="lg"
                  onClick={handleButtonClick}
                  className="group w-full bg-white text-purple-600 border-2 border-purple-600 font-semibold text-sm xs:text-base px-4 xs:px-6 py-3 xs:py-4 rounded-xl transition-all duration-300 hover:bg-purple-600 hover:text-white hover:shadow-lg flex items-center justify-center"
                  aria-label="Book an appointment"
                >
                  Book Appointment
                  <FaArrowRight className="ml-2 xs:ml-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Section - Form (Hidden on xs and below, shown on sm+ */}
          {/* On desktop: Bottom-aligned and shifted right as before */}
          <div
            ref={rightSectionRef}
            className="hidden sm:flex justify-center items-center sm:items-end sm:pb-10 lg:pb-16 sm:translate-x-4 lg:translate-x-8"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-4 xs:p-6 shadow-xl w-full max-w-xs xs:max-w-sm sm:max-w-md border border-purple-200"
            >
              <h2 className="text-lg xs:text-xl font-bold mb-3 text-purple-900">Start Your Career with SS Overseas</h2>
              <p className="text-xs xs:text-sm text-gray-600 mb-4">Fill in your details and we'll contact you!</p>

              <div className="space-y-4">
                <div className="form-field">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Your Name"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900 transition-all text-sm"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="form-field">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Your Email"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900 transition-all text-sm"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="form-field">
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Your Phone"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900 transition-all text-sm"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div className="form-field">
                  <textarea
                    {...register("message")}
                    rows="4"
                    placeholder="Your Message"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900 transition-all text-sm"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
              </div>

              <Button
                type="submit"
                className="mt-4 xs:mt-6 w-full bg-purple-900 text-white hover:bg-purple-800 py-2 xs:py-3 rounded-lg font-semibold flex items-center justify-center group text-sm xs:text-base"
                disabled={submitStatus === "loading"}
              >
                {submitStatus === "loading" ? "Submitting..." : "Submit"}
                <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {submitStatus === "success" && (
                <p className="text-green-600 text-center mt-3 xs:mt-4 animate-pulse text-xs xs:text-sm">Thank you! We'll get back to you soon.</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 text-center mt-3 xs:mt-4 text-xs xs:text-sm">Something went wrong. Try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;