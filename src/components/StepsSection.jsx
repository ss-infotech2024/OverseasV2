import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import image4step from '../assets/4step.png';
import { Target, BookOpen, DollarSign, Plane } from 'lucide-react'; // Using Lucide icons instead of emojis

gsap.registerPlugin(ScrollTrigger);

// Form schema for popup
const popupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
});

const icons = [Target, BookOpen, DollarSign, Plane]; // Icons for steps

const StepsSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  
  const containerRef = useRef(null);
  const stepsRefs = useRef([]);
  const imageRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(popupSchema),
  });

  const steps = [
    {
      number: 1,
      title: "Education Counseling",
      description: "One on One counseling with our country specialist. Shortlist your ideal destination, institution and program.",
      buttonText: "Free Consultation",
      color: "from-purple-50 to-white border-purple-200",
    },
    {
      number: 2,
      title: "University Applications",
      description: "Apply to your dream university. Our team will guide you through the application process.",
      buttonText: "Free Consultation",
      color: "from-blue-50 to-white border-blue-200",
    },
    {
      number: 3,
      title: "Loans & Scholarships",
      description: "Explore financial options with our loan and scholarship expertise, making your dream education affordable.",
      buttonText: "Free Consultation",
      color: "from-green-50 to-white border-green-200",
    },
    {
      number: 4,
      title: "Visa Processing",
      description: "Apply for your visa with the help of our Visa experts. Our team has a 99% visa success rate.",
      buttonText: "Free Consultation",
      color: "from-orange-50 to-white border-orange-200",
    }
  ];

  // GSAP Animations: Clean and subtle
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade and slide up for each step
      stepsRefs.current.forEach((step, index) => {
        if (step) {
          gsap.fromTo(step, 
            { 
              opacity: 0, 
              y: 50 
            }, 
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              ease: "power2.out", 
              delay: index * 0.1,
              scrollTrigger: {
                trigger: step,
                start: "top 90%",
                toggleActions: "play none none reverse",
                onEnter: () => setActiveStep(index + 1),
                onEnterBack: () => setActiveStep(index + 1),
              }
            }
          );

          // Subtle hover scale
          step.addEventListener('mouseenter', () => {
            gsap.to(step, { scale: 1.02, duration: 0.3, ease: "power1.out" });
          });
          step.addEventListener('mouseleave', () => {
            gsap.to(step, { scale: 1, duration: 0.3, ease: "power1.out" });
          });
        }
      });

      // Gentle parallax for image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Progress bar update
      gsap.to('.progress-bar', {
        width: `${(activeStep / steps.length) * 100}%`,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [activeStep]);

  const openPopup = (stepTitle) => {
    setPopupContent(`Get free consultation for: ${stepTitle}`);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    reset();
  };

  const onPopupSubmit = (data) => {
    console.log('Popup submitted:', data);
    closePopup();
  };

  return (
    <section ref={containerRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">
            4 Steps to Your Dream Destination
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our straightforward process ensures a seamless journey to studying abroad.
          </p>
        </div>

        {/* Steps Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Steps List */}
          <div className="flex-1 space-y-6">
            {steps.map((step, index) => {
              const Icon = icons[index];
              return (
                <div
                  key={step.number}
                  ref={(el) => (stepsRefs.current[index] = el)}
                  className={`
                    p-6 rounded-lg border-2 bg-gradient-to-r ${step.color} shadow-sm 
                    transition-all duration-300 cursor-pointer
                    ${activeStep === index + 1 ? 'border-blue-400 shadow-md' : 'border-gray-200'}
                  `}
                  onClick={() => setActiveStep(index + 1)}
                >
                  <div className="flex items-start gap-4">
                    {/* Step Number with Icon */}
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                      ${activeStep === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}
                      transition-colors duration-300 flex-shrink-0
                    `}>
                      {activeStep === index + 1 ? step.number : <Icon className="w-6 h-6" />}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {step.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openPopup(step.title);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors text-sm"
                      >
                        {step.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image with Progress */}
          <div 
            ref={imageRef}
            className="lg:sticky lg:top-24 flex-1 max-w-md"
          >
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <img
                src={image4step}
                alt="Study abroad process"
                className="w-full h-auto rounded-lg"
              />
              
              {/* Step Indicator */}
              <div className="absolute top-6 left-6 bg-white rounded-lg p-3 shadow-md border border-gray-100">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Step</div>
                  <div className="text-3xl font-bold text-blue-500">{activeStep || '-'}</div>
                  <div className="text-sm text-gray-500">of 4</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-6 left-6 right-6 bg-white rounded-full p-1 shadow-md border border-gray-100">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="progress-bar h-full bg-blue-500 transition-all duration-600 ease-out"
                    style={{ width: '0%' }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-center mt-2">
                  {Math.round((activeStep / steps.length) * 100)}% Progress
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closePopup}>
          <div 
            className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Free Consultation</h3>
            <p className="text-gray-600 mb-6 text-center">{popupContent}</p>
            
            <form onSubmit={handleSubmit(onPopupSubmit)} className="space-y-4">
              <input
                {...register('name')}
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              
              <input
                {...register('email')}
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              
              <input
                {...register('phone')}
                type="tel"
                placeholder="Your Phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={closePopup}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default StepsSection;