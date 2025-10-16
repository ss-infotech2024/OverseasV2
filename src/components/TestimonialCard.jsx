import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const cardRefs = useRef([]);

  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      location: "Mumbai, India",
      quote:
        "Loft was a breath of fresh air. The apartment was neat, well-furnished, and in a secure area. I stayed for a work trip in Leiki and didn't want to leave. Great value for money!",
      avatar: "T",
    },
    {
      id: 2,
      name: "Ayush Kumar Sihani",
      location: "Delhi, India",
      quote:
        "From check-in to check-out, everything was smooth. The place was so cozy and had this modern vibe. I even hosted a small hangout with friends. Will definitely book again.",
      avatar: "C",
    },
    {
      id: 3,
      name: "Shreya Sharma",
      location: "Bangalore, India",
      quote:
        "I needed a quiet place to relax and Loft delivered. The location was central, the Wi-Fi was strong, and the host was super responsive. 10/10 experience.",
      avatar: "I",
    },
  ];

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isReducedMotion) {
      // Animate heading and subheading on load
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      // Animate testimonial cards on scroll
      cardRefs.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.2, // Stagger animation
          }
        );
      });

      // Parallax background effect
      gsap.to(sectionRef.current, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Cleanup ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle card click animation
  const handleCardClick = (card) => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(card, {
        scale: 0.98,
        duration: 0.2,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
      });
    }
  };

  // Handle avatar hover animation
  const handleAvatarHover = (avatar) => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(avatar, {
        rotate: 360,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleAvatarLeave = (avatar) => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(avatar, {
        rotate: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="shadow-inner shadow-purple-900 bg-gradient-to-b from-purple-100 to-purple-300 mx-6 rounded-t-xl text-purple-900 py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-plein text-center leading-tight mb-6 text-purple-900 drop-shadow-md"
        >
          Transforming Visa Dreams into Reality
        </h1>

        {/* Subheading */}
        <p
          ref={subheadingRef}
          className="text-sm sm:text-base md:text-lg text-gray-700 text-center leading-relaxed mb-12 w-full sm:w-4/5 md:w-2/3 mx-auto"
        >
          SS Overseas provides full support in documentation, university
          selection, and visa filing.
        </p>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-white text-gray-800 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-2 hover:border-purple-900 cursor-pointer"
              onClick={() => handleCardClick(cardRefs.current[index])}
              role="article"
              aria-labelledby={`testimonial-${testimonial.id}`}
            >
              <div className="p-5 sm:p-6 md:p-7 lg:p-8">
                <div className="flex items-center mb-6">
                  <div
                    className="bg-[#9B59B6]/20 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mr-4 transition-transform duration-300"
                    onMouseEnter={() =>
                      handleAvatarHover(
                        cardRefs.current[index].querySelector(".avatar")
                      )
                    }
                    onMouseLeave={() =>
                      handleAvatarLeave(
                        cardRefs.current[index].querySelector(".avatar")
                      )
                    }
                  >
                    <span className="avatar text-xl sm:text-2xl font-bold text-[#6A2C8B]">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <h3
                      id={`testimonial-${testimonial.id}`}
                      className="text-lg sm:text-xl font-bold text-[#6A2C8B]"
                    >
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute top-0 left-0 text-5xl sm:text-6xl text-[#9B59B6]/10 font-serif italic">
                    “
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 pl-6 pt-4 italic">
                    {testimonial.quote}
                  </p>
                </div>
                <button
                  className="mt-4 text-purple-900 hover:text-purple-700 underline text-sm sm:text-base transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()} // Prevent card click animation
                  aria-label={`Read more about ${testimonial.name}'s testimonial`}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
