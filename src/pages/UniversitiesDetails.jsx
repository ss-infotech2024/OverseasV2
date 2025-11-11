import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { countries } from "../components/offeredCountries";

const UniversityDetails = () => {
  const { universityName } = useParams();
  const navigate = useNavigate();

  // Decode and clean the URL parameter
  const decodedUniversityName = decodeURIComponent(universityName || "").trim();

  let selectedUniversity = null;
  let country = null;

  // More robust search: case-insensitive, handles partial matches and variations
  const searchName = decodedUniversityName.toLowerCase().replace(/\s+/g, ' ').trim();

  console.log("Searching for:", searchName);
  console.log("Available countries:", countries.map(c => c.name));

  for (const c of countries) {
    const uni = c.universities.find(u => {
      const cleanName = u.name.toLowerCase().replace(/\s+/g, ' ').trim();

      // Multiple matching strategies
      return cleanName === searchName ||
        cleanName.includes(searchName) ||
        searchName.includes(cleanName) ||
        cleanName.replace(/[^a-z0-9]/g, '') === searchName.replace(/[^a-z0-9]/g, '');
    });

    if (uni) {
      selectedUniversity = uni;
      country = c;
      console.log("Found:", uni.name, "in", c.name);
      break;
    }
  }

  // If still not found, try a more flexible search
  if (!selectedUniversity) {
    console.log("Trying flexible search...");
    for (const c of countries) {
      const uni = c.universities.find(u => {
        const cleanName = u.name.toLowerCase();
        return cleanName.includes(searchName) || searchName.includes(cleanName);
      });
      if (uni) {
        selectedUniversity = uni;
        country = c;
        console.log("Found with flexible search:", uni.name);
        break;
      }
    }
  }

  // Debug: Log all Japan universities
  const japanUniversities = countries.find(c => c.name === "Japan")?.universities || [];
  console.log("Available Japan universities:", japanUniversities.map(u => u.name));

  // Not Found UI
  if (!selectedUniversity || !country) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-16 text-center min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-red-600 mb-6">
            University Not Found
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Sorry, we couldn't find details for:
          </p>
          <p className="text-xl font-mono bg-gray-100 px-4 py-2 rounded-lg mb-6">
            "{decodedUniversityName}"
          </p>

          <div className="text-sm text-gray-500 mb-6">
            <p className="font-semibold mb-2">Available universities in Japan:</p>
            <div className="max-h-40 overflow-y-auto bg-gray-50 p-4 rounded-lg">
              {japanUniversities.map((uni, index) => (
                <div key={index} className="text-left py-1 border-b border-gray-200 last:border-b-0">
                  {uni.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300"
            >
              Go Back
            </button>
            <Link
              to="/universities"
              className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Browse All Universities
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Open Google Form
  const openInquiryForm = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSfqs_SYWB2r1B9tJYXCoIUuBFjXgNAoRwFePYSp88vagVvAHw/viewform",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-purple-700 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={country.flag}
                  alt={`${country.name} Flag`}
                  className="w-16 h-12 object-cover rounded-lg border-2 border-white shadow-md"
                />
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {country.name}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                {selectedUniversity.name}
              </h1>
              <p className="text-xl text-purple-100 mb-6 max-w-3xl">
                {selectedUniversity.motto || "Excellence in Education and Research"}
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                  QS Rank: #{selectedUniversity.rank}
                </span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                  {selectedUniversity.acceptanceRate} Acceptance
                </span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                  {selectedUniversity.internationalStudents} Int'l Students
                </span>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 min-w-[280px]">
              <h3 className="text-lg font-semibold text-center mb-3">
                Start Your Journey
              </h3>
              <button
                onClick={openInquiryForm}
                className="w-full bg-yellow-500 text-purple-900 py-3 px-6 rounded-lg font-bold hover:bg-yellow-400 transition-all duration-300 shadow-lg"
              >
                Inquiry Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                University Overview
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedUniversity.detailedDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Founded</span>
                    <span className="font-semibold text-purple-700">{selectedUniversity.founded}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Type</span>
                    <span className="font-semibold">{selectedUniversity.type}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Total Students</span>
                    <span className="font-semibold">{selectedUniversity.totalStudents}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Campus</span>
                    <span className="font-semibold">{selectedUniversity.campus}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Language</span>
                    <span className="font-semibold">{selectedUniversity.language}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Scholarships</span>
                    <span className="font-semibold text-green-600">
                      {selectedUniversity.scholarships}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Programs */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Popular Programs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedUniversity.programs && selectedUniversity.programs.map((program, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:from-purple-100 hover:to-blue-100 transition-all duration-300"
                  >
                    <div className="w-9 h-9 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-800">{program}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Opportunities */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Career Opportunities
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Graduates from <strong>{selectedUniversity.name}</strong> enjoy excellent employment outcomes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-400 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">
                        {selectedUniversity.popularPrograms?.split(", ")[0] || "Various Programs"}
                      </h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        High Demand
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Employment Rate: <strong>{selectedUniversity.employmentRate}</strong></p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-400 transition-colors">
                    <h4 className="font-semibold text-gray-800">Global Opportunities</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>{selectedUniversity.internationalStudents}</strong> international alumni network
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">
            {/* Quick Facts */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">QS World Rank</span>
                  <span className="font-bold text-purple-700">#{selectedUniversity.rank}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Acceptance Rate</span>
                  <span className="font-bold text-blue-700">{selectedUniversity.acceptanceRate}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Student-Faculty Ratio</span>
                  <span className="font-bold text-green-700">{selectedUniversity.studentFacultyRatio}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">International Students</span>
                  <span className="font-bold text-orange-700">{selectedUniversity.internationalStudents}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Employment Rate</span>
                  <span className="font-bold text-green-700">{selectedUniversity.employmentRate}</span>
                </div>
              </div>
            </div>

            {/* About Country */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                About {country.name}
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-14 h-10 object-cover rounded border shadow"
                />
                <div>
                  <div className="font-bold text-gray-800">{country.name}</div>
                  <div className="text-xs text-gray-500">{country.capital}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{country.details}</p>
              <div className="text-xs space-y-1">
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
        </div>
      </div>

      {/* FOOTER NAV */}
      <div className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-center">
            <button
              onClick={() => navigate(-1)}
              className="text-purple-700 font-semibold hover:text-purple-900 transition-colors flex items-center justify-center gap-2"
            >
              Back to Universities
            </button>
            <span className="text-gray-400 hidden sm:block">|</span>
            <Link
              to="/"
              className="text-gray-700 font-semibold hover:text-gray-900 transition-colors"
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