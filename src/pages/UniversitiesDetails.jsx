import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { countries } from "../components/offeredCountries";

const UniversityDetails = () => {
  const { universityName } = useParams();
  const navigate = useNavigate();
  const decodedUniversityName = decodeURIComponent(universityName || "");

  let selectedUniversity = null;
  let country = null;

  countries.forEach(c => {
    const uni = c.universities.find(u => 
      u.name.toLowerCase() === decodedUniversityName.toLowerCase()
    );
    if (uni) {
      selectedUniversity = uni;
      country = c;
    }
  });

  if (!selectedUniversity || !country) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-16 text-center min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-900 mb-6">University Not Found</h1>
          <p className="text-lg text-gray-700 mb-8">
            Sorry, we couldn't find details for "{decodedUniversityName}".
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

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <div className="bg-gradient-to-r from-purple-700 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={country.flag}
                  alt={`${country.name} Flag`}
                  className="w-16 h-12 object-cover rounded-lg border-2 border-white"
                />
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {country.name}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{selectedUniversity.name}</h1>
              <p className="text-xl text-purple-100 mb-6 max-w-3xl">
                {selectedUniversity.motto || "Excellence in Education and Research"}
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm">
                  QS Rank: {selectedUniversity.rank || "Top 500"}
                </span>
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm">
                  {selectedUniversity.acceptanceRate} Acceptance
                </span>
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm">
                  {selectedUniversity.internationalStudents} Int'l
                </span>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white mb-2">
                  {selectedUniversity.fees || "$50,000"}
                </div>
                <div className="text-purple-200">Annual Tuition</div>
              </div>
              <button className="w-full bg-white text-purple-700 py-3 px-6 rounded-lg font-bold hover:bg-purple-100 transition-colors duration-300 mb-3">
                Contact University
              </button>
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
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">University Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedUniversity.detailedDescription}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Founded</span>
                    <span className="font-semibold">{selectedUniversity.founded}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Type</span>
                    <span className="font-semibold">{selectedUniversity.type}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Total Students</span>
                    <span className="font-semibold">{selectedUniversity.totalStudents}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Campus</span>
                    <span className="font-semibold">{selectedUniversity.campus}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Language</span>
                    <span className="font-semibold">{selectedUniversity.language}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Scholarships</span>
                    <span className="font-semibold text-green-600">{selectedUniversity.scholarships}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Programs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedUniversity.programs.map((program, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-800">{program}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Opportunities</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Top Professions:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">Software Engineer</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">High</span>
                    </div>
                    <div className="text-sm text-gray-600">Avg. Salary: $85,000</div>
                  </div>
                  {/* Add more as needed */}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">QS Rank</span>
                  <span className="font-bold text-purple-700">#{selectedUniversity.rank}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Acceptance</span>
                  <span className="font-bold text-blue-700">{selectedUniversity.acceptanceRate}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Student-Faculty</span>
                  <span className="font-bold text-green-700">{selectedUniversity.studentFacultyRatio}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Int'l Students</span>
                  <span className="font-bold text-orange-700">{selectedUniversity.internationalStudents}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Employment</span>
                  <span className="font-bold text-green-700">{selectedUniversity.employmentRate}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About {country.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-3">
                  <img src={country.flag} alt={country.name} className="w-12 h-8 object-cover rounded border" />
                  <span className="font-semibold text-gray-800">{country.name}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{country.details}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capital:</span>
                    <span className="font-medium">{country.capital}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-medium">{country.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Currency:</span>
                    <span className="font-medium">{country.currency}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-blue-700 rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-3">Ready to Apply?</h3>
              <p className="text-purple-100 mb-4 text-sm">
                Start your journey today.
              </p>
              <div className="space-y-3">
                <button className="w-full bg-white text-purple-700 py-3 px-4 rounded-lg font-bold hover:bg-purple-50 transition-colors">
                  Apply Now
                </button>
                <button className="w-full bg-transparent border-2 border-white text-white py-3 px-4 rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-colors">
                  Request Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 transition-colors"
            >
              ← Back to Universities
            </button>
            <Link 
              to="/"
              className="flex items-center gap-2 text-gray-700 font-semibold hover:text-gray-900 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversityDetails;