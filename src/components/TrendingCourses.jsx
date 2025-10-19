import React, { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { countries } from "../courses";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import defaultImage from '../assets/Trandingimage/cityscape50572631280.png'; // Verify this path

const TrendingCourses = () => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [selectedCountry, setSelectedCountry] = useState('all');
  const navigate = useNavigate();

  const handleCourseClick = (link) => {
    navigate(link);
  };

  const handleImageLoad = (courseId) => {
    console.log(`Image loaded for course ID: ${courseId}`);
    setLoadedImages((prev) => new Set([...prev, courseId]));
  };

  const handleImageError = (e, course) => {
    console.log(`Image failed for ${course.name} (URL: ${course.img}), using default`);
    e.target.src = defaultImage;
    setLoadedImages((prev) => new Set([...prev, course.id]));
  };

  const ImageSkeleton = () => (
    <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"></div>
  );

  const filteredCourses = useMemo(() => {
    if (selectedCountry === 'all') {
      return countries.flatMap(country =>
        country.courses.map(course => ({
          ...course,
          countryName: country.name,
          countryViewMoreLink: country.viewMoreLink,
          countrySlug: country.name.toLowerCase().replace(/\s+/g, '-')
        }))
      );
    } else {
      const selected = countries.find(c => c.name === selectedCountry);
      return selected ? selected.courses.map(course => ({
        ...course,
        countryName: selected.name,
        countryViewMoreLink: selected.viewMoreLink,
        countrySlug: selected.name.toLowerCase().replace(/\s+/g, '-')
      })) : [];
    }
  }, [selectedCountry]);

  const handleViewMore = () => {
    if (selectedCountry === 'all') {
      navigate('/courses');
    } else {
      const selectedCountryData = countries.find(c => c.name === selectedCountry);
      if (selectedCountryData?.viewMoreLink) {
        navigate(selectedCountryData.viewMoreLink);
      } else {
        navigate(`/study-abroad/${selectedCountry.toLowerCase().replace(/\s+/g, '-')}`);
      }
    }
  };

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
              className={`px-4 py-2 rounded-full font-medium transition-colors ${selectedCountry === country.name ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50'}`}
            >
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
            preloadImages={true}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 25 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
          >
            {filteredCourses.map((course) => {
              const isImageLoaded = loadedImages.has(course.id);

              return (
                <SwiperSlide key={course.id}>
                  <div className="f-col group cursor-pointer" onClick={() => handleCourseClick(course.link)}>
                    <div className="course-box bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                      <div className="course-img relative overflow-hidden flex-shrink-0">
                        {!isImageLoaded && <ImageSkeleton />}
                        <img
                          src={course.img}
                          alt={course.alt || `${course.name} course`}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          onLoad={() => handleImageLoad(course.id)}
                          onError={(e) => handleImageError(e, course)}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                          <span className="text-xs font-semibold text-gray-700">{course.countryName}</span>
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
                        {course.tuition && (
                          <div className="mt-3 text-sm font-semibold text-green-600">{course.tuition}</div>
                        )}
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
              onClick={handleViewMore}
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