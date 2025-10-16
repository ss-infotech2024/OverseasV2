import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const DestinationComponent = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const destinations = [
    {
      name: 'UK',
      image: 'https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg?semt=ais_hybrid&w=740&q=80',
      link: 'study-abroad-uk.html',
      flag: 'https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg?semt=ais_hybrid&w=740&q=80',
    },
    {
      name: 'USA',
      image: 'https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg',
      link: 'study-abroad-usa.html',
      flag: 'https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg',
    },
    {
      name: 'Canada',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png',
      link: 'study-abroad-canada.html',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png',
    },
    {
      name: 'Australia',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcKQhU14vTkBcz0M0CeUrG_H5a9A8bZxltJg&s',
      link: 'study-abroad-australia.html',
      flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcKQhU14vTkBcz0M0CeUrG_H5a9A8bZxltJg&s',
    },
    {
      name: 'Singapore',
      image: 'https://img.freepik.com/free-vector/illustration-singapore-flag_53876-27129.jpg',
      link: 'study-abroad-singapore.html',
      flag: 'https://img.freepik.com/free-vector/illustration-singapore-flag_53876-27129.jpg',
    },
    {
      name: 'New Zealand',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg',
      link: 'study-abroad-new-zealand.html',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg',
    },
    {
      name: 'Switzerland',
      image: 'https://media.istockphoto.com/id/1409845543/vector/switzerland-flag-design-waving-swiss-flag-made-of-satin-or-silk-fabric-vector-illustration.jpg?s=612x612&w=0&k=20&c=ienwQznGZSMbv3s-pIDW5Q8d-2bn3a15kQUXJeDGGJ8=',
      link: 'https://media.istockphoto.com/id/1409845543/vector/switzerland-flag-design-waving-swiss-flag-made-of-satin-or-silk-fabric-vector-illustration.jpg?s=612x612&w=0&k=20&c=ienwQznGZSMbv3s-pIDW5Q8d-2bn3a15kQUXJeDGGJ8=',
    },
    {
      name: 'Ireland',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/1280px-Flag_of_Ireland.svg.png',
      link: 'study-abroad-ireland.html',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/1280px-Flag_of_Ireland.svg.png',
    },
  ];

  const openModal = (destination) => setSelectedDestination(destination);
  const closeModal = () => setSelectedDestination(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  // Split destinations into slides: each slide has 4 destinations in a 2x2 grid
  const slides = [];
  for (let i = 0; i < destinations.length; i += 4) {
    slides.push(destinations.slice(i, i + 4));
  }

  return (
    <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg">
      <div className="container mx-auto">
        {/* Center text block - above the carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-3xl font-bold">
            Your <strong className="text-yellow-300">Dream Study</strong>{' '}
            <span className="text-red-300">Destination</span> Awaits
          </h3>
          <p className="mt-4 text-gray-300">
            Learn all about the country's top universities, scholarships,
            cost of living, post-study work rights and more from the finest
            foreign education consultants!
          </p>
          <a
            href="/study-abroad"
            className="mt-4 inline-block px-6 py-2 bg-white text-blue-900 rounded-full hover:bg-gray-200 transition-colors"
          >
            View more
          </a>
        </motion.div>

        {/* ---------- Carousel Slider ---------- */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slideDests, slideIndex) => (
              <motion.div
                key={slideIndex}
                className="flex-none w-full grid grid-cols-2 md:grid-cols-4 gap-4 px-2" // 2 cols mobile, 4 cols desktop for 2x2 per slide
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
              >
                {slideDests.map((dest) => (
                  <motion.div
                    key={dest.name}
                    whileHover={{ scale: 1.05 }}
                    className="relative cursor-pointer"
                    onClick={() => openModal(dest)}
                  >
                    <img
                      src={dest.image}
                      alt={`Flag of ${dest.name}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center rounded-lg transition-opacity duration-300">
                      <div className="flex items-center space-x-2 opacity-0 hover:opacity-100 transition-opacity">
                        <img
                          src={dest.flag}
                          alt={`${dest.name} flag`}
                          className="w-8 h-8 object-contain"
                        />
                        <span className="text-white text-lg font-bold">{dest.name}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {/* Pad empty cells if slide has less than 4 */}
                {slideDests.length < 3 &&
                  Array.from({ length: 4 - slideDests.length }).map((_, padIndex) => (
                    <div key={`pad-${padIndex}`} className="w-full h-40" />
                  ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation buttons (optional) */}
        <div className="flex justify-center mt-4 space-x-4">
          <button
            className="px-4 py-2 bg-white text-blue-900 rounded hover:bg-gray-200"
            onClick={() => emblaApi && emblaApi.scrollPrev()}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 bg-white text-blue-900 rounded hover:bg-gray-200"
            onClick={() => emblaApi && emblaApi.scrollNext()}
          >
            Next
          </button>
        </div>

        {/* ---------- Modal ---------- */}
        <AnimatePresence>
          {selectedDestination && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white text-black p-6 rounded-lg max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedDestination.flag}
                    alt={`${selectedDestination.name} flag`}
                    className="w-10 h-10 object-contain"
                  />
                  <h4 className="text-2xl font-bold">{selectedDestination.name}</h4>
                </div>

                <img
                  src={selectedDestination.image}
                  alt={`Flag of ${selectedDestination.name}`}
                  className="w-full h-40 object-cover rounded-lg mt-4"
                />
                <p className="mt-4">
                  Explore top universities, scholarships, cost of living, post-study work rights and more!
                </p>
                <div className="mt-4 flex justify-between">
                  <a
                    href={selectedDestination.link}
                    className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
                  >
                    Learn More
                  </a>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Close
                  </button>
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