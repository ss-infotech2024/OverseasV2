import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from "react-router-dom";

const DestinationComponent = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      containScroll: 'trimSnaps'
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const destinations = [
    {
      name: 'University of Oxford',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFwY0wjD9u9zIDi3q46ft4XsMOJofeRcj2UA&s',
      link: 'https://www.ox.ac.uk/',
      flag: 'https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg?semt=ais_hybrid&w=740&q=80',
      country: 'United Kingdom',
      ranking: '#2 World University Rankings',
      established: '1096',
      students: '24,000+',
      international: '43%',
      popularPrograms: ['PPE', 'Medicine', 'Law', 'Computer Science'],
      tuition: '£32,000 - £45,000',
      description: 'The oldest university in the English-speaking world, renowned for its tutorial-based education system and historic collegiate structure.',
      highlights: [
        '38 Nobel Laureates',
        'Rhodes Scholarships',
        'World-leading research facilities',
        'Tutorial teaching system'
      ]
    },
    {
      name: 'Harvard University',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOcGx2hvPbQLmEbMJahPPv5yik3nd50Zr6g&s',
      link: 'https://www.harvard.edu/',
      flag: 'https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg',
      country: 'United States',
      ranking: '#3 World University Rankings',
      established: '1636',
      students: '22,000+',
      international: '22%',
      popularPrograms: ['Business', 'Law', 'Medicine', 'Computer Science'],
      tuition: '$55,000 - $78,000',
      description: 'America\'s oldest institution of higher learning, known for its exceptional resources, distinguished faculty, and global impact.',
      highlights: [
        '161 Nobel Laureates',
        'Largest academic library in the world',
        'Need-blind admission',
        '$53.2 billion endowment'
      ]
    },
    {
      name: 'University of Toronto',
      image: 'https://d3d0lqu00lnqvz.cloudfront.net/media/media/UofT_cmh2315fl.jpg',
      link: 'https://www.utoronto.ca/',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png',
      country: 'Canada',
      ranking: '#21 World University Rankings',
      established: '1827',
      students: '90,000+',
      international: '25%',
      popularPrograms: ['Computer Science', 'Engineering', 'Medicine', 'Business'],
      tuition: 'CA$45,000 - CA$60,000',
      description: 'Canada\'s leading institution of learning, discovery, and knowledge creation, located in one of the world\'s most diverse cities.',
      highlights: [
        '10 Nobel Laureates',
        'Lester B. Pearson Scholarship',
        'Research-intensive university',
        'Strong industry connections'
      ]
    },
    {
      name: 'University of Melbourne',
      image: 'https://gatewayeduconnect.com/images/university/banner/University-of-Melbourne.webp',
      link: 'https://www.unimelb.edu.au/',
      flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcKQhU14vTkBcz0M0CeUrG_H5a9A8bZxltJg&s',
      country: 'Australia',
      ranking: '#33 World University Rankings',
      established: '1853',
      students: '52,000+',
      international: '42%',
      popularPrograms: ['Business', 'Medicine', 'Law', 'Engineering'],
      tuition: 'A$40,000 - A$55,000',
      description: 'Australia\'s second oldest university, consistently ranked among the leading institutions globally for teaching and research.',
      highlights: [
        '7 Nobel Laureates',
        'Melbourne Model curriculum',
        'Strong industry partnerships',
        'Excellent graduate outcomes'
      ]
    },
    {
      name: 'National University of Singapore',
      image: 'https://www.highereducationdigest.com/wp-content/uploads/2025/02/0-768x461.jpg',
      link: 'https://www.nus.edu.sg/',
      flag: 'https://img.freepik.com/free-vector/illustration-singapore-flag_53876-27129.jpg',
      country: 'Singapore',
      ranking: '#8 World University Rankings',
      established: '1905',
      students: '42,000+',
      international: '30%',
      popularPrograms: ['Engineering', 'Business', 'Computer Science', 'Law'],
      tuition: 'S$35,000 - S$50,000',
      description: 'Asia\'s leading global university, distinguished by its transformative education and high-impact research across multiple disciplines.',
      highlights: [
        'Top in Asia rankings',
        'Global exchange programs',
        'Strong industry linkages',
        'Innovation and entrepreneurship focus'
      ]
    },
    {
      name: 'University of Auckland',
      image: 'https://techportal.in/wp-content/uploads/2023/11/aculand.jpg',
      link: 'https://www.auckland.ac.nz/',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg',
      country: 'New Zealand',
      ranking: '#68 World University Rankings',
      established: '1883',
      students: '40,000+',
      international: '28%',
      popularPrograms: ['Medicine', 'Engineering', 'Business', 'Architecture'],
      tuition: 'NZ$35,000 - NZ$45,000',
      description: 'New Zealand\'s largest and highest-ranked university, located in the heart of Auckland with strong international connections.',
      highlights: [
        '#1 in New Zealand',
        'Beautiful campus location',
        'Strong research output',
        'Excellent student support'
      ]
    },
    {
      name: 'ETH Zurich',
      image: 'https://ethz.ch/en/campus/access/zentrum/_jcr_content/par/fullwidthimage/image.imageformat.1286.152068286.jpg',
      link: 'https://ethz.ch/',
      flag: 'https://media.istockphoto.com/id/1409845543/vector/switzerland-flag-design-waving-swiss-flag-made-of-satin-or-silk-fabric-vector-illustration.jpg?s=612x612&w=0&k=20&c=ienwQznGZSMbv3s-pIDW5Q8d-2bn3a15kQUXJeDGGJ8=',
      country: 'Switzerland',
      ranking: '#11 World University Rankings',
      established: '1855',
      students: '22,000+',
      international: '41%',
      popularPrograms: ['Engineering', 'Computer Science', 'Physics', 'Mathematics'],
      tuition: 'CHF 1,300 - CHF 1,600 per semester',
      description: 'Europe\'s premier university for science and technology, known for cutting-edge research and innovation, with 21 Nobel Laureates.',
      highlights: [
        '21 Nobel Laureates',
        'Albert Einstein studied here',
        'Low tuition fees',
        'Strong industry collaboration'
      ]
    },
    {
      name: 'Trinity College Dublin',
      image: 'https://www.visittrinity.ie/wp-content/uploads/2023/02/Trinity-Stay.jpg?w=720',
      link: 'https://www.tcd.ie/',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/1280px-Flag_of_Ireland.svg.png',
      country: 'Ireland',
      ranking: '#81 World University Rankings',
      established: '1592',
      students: '18,000+',
      international: '27%',
      popularPrograms: ['Computer Science', 'Business', 'Law', 'Medicine'],
      tuition: '€20,000 - €35,000',
      description: 'Ireland\'s oldest and most prestigious university, located in the heart of Dublin with a rich history and modern research facilities.',
      highlights: [
        'Historic campus',
        'Strong tech industry links',
        'Beautiful library collection',
        'Vibrant student life'
      ]
    }
  ];

  // Split destinations into slides for carousel (4 per slide)
  const slides = [];
  for (let i = 0; i < destinations.length; i += 4) {
    slides.push(destinations.slice(i, i + 4));
  }

  const openModal = (destination) => setSelectedDestination(destination);
  const closeModal = () => setSelectedDestination(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div
      className="text-white p-3 xs:p-4 sm:p-6 lg:p-8 min-h-screen"
      style={{ backgroundColor: '#601D95' }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 lg:mb-12 px-2"
        >
          <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Your <span className="text-yellow-300">Dream Study</span>{' '}
            <span className="text-red-300">Destination</span> Awaits
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed px-2">
            Discover world-class universities, generous scholarships, affordable living costs,
            and excellent post-study work opportunities with expert guidance.
          </p>

          {/* Updated Button: Now goes to /all-universities */}
          <Link to="/all-universities">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 sm:mt-6 inline-block px-4 xs:px-6 sm:px-8 py-2 xs:py-3 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl text-sm xs:text-base sm:text-lg"
            >
              Explore All Destinations
            </motion.button>
          </Link>
        </motion.div>

        {/* Carousel Section */}
        <div className="relative mb-4 sm:mb-6">
          <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm p-2 sm:p-4" ref={emblaRef}>
            <div className="flex">
              {slides.map((slideDests, slideIndex) => (
                <div key={slideIndex} className="flex-none w-full min-w-0 px-1 sm:px-2">
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {slideDests.map((dest, index) => (
                      <motion.div
                        key={dest.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative cursor-pointer group"
                        onClick={() => openModal(dest)}
                      >
                        <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl h-full flex flex-col">
                          {/* Flag Badge */}
                          <div className="absolute top-2 left-2 z-10">
                            <img
                              src={dest.flag}
                              alt={`${dest.country} flag`}
                              className="w-6 h-4 xs:w-7 xs:h-5 sm:w-8 sm:h-6 rounded shadow-md object-cover"
                            />
                          </div>

                          {/* University Image */}
                          <div className="relative h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden">
                            <img
                              src={dest.image}
                              alt={dest.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                            {/* University Name Overlay */}
                            <div className="absolute bottom-2 left-2 right-2">
                              <h3 className="text-white font-bold text-sm xs:text-base sm:text-lg leading-tight line-clamp-2">
                                {dest.name}
                              </h3>
                              <p className="text-purple-200 text-xs xs:text-sm mt-0.5">{dest.country}</p>
                            </div>
                          </div>

                          {/* Quick Info */}
                          <div className="p-2 xs:p-3 sm:p-4 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-1 xs:mb-2">
                              <span className="text-xs bg-purple-100 text-purple-700 px-1.5 xs:px-2 py-0.5 xs:py-1 rounded text-xs font-semibold">
                                {dest.ranking.split(' ')[0]}
                              </span>
                              <span className="text-xs text-gray-600">
                                Est. {dest.established}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-600 mb-2 xs:mb-3">
                              <span className="flex items-center">
                                <span className="hidden xs:inline">Students</span>
                                <span className="xs:ml-1">{dest.students.split('+')[0]}</span>
                              </span>
                              <span className="flex items-center">
                                <span className="hidden xs:inline">International</span>
                                <span className="xs:ml-1">{dest.international}</span>
                              </span>
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                              <span className="text-xs xs:text-sm font-semibold text-purple-700">
                                View Details
                              </span>
                              <motion.div
                                whileHover={{ x: 3 }}
                                className="text-purple-600 text-sm xs:text-base"
                              >
                                →
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute left-1 xs:left-2 top-1/2 -translate-y-1/2 w-8 h-8 xs:w-10 xs:h-10 bg-white/90 hover:bg-white text-purple-700 rounded-full shadow-lg flex items-center justify-center transition-all z-10 text-sm xs:text-base"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="absolute right-1 xs:right-2 top-1/2 -translate-y-1/2 w-8 h-8 xs:w-10 xs:h-10 bg-white/90 hover:bg-white text-purple-700 rounded-full shadow-lg flex items-center justify-center transition-all z-10 text-sm xs:text-base"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 sm:mt-6 space-x-1.5 xs:space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`transition-all rounded-full ${emblaApi?.selectedScrollSnap() === index
                ? 'bg-yellow-400'
                : 'bg-white/50'
                }`}
              style={{
                width: emblaApi?.selectedScrollSnap() === index ? '20px' : '8px',
                height: '8px'
              }}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedDestination && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 xs:p-3 sm:p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="bg-white rounded-xl sm:rounded-2xl w-full max-w-full xs:max-w-sm sm:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative">
                  <img
                    src={selectedDestination.image}
                    alt={selectedDestination.name}
                    className="w-full h-40 xs:h-48 sm:h-56 md:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80" />
                  <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 right-3 xs:right-4">
                    <div className="flex items-center space-x-2 xs:space-x-3 mb-1 xs:mb-2">
                      <img
                        src={selectedDestination.flag}
                        alt={`${selectedDestination.country} flag`}
                        className="w-8 h-6 xs:w-10 xs:h-7 sm:w-12 sm:h-8 rounded shadow-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight truncate">
                          {selectedDestination.name}
                        </h2>
                        <p className="text-purple-200 text-sm xs:text-base">{selectedDestination.country}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 xs:gap-2">
                      <span className="px-2 xs:px-3 py-1 bg-yellow-400 text-purple-900 text-xs xs:text-sm font-semibold rounded-full whitespace-nowrap">
                        {selectedDestination.ranking}
                      </span>
                      <span className="px-2 xs:px-3 py-1 bg-white/20 text-white text-xs xs:text-sm rounded-full whitespace-nowrap">
                        Est. {selectedDestination.established}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="absolute top-2 xs:top-3 right-2 xs:right-3 w-6 h-6 xs:w-8 xs:h-8 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all text-sm xs:text-base"
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-3 xs:p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
                    <div>
                      <h3 className="text-lg xs:text-xl font-bold text-gray-800 mb-2 xs:mb-4">Overview</h3>
                      <p className="text-gray-600 text-sm xs:text-base leading-relaxed mb-4 xs:mb-6">
                        {selectedDestination.description}
                      </p>

                      <div className="space-y-3 xs:space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm xs:text-base mb-1 xs:mb-2">Popular Programs</h4>
                          <div className="flex flex-wrap gap-1 xs:gap-2">
                            {selectedDestination.popularPrograms.map((program, index) => (
                              <span
                                key={index}
                                className="px-2 xs:px-3 py-1 bg-purple-100 text-purple-800 text-xs xs:text-sm rounded-full whitespace-nowrap"
                              >
                                {program}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm xs:text-base mb-1 xs:mb-2">University Highlights</h4>
                          <ul className="space-y-1 xs:space-y-2">
                            {selectedDestination.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start text-gray-600 text-sm xs:text-base">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 xs:mr-3 mt-1.5 xs:mt-2 flex-shrink-0"></span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg xs:text-xl font-bold text-gray-800 mb-2 xs:mb-4">Key Information</h3>
                      <div className="space-y-3 xs:space-y-4">
                        <div className="bg-gray-50 rounded-lg p-3 xs:p-4">
                          <div className="grid grid-cols-2 gap-3 xs:gap-4 text-xs xs:text-sm">
                            <div>
                              <p className="text-gray-500 mb-1">Total Students</p>
                              <p className="font-semibold text-gray-800">{selectedDestination.students}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 mb-1">International</p>
                              <p className="font-semibold text-gray-800">{selectedDestination.international}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 mb-1">Established</p>
                              <p className="font-semibold text-gray-800">{selectedDestination.established}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-3 xs:p-4">
                          <h4 className="font-semibold text-purple-800 text-sm xs:text-base mb-1 xs:mb-2">Why Choose This University?</h4>
                          <ul className="text-xs xs:text-sm text-purple-700 space-y-0.5 xs:space-y-1">
                            <li>• World-class faculty and research</li>
                            <li>• Strong global reputation</li>
                            <li>• Excellent career opportunities</li>
                            <li>• Vibrant student community</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 mt-4 xs:mt-6 pt-4 xs:pt-6 border-t border-gray-200">
                    <a
                      href={selectedDestination.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center py-2 xs:py-3 px-4 rounded-lg font-semibold transition-all text-sm xs:text-base"
                    >
                      Visit Official Website
                    </a>
                    <Link to="/contact" className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 xs:py-3 px-4 rounded-lg font-semibold transition-all text-sm xs:text-base text-center">
                      Contact Advisor
                    </Link>
                    <button
                      onClick={closeModal}
                      className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-600 py-2 xs:py-3 px-4 rounded-lg font-semibold transition-all text-sm xs:text-base"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DestinationComponent;