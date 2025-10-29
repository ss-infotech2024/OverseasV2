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

// Fixed image path
import image1 from "../assets/image.png";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Zod schema: name & email required, phone & message optional
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

const HeroSection = () => {
  const sectionRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRefs = useRef([]);
  const formRef = useRef(null);
  const [submitStatus, setSubmitStatus] = useState("idle");

  // Slider
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

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

  // WhatsApp redirect with formatted message
  const openWhatsApp = (data) => {
    const lines = [];
    lines.push("*New Enquiry - SS Overseas*");
    lines.push("━━━━━━━━━━━━━━━━");
    lines.push(`*Name:* ${data.name}`);
    lines.push(`*Email:* ${data.email}`);
    if (data.phone && data.phone.trim()) lines.push(`*Phone:* ${data.phone}`);
    if (data.message && data.message.trim()) lines.push(`*Message:* ${data.message}`);
    lines.push("━━━━━━━━━━━━━━━━");

    const text = lines.join("\n").trim();
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/918999972278?text=${encoded}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Form submit handler
  const onSubmit = (data) => {
    setSubmitStatus("loading");
    setTimeout(() => {
      openWhatsApp(data);
      setSubmitStatus("success");
      reset();

      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });

      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 800);
  };

  // GSAP Animations
  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    gsap.fromTo(
      leftSectionRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    if (rightSectionRef.current) {
      gsap.fromTo(
        rightSectionRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.4 }
      );
    }

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

    statsRefs.current.forEach((stat, index) => {
      if (stat) {
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
      }
    });

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

    gsap.to(sliderRef.current, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
      },
    });

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderMedia.length);
    }, 5000);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      clearInterval(interval);
    };
  }, []);

  const goToSlide = (index) => setCurrentIndex(index);

  const handleButtonClick = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.2,
      ease: "power1.out",
      yoyo: true,
      repeat: 1,
    });
  };

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
      {/* Background Slider */}
      <div ref={sliderRef} className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sliderMedia.map((media, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              {media.type === "image" ? (
                <img src={media.src} alt={media.alt} className="w-full h-full object-cover" />
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

        {/* Slider Dots */}
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

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center sm:justify-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-center w-full h-full px-4 sm:px-0 sm:pl-20 lg:pl-32">
          {/* Left: Text + Button */}
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

          {/* Right: Form (hidden on mobile) */}
          <div
            ref={rightSectionRef}
            className="hidden sm:flex justify-center items-center sm:items-end sm:pb-10 lg:pb-16 sm:translate-x-4 lg:translate-x-8"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-4 xs:p-6 shadow-xl w-full max-w-xs xs:max-w-sm sm:max-w-md border border-purple-200"
            >
              <h2 className="text-lg xs:text-xl font-bold mb-3 text-purple-900">
                Start Your Career with SS Overseas
              </h2>
              <p className="text-xs xs:text-sm text-gray-600 mb-4">
                Fill in your details and we'll contact you!
              </p>

              <div className="space-y-4">
                {/* Name */}
                <div className="form-field">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Your Name *"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900 transition-all text-sm"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="form-field">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Your Email *"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900 transition-all text-sm"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone (Optional) */}
                <div className="form-field">
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Your Phone (optional)"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900 transition-all text-sm"
                  />
                </div>

                {/* Message (Optional) */}
                <div className="form-field">
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Your Message (optional)"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={submitStatus === "loading"}
                className="mt-4 xs:mt-6 w-full bg-purple-900 text-white hover:bg-purple-800 py-2 xs:py-3 rounded-lg font-semibold flex items-center justify-center group text-sm xs:text-base"
              >
                {submitStatus === "loading" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Redirecting...
                  </>
                ) : (
                  <>
                    Submit
                    <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              {/* Success Message */}
              {submitStatus === "success" && (
                <p className="text-green-600 text-center mt-3 xs:mt-4 animate-pulse text-xs xs:text-sm">
                  Opening WhatsApp...
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;