import React from "react";
import { useParams, Link } from "react-router-dom";
import { countries } from "../components/offeredCountries"; 

const Universities = () => {
  const { countryName } = useParams();
  const decodedCountryName = decodeURIComponent(countryName || "");
  const selectedCountry = countries.find(
    (c) => c.name.toLowerCase() === decodedCountryName.toLowerCase()
  );

  if (!selectedCountry) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-16 text-center min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-900 mb-6">Country Not Found</h1>
          <p className="text-lg text-gray-700 mb-8">
            Sorry, we couldn't find universities for "{decodedCountryName}".
          </p>
          <Link 
            to="/"
            className="inline-block bg-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-6 mb-6">
            <img
              src={selectedCountry.flag}
              alt={`${selectedCountry.name} Flag`}
              className="w-24 h-16 object-cover rounded-lg shadow-lg border border-gray-200"
            />
            <h1 className="text-4xl sm:text-5xl font-bold text-purple-900">
              Universities in {selectedCountry.name}
            </h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {selectedCountry.details}
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-purple-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">{selectedCountry.universities.length}</div>
              <div className="text-gray-600">Total Universities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{selectedCountry.topRanked || "N/A"}</div>
              <div className="text-gray-600">Top Ranked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{selectedCountry.students}</div>
              <div className="text-gray-600">International Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{selectedCountry.programsCount}</div>
              <div className="text-gray-600">Available Programs</div>
            </div>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {selectedCountry.universities.map((uni, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300 hover:scale-105 overflow-hidden"
            >
              {/* University Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-purple-800 transition-colors duration-300">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <span className="text-xs bg-green-100 text-green-800 py-1 px-3 rounded-full font-semibold">
                        Rank #{uni.rank}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Acceptance</div>
                    <div className="text-lg font-bold text-purple-600">{uni.acceptanceRate}</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-purple-900 mb-3 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
                  {uni.name}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{uni.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                    <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <span>{uni.type}</span>
                </div>
              </div>

              {/* University Details */}
              <div className="p-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{uni.internationalStudents}</div>
                    <div className="text-xs text-gray-500">Int'l Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{uni.fees}</div>
                    <div className="text-xs text-gray-500">Annual Fees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{uni.employmentRate}</div>
                    <div className="text-xs text-gray-500">Employment</div>
                  </div>
                </div>

                {/* Popular Programs */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Top Programs:</h4>
                  <div className="flex flex-wrap gap-2">
                    {uni.programs.slice(0, 3).map((program, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full border border-gray-200"
                      >
                        {program}
                      </span>
                    ))}
                    {uni.programs.length > 3 && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                        +{uni.programs.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex justify-between">
                    <span>Founded:</span>
                    <span className="font-medium">{uni.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Student-Faculty Ratio:</span>
                    <span className="font-medium">{uni.studentFacultyRatio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scholarships:</span>
                    <span className="font-medium text-green-600">{uni.scholarships}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link 
                  to={`/university/${encodeURIComponent(uni.name)}`}
                  className="block w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform group-hover:translate-y-[-2px] text-center shadow-md hover:shadow-lg"
                >
                  View Full Details & Programs
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-16">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-white text-purple-700 border border-purple-300 py-3 px-8 rounded-xl font-semibold hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Countries
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Universities;