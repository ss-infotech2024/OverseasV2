import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';
import sneha from "../assets/test/sneha_singh.png";

// Testimonial data based on provided HTML content and image
const testimonials = [
  {
    id: 1,
    quote: "The mentorship and guidance from SS Overseas helped me grow faster than I expected. The career support was exceptional.",
    author: "Ajay Singh",
    role: "ML Engineer at AI Innovations",
    course: "Completed: Machine Learning",
    achievements: ["Advanced ML concepts", "Model deployment", "Research opportunities"],
    rating: 5,
    avatar: sneha,
  },
  {
    id: 2,
    quote: "I was overwhelmed by the complexities of the visa application process, but SS Overseas turned it into a breeze. Their expert consultants guided me through every step.",
    author: "Sneha Singh",
    role: "Student at Vergata University",
    course: "Completed: Visa Application Support",
    achievements: ["Document preparation", "Application submission", "Pre-departure guidance"],
    rating: 5,
    avatar: "/assets/img/bg/jasbir_singh.jpeg",
  },
  {
    id: 3,
    quote: "The consultancy assists with the preparation and submission of university applications, ensuring all required documents are in order.",
    author: "Jasber Singh",
    role: "Student at University of Cassino",
    course: "Completed: University Application",
    achievements: ["Personalized counseling", "Deadline management", "University selection"],
    rating: 5,
    avatar: "/assets/img/bg/abhishek.jpeg",
  },
  {
    id: 4,
    quote: "SS Overseas offers personalized counseling to help students choose universities that match their academic interests and career goals.",
    author: "Abhishek Raghorte",
    role: "Student at Sapienza University",
    course: "Completed: Career Counseling",
    achievements: ["University insights", "Financial planning", "Goal alignment"],
    rating: 5,
    avatar: "/assets/img/bg/ujwal_pal.jpeg",
  },
];

export default function Testimonials() {
  // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from our alumni who transformed their careers with Skill2Success
          </p>
        </div>
        <div className="relative">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-2">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden mx-auto max-w-4xl">
                  <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    {/* Left Section - Quote and Rating */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600">
                          <svg width="24" height="24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                          </svg>
                        </span>
                        <div className="flex space-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-800 text-lg italic">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    {/* Right Section - Author and Details */}
                    <div className="flex-1 flex flex-col items-center md:items-end">
                      <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-4">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-center md:text-right">
                        <h6 className="font-bold text-gray-900 text-xl">{testimonial.author}</h6>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        <p className="text-gray-600 text-sm">{testimonial.course}</p>
                        <div className="flex flex-wrap justify-center md:justify-end gap-2 mt-2">
                          {testimonial.achievements.map((ach, idx) => (
                            <span key={idx} className="text-blue-600 text-sm hover:underline">
                              {ach}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-500 text-sm mt-2">Alumni Success Story</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
          <div className="flex justify-center mt-4 space-x-2">
            <Button variant="outline" size="sm" className="rounded-full w-8 h-8">
              <span className="sr-only">Previous</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full w-8 h-8">
              <span className="sr-only">Next</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
          <div className="text-center mt-2">
            <span className="text-yellow-500 text-sm">Paused</span>
          </div>
        </div>
      </div>
    </section>
  );
}