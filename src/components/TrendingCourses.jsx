// File: src/components/TrendingCoursesComponent.jsx
import React, { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { countries } from "../courses";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Updated course image mapping with direct image URLs fetched from reliable sources (one per course for consistency)
const courseImageMapping = {
  // Computer Science & IT
  "Computer Science": {
    imageUrl: "../assets/Trandingimage/bottle-2028855_1280.png"
  },
  "Data Science": {
    imageUrl: "https://cdn.pixabay.com/photo/2022/06/29/06/36/artificial-intelligence-7291057_1280.jpg"
  },
  "Artificial Intelligence": {
    imageUrl: "https://cdn.pixabay.com/photo/2023/02/05/01/09/artificial-intelligence-7768524_1280.jpg"
  },
  "Cybersecurity": {
    imageUrl: "https://cdn.pixabay.com/photo/2022/04/08/12/35/cybersecurity-7119389_1280.jpg"
  },
  "Software Engineering": {
    imageUrl: "https://cdn.pixabay.com/photo/2024/05/21/19/57/computer-8779036_1280.jpg"
  },
  "Information Technology": {
    imageUrl: "https://cdn.pixabay.com/photo/2018/07/31/09/45/technology-3574618_1280.jpg"
  },
  "Machine Learning": {
    imageUrl: "https://cdn.pixabay.com/photo/2024/01/29/22/47/ai-generated-8540920_1280.jpg"
  },
  
  // Engineering
  "Engineering": {
    imageUrl: "https://cdn.pixabay.com/photo/2017/07/27/13/07/electric-car-2545290_1280.png"
  },
  "Mechanical Engineering": {
    imageUrl: "https://cdn.pixabay.com/photo/2017/07/27/13/07/electric-car-2545290_1280.png"
  },
  "Electrical Engineering": {
    imageUrl: "https://cdn.pixabay.com/photo/2024/07/11/22/49/man-8889170_1280.jpg"
  },
  "Civil Engineering": {
    imageUrl: "https://cdn.pixabay.com/photo/2023/06/10/05/36/civil-engineering-8053197_1280.png"
  },
  "Chemical Engineering": {
    imageUrl: "https://cdn.pixabay.com/photo/2024/02/09/17/06/ai-generated-8563463_1280.jpg"
  },
  "Aerospace Engineering": {
    imageUrl: "https://cdn.pixabay.com/photo/2024/02/09/17/06/ai-generated-8563463_1280.jpg"
  },
  "Automotive Engineering": {
    imageUrl: "https://cdn.pixabay.com/photo/2024/06/03/17/13/futuristic-car-8806926_1280.jpg"
  },
  
  // Business & Management
  "Business Administration": {
    imageUrl: "https://cdn.pixabay.com/photo/2024/05/30/00/39/woman-8797458_1280.jpg"
  },
  "Business Management": {
    imageUrl: "https://cdn.pixabay.com/photo/2021/03/30/03/08/handshake-6135752_1280.jpg"
  },
  "MBA": {
    imageUrl: "https://cdn.e-gmat.com/blogs/wp-content/uploads/2020/06/mba-full-form.jpg"
  },
  "Finance": {
    imageUrl: "https://cdn.pixabay.com/photo/2015/01/03/08/39/rupees-587271_1280.jpg"
  },
  "Marketing": {
    imageUrl: "https://cdn.pixabay.com/photo/2022/08/30/14/45/email-marketing-7421283_1280.png"
  },
  "International Business": {
    imageUrl: "https://cdn.pixabay.com/photo/2024/09/21/02/13/global-business-9062781_1280.jpg"
  },
  "Economics": {
    imageUrl: "https://cdn.pixabay.com/photo/2021/10/26/09/56/poor-6743190_1280.png"
  },
  
  // Medicine & Health
  "Medicine": {
    imageUrl: "https://cdn.pixabay.com/photo/2016/09/14/20/50/tooth-1670434_1280.png"
  },
  "Nursing": {
    imageUrl: "https://cdn.pixabay.com/photo/2022/05/15/10/43/nursing-7197237_1280.png"
  },
  "Pharmacy": {
    imageUrl: "https://cdn.pixabay.com/photo/2022/10/06/15/24/pharmacist-7502987_1280.png"
  },
  "Public Health": {
    imageUrl: "https://cdn.pixabay.com/photo/2021/10/17/21/34/family-6719424_1280.png"
  },
  "Dentistry": {
    imageUrl: "https://cdn.pixabay.com/photo/2024/02/16/06/26/dentist-8576790_1280.png"
  },
  "Physiotherapy": {
    imageUrl: "https://bouve.northeastern.edu/wp-content/uploads/2023/08/Bouve-new-7.webp"
  },
  "Biotechnology": {
    imageUrl: "https://cdn.pixabay.com/photo/2020/01/12/21/51/microscope-4761195_1280.png"
  },
  
  // Law & Social Sciences
  "Law": {
    imageUrl: "https://cdn.pixabay.com/photo/2025/09/20/12/41/police-9844768_1280.png"
  },
  "Psychology": {
    imageUrl: "https://cdn.pixabay.com/photo/2020/08/03/09/51/brain-5459685_1280.png"
  },
  
  // Other Fields
  "Architecture": {
    imageUrl: "https://cdn.pixabay.com/photo/2017/02/01/12/03/building-2029958_1280.png"
  },
  "Hospitality & Tourism": {
    imageUrl: "https://cdn.pixabay.com/photo/2020/04/18/01/04/cityscape-5057263_1280.png"
  },
  "Education": {
    imageUrl: "https://cdn.pixabay.com/photo/2025/08/19/14/53/library-9784151_1280.png"
  },
  "Environmental Science": {
    imageUrl: "https://cdn.pixabay.com/photo/2017/02/01/03/53/bottle-2028855_1280.png"
  },
  "Renewable Energy": {
    imageUrl: "https://cdn.pixabay.com/photo/2024/02/24/10/48/solar-panels-8593759_1280.png"
  },
  
  // Default fallback
  "default": {
    imageUrl: "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Course+Image"
  }
};

const TrendingCourses = () => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [selectedCountry, setSelectedCountry] = useState('all');
  const navigate = useNavigate();

  const handleCourseClick = (link) => {
    navigate(link);
  };

  // Get direct image URL from mapping
  const getCourseImageUrl = (courseName) => {
    const mapping = courseImageMapping[courseName] || courseImageMapping["default"];
    return mapping.imageUrl;
  };

  const handleImageLoad = (courseId) => {
    setLoadedImages(prev => new Set([...prev, courseId]));
  };

  const handleImageError = (e) => {
    e.target.src = courseImageMapping["default"].imageUrl;
  };

  const ImageSkeleton = () => (
    <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586 a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  );

  const filteredCourses = useMemo(() => {
    if (selectedCountry === 'all') {
      return countries.flatMap(country => 
        country.courses.map(course => ({
          ...course,
          countryName: country.name,
          countryFlag: country.flag,
          countrySlug: country.name.toLowerCase().replace(/\s+/g, '-')
        }))
      );
    } else {
      const selected = countries.find(c => c.name === selectedCountry);
      return selected ? selected.courses.map(course => ({
        ...course,
        countryName: selected.name,
        countryFlag: selected.flag,
        countrySlug: selected.name.toLowerCase().replace(/\s+/g, '-')
      })) : [];
    }
  }, [selectedCountry]);

  if (countries.length === 0 || filteredCourses.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">No trending courses available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50" data-aos="fade-in" data-aos-duration="200">
      <div className="container max-w-7xl mx-auto px-4">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Discover <span className="text-yellow-400 highlighter">Trending Courses</span> Worldwide
        </h3>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCountry('all')}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${selectedCountry === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50'}`}
          >
            All Countries
          </button>
          {countries.map((country) => (
            <button
              key={country.name}
              onClick={() => setSelectedCountry(country.name)}
              className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${selectedCountry === country.name ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50'}`}
            >
              <img src={country.flag} alt={country.name} className="w-5 h-3 object-cover rounded" />
              {country.name}
            </button>
          ))}
        </div>

        <div className="course-slider-wrap relative">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={filteredCourses.length > 4}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Navigation, Pagination, Autoplay]}
            className="courseSwiperAll"
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 25 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
          >
            {filteredCourses.map((course) => {
              const imageUrl = getCourseImageUrl(course.name);
              const isImageLoaded = loadedImages.has(course.id);

              return (
                <SwiperSlide key={course.id}>
                  <div className="f-col group cursor-pointer" onClick={() => handleCourseClick(course.link)}>
                    <div className="course-box bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                      <div className="course-img relative overflow-hidden flex-shrink-0">
                        {!isImageLoaded && <ImageSkeleton />}
                        <img
                          src={imageUrl}
                          alt={course.alt || `${course.name} course`}
                          className={`w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ${isImageLoaded ? 'block' : 'hidden'}`}
                          onLoad={() => handleImageLoad(course.id)}
                          onError={handleImageError}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute top-3 left-3">
                          <img src={course.countryFlag} alt={course.countryName} className="w-6 h-4 object-cover rounded shadow-sm" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm font-medium bg-blue-600 px-2 py-1 rounded">View Details</span>
                        </div>
                      </div>
                      <div className="course-dtl p-5 flex-1 flex flex-col">
                        <h3 className="course-name text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                          {course.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2 flex-1">{course.description}</p>
                        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {course.duration}
                          </span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">{course.qualification}</span>
                        </div>
                        {course.tuition && <div className="mt-3 text-sm font-semibold text-green-600">{course.tuition}</div>}
                        <div className="mt-2 text-xs text-gray-500">in {course.countryName}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
            <div className="swiper-button-prev !text-blue-600 !w-10 !h-10 after:!text-2xl"></div>
            <div className="swiper-button-next !text-blue-600 !w-10 !h-10 after:!text-2xl"></div>
          </Swiper>

          <div className="center-btn mt-10 text-center">
            <button 
              onClick={() => navigate(selectedCountry === 'all' ? '/courses' : `/courses/${selectedCountry.toLowerCase().replace(/\s+/g, '-')}`)}
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              View More in {selectedCountry === 'all' ? 'All Countries' : selectedCountry}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingCourses;