// File: src/pages/CourseDetails.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { countries as coursesCountries } from "../courses"; // This has courses data
import { countries as offeredCountries } from "../components/offeredCountries"; // This has flags and universities

// Helper function to map short country names to full names for flag lookup
const mapShortToFullCountryName = (shortName) => {
  const mapping = {
    'uk': 'United Kingdom',
    'usa': 'United States',
    'canada': 'Canada',
    'australia': 'Australia',
  };
  return mapping[shortName.toLowerCase()] || shortName;
};

// Flatten all courses for lookup, attaching countryFlag from offeredCountries
const allCourses = coursesCountries.flatMap(country => 
  country.courses.map(course => {
    const fullCountryName = mapShortToFullCountryName(country.name);
    const flagCountry = offeredCountries.find(c => c.name === fullCountryName);
    return { 
      ...course, 
      country: country.name, 
      countryFullName: fullCountryName,
      countryFlag: flagCountry?.flag || 'https://flagcdn.com/w40/gb.svg' // Default to UK flag if not found
    };
  })
);

// Flatten all universities for lookup from offeredCountries
const allUniversities = offeredCountries.flatMap(country => 
  country.universities?.map(uni => ({ ...uni, country: country.name })) || []
);

const CourseDetails = () => {
  const { country, slug } = useParams();
  const navigate = useNavigate();
  const course = allCourses.find(c => c.link === `/course/${country}/${slug}`);
  const [activeTab, setActiveTab] = useState('overview');
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', message: '' });
  const [showModal, setShowModal] = useState(false);

  if (!course) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-16 text-center min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-white">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-900 mb-6">Course Not Found</h1>
          <p className="text-lg text-gray-700 mb-8">
            Sorry, we couldn't find the course you're looking for.
          </p>
          <button 
            onClick={() => navigate(-1)}
            className="inline-block bg-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300"
          >
            Go Back
          </button>
        </div>
      </section>
    );
  }

  const handleInquiryChange = (e) => {
    setInquiryForm({ ...inquiryForm, [e.target.name]: e.target.value });
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    console.log('Inquiry Submitted:', inquiryForm);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const handleUniversityClick = (universityName) => {
    navigate(`/university/${encodeURIComponent(universityName)}`);
  };

  // Function to find university data with fuzzy matching
  const findUniversityData = (uniName) => {
    if (!uniName) return null;
    
    // Exact match
    let university = allUniversities.find(u => 
      u.name.toLowerCase() === uniName.toLowerCase()
    );
    
    // Partial match if exact not found
    if (!university) {
      university = allUniversities.find(u => 
        u.name.toLowerCase().includes(uniName.toLowerCase()) || 
        uniName.toLowerCase().includes(u.name.toLowerCase())
      );
    }
    
    return university;
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={course.countryFlag}
                  alt={`${course.countryFullName || course.country} Flag`}
                  className="w-16 h-12 object-cover rounded-lg border-2 border-white"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://flagcdn.com/w40/gb.svg'; // Fallback to a default flag
                  }}
                />
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {course.countryFullName || course.country}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{course.name}</h1>
              <p className="text-xl text-purple-100 mb-6 max-w-3xl">
                {course.description?.split('.')[0] || "World-class education with excellent career prospects"}
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm">
                  Duration: {course.duration}
                </span>
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm">
                  Qualification: {course.qualification}
                </span>
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm">
                  International Recognition
                </span>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white mb-2">
                  {course.tuition}
                </div>
                <div className="text-purple-200">Annual Tuition</div>
              </div>
              
              <button
  onClick={() => navigate("/inquiryform")}
  className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-yellow-600 transition-colors duration-300"
>
  Inquiry Now
</button>

            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex overflow-x-auto border-b border-gray-200">
                {['overview', 'eligibility', 'universities', 'careers'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-6 py-3 font-medium whitespace-nowrap ${
                      activeTab === tab 
                        ? 'border-b-2 border-purple-600 text-purple-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="pt-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Overview</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {course.description}
                    </p>
                    <div className="bg-purple-50 rounded-xl p-6 mb-6">
                      <h3 className="text-xl font-semibold text-purple-900 mb-4">Why Study in {course.countryFullName || course.country}?</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <span className="text-gray-700">World-class education system</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <span className="text-gray-700">Scholarships available</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <span className="text-gray-700">Post-study work visas</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <span className="text-gray-700">Diverse culture & quality life</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'eligibility' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Entry Requirements</h2>
                      <div className="space-y-4">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-600">Academic Requirements</span>
                          <span className="font-semibold text-right max-w-xs">{course.entryRequirements}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-600">English Proficiency</span>
                          <span className="font-semibold">IELTS 6.5+ / TOEFL 90+</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-600">Application Deadline</span>
                          <span className="font-semibold">Rolling Admissions</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Details</h2>
                      <div className="space-y-4">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-semibold">{course.duration}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-600">Qualification</span>
                          <span className="font-semibold">{course.qualification}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-600">Tuition Fees</span>
                          <span className="font-semibold">{course.tuition}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-600">Study Mode</span>
                          <span className="font-semibold">Full-time</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'universities' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Universities Offering This Course</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {course.universities?.map((uni, index) => {
                        // Find the actual university data with fuzzy matching
                        const universityData = findUniversityData(uni);
                        
                        return (
                          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{index + 1}</span>
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900">{uni}</h3>
                                <p className="text-sm text-gray-600">{course.countryFullName || course.country}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                              Ranked among top global institutions for {course.name}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                {universityData?.rank ? `QS Rank: ${universityData.rank}` : 'Top Ranked'}
                              </span>
                              <button 
                                onClick={() => handleUniversityClick(universityData?.name || uni)}
                                className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-1 transition-colors"
                              >
                                View Details 
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'careers' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Prospects</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {course.careerProspects || "Graduates of this program have excellent career opportunities in various sectors with competitive salaries and growth potential."}
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Potential Career Paths</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800">Senior Professional</h4>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">High Demand</span>
                        </div>
                        <div className="text-sm text-gray-600">Avg. Salary: $100,000+</div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800">Mid-level Professional</h4>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Medium Demand</span>
                        </div>
                        <div className="text-sm text-gray-600">Avg. Salary: $70,000 - $90,000</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Salary Expectations</h3>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Starting Salary</h4>
                          <div className="text-2xl font-bold text-purple-700">$50,000 - $80,000</div>
                          <p className="text-sm text-gray-600 mt-1">per year</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Experienced Professional</h4>
                          <div className="text-2xl font-bold text-blue-700">$100,000+</div>
                          <p className="text-sm text-gray-600 mt-1">per year</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Inquire About This Course</h2>
              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={inquiryForm.name}
                    onChange={handleInquiryChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={inquiryForm.email}
                    onChange={handleInquiryChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Tell us about your interests and questions..."
                  value={inquiryForm.message}
                  onChange={handleInquiryChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent h-32"
                  required
                />
                <button 
                  type="submit" 
                  className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 font-bold text-lg"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Course Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-bold text-purple-700">{course.duration}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Qualification</span>
                  <span className="font-bold text-blue-700">{course.qualification}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Study Mode</span>
                  <span className="font-bold text-green-700">Full-time</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Language</span>
                  <span className="font-bold text-orange-700">English</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Intakes</span>
                  <span className="font-bold text-green-700">September, January</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About {course.countryFullName || course.country}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={course.countryFlag} 
                    alt={course.countryFullName || course.country} 
                    className="w-12 h-8 object-cover rounded border"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://flagcdn.com/w40/gb.svg';
                    }} 
                  />
                  <span className="font-semibold text-gray-800">{course.countryFullName || course.country}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Study in {course.countryFullName || course.country} and experience world-class education, diverse culture, and excellent career opportunities.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Education Rank:</span>
                    <span className="font-medium">Top 10 Globally</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">International Students:</span>
                    <span className="font-medium">500,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Post-study Work:</span>
                    <span className="font-medium text-green-600">2-3 Years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-blue-700 rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-3">Ready to Apply?</h3>
              <p className="text-purple-100 mb-4 text-sm">
                Start your educational journey in {course.countryFullName || course.country} today.
              </p>
              <div className="space-y-3">
<button
  onClick={() => navigate("/inquiryform")}
  className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-yellow-600 transition-colors duration-300"
>
  Inquiry Now
</button>

                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 transition-colors"
            >
              ← Back to Courses
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-700 font-semibold hover:text-gray-900 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Inquiry Submitted!</h3>
            <p className="text-gray-700 mb-6">We'll get back to you within 24 hours.</p>
            <button 
              onClick={() => setShowModal(false)} 
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-purple-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CourseDetails;