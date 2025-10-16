'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface University {
  id: number;
  name: string;
  image: string;
  alt: string;
}

const universities: University[] = [
  { id: 1, name: 'The University of Edinburgh', image: 'img/partner/University-of-Edinburgh.webp', alt: 'The University of Edinburgh' },
  { id: 2, name: 'John Hopkins University', image: 'img/partner/John-Hopkins-University.webp', alt: 'John Hopkins University' },
  { id: 3, name: 'The University of Melbourne', image: 'img/partner/The-University-of-Melbourne.webp', alt: 'The University of Melbourne' },
  { id: 4, name: 'National University of Singapore (NUS)', image: 'img/partner/National-University-of-Singapore.webp', alt: 'National University of Singapore (NUS)' },
  { id: 5, name: 'The University of Manchester', image: 'img/partner/The-University-of-Manchester.webp', alt: 'The University of Manchester' },
  { id: 6, name: 'University of California Los Angeles (UCLA)', image: 'img/partner/University-of-California-Los-Angeles.webp', alt: 'University of California Los Angeles (UCLA)' },
  { id: 7, name: 'UNSW Sydney', image: 'img/partner/UNSW.webp', alt: 'UNSW Sydney' },
  { id: 8, name: 'The University of Queensland, Australia', image: 'img/partner/The-University-of-Queensland.webp', alt: 'The University of Queensland, Australia' },
  { id: 9, name: 'Kings College London, UK', image: 'img/partner/Kings-College-London.webp', alt: 'Kings College London, UK' },
  { id: 10, name: 'New York University', image: 'img/partner/New-York-University.webp', alt: 'New York University' },
  { id: 11, name: 'The University of Sydney', image: 'img/partner/The-University-of-Sydney.webp', alt: 'The University of Sydney' },
  { id: 12, name: 'The University of Auckland', image: 'img/partner/The-University-of-Auckland.webp', alt: 'The University of Auckland' },
  { id: 13, name: 'University of Bristol, UK', image: 'img/partner/University-of-Bristol.webp', alt: 'University of Bristol, UK' },
  { id: 14, name: 'Monash University', image: 'img/partner/Monash-University.webp', alt: 'Monash University' },
  { id: 15, name: 'University of Western Australia', image: 'img/partner/University-of-Western-Australia.webp', alt: 'University of Western Australia' },
  { id: 16, name: 'University of Amsterdam', image: 'img/partner/University-of-Amsterdam.webp', alt: 'University of Amsterdam' },
];

export default function PartnersSection() {
  const [showAll, setShowAll] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const visibleUniversities = showAll ? universities : universities.slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
      <section className="py-16 px-4 bg-gray-50">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our <span className="relative inline-block">
                Top Ranked
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-blue-200 opacity-50 -z-10"></span>
              </span> Partners
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Here are the top universities according to the QS World Rankings. Edwise is proud to partner with these esteemed institutions
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12"
          >
            {visibleUniversities.map((uni) => (
              <motion.div
                key={uni.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredId(uni.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="relative group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
                  <div className="aspect-w-16 aspect-h-9 relative h-48">
                    <img 
                      src={uni.image} 
                      alt={uni.alt}
                      className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  {hoveredId === uni.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-0 left-0 right-0 p-4 text-white text-center"
                    >
                      <p className="font-semibold text-sm">{uni.name}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
            >
              {showAll ? 'Show Less' : 'View More'}
              {showAll ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </motion.button>
          </div>
        </motion.div>
      </section>
    </>
  );
}