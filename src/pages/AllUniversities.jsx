import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { countries } from "../components/offeredCountries";

const AllUniversities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [sortBy, setSortBy] = useState("rank");

  // Get all universities from all countries
  const allUniversities = useMemo(() => {
    return countries.flatMap(country => 
      country.universities.map(uni => ({
        ...uni,
        country: country.name,
        countryFlag: country.flag,
        countryDetails: country.details
      }))
    );
  }, []);

  // Filter and sort universities
  const filteredUniversities = useMemo(() => {
    let filtered = allUniversities;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(uni =>
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.programs.some(program => 
          program.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by country
    if (selectedCountry !== "All") {
      filtered = filtered.filter(uni => uni.country === selectedCountry);
    }

    // Sort universities
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "rank":
          return parseInt(a.rank) - parseInt(b.rank);
        case "name":
          return a.name.localeCompare(b.name);
        case "country":
          return a.country.localeCompare(b.country);
        case "acceptance":
          return parseFloat(a.acceptanceRate) - parseFloat(b.acceptanceRate);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allUniversities, searchTerm, selectedCountry, sortBy]);

  // Get unique countries for filter
  const uniqueCountries = useMemo(() => {
    const countriesSet = new Set(allUniversities.map(uni => uni.country));
    return ["All", ...Array.from(countriesSet)].sort();
  }, [allUniversities]);

  // Statistics
  const stats = useMemo(() => {
    return {
      totalUniversities: allUniversities.length,
      totalCountries: new Set(allUniversities.map(uni => uni.country)).size,
      averageRank: Math.round(
        allUniversities.reduce((acc, uni) => acc + parseInt(uni.rank), 0) / allUniversities.length
      ),
      topCountry: countries.reduce((prev, current) => 
        prev.universities.length > current.universities.length ? prev : current
      ).name
    };
  }, [allUniversities]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      {/* Hero Section with #581C87 Background */}
      <div className="bg-[#581C87] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
              All Universities
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Explore {allUniversities.length} world-class universities across {stats.totalCountries} countries. 
              Find your perfect academic destination with detailed information and rankings.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
       
        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-purple-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search universities, countries, programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Country Filter */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              {uniqueCountries.map(country => (
                <option key={country} value={country}>
                  {country === "All" ? "All Countries" : country}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="rank">Sort by Rank</option>
              <option value="name">Sort by Name</option>
              <option value="country">Sort by Country</option>
              <option value="acceptance">Sort by Acceptance Rate</option>
            </select>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1 font-medium">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="hover:text-purple-900 ml-1">
                  ×
                </button>
              </span>
            )}
            {selectedCountry !== "All" && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1 font-medium">
                Country: {selectedCountry}
                <button onClick={() => setSelectedCountry("All")} className="hover:text-blue-900 ml-1">
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium">
            Showing {filteredUniversities.length} of {allUniversities.length} universities
            {selectedCountry !== "All" && ` in ${selectedCountry}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {filteredUniversities.map((uni, index) => (
            <div
              key={`${uni.country}-${uni.name}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-purple-300 hover:scale-105 overflow-hidden"
            >
              {/* University Header with Gradient */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300 backdrop-blur-sm">
                      <span className="text-white font-bold text-lg">#{uni.rank}</span>
                    </div>
                    <div>
                      <span className="text-xs bg-white bg-opacity-20 text-white py-1 px-3 rounded-full font-semibold backdrop-blur-sm">
                        Global Rank
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-purple-200">Acceptance Rate</div>
                    <div className="text-2xl font-bold text-white">{uni.acceptanceRate}</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-100 transition-colors duration-300 line-clamp-2">
                  {uni.name}
                </h3>
                
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={uni.countryFlag}
                    alt={`${uni.country} flag`}
                    className="w-6 h-4 object-cover rounded border border-white"
                  />
                  <span className="text-sm text-purple-200 font-medium">{uni.country}</span>
                  <span className="text-sm text-purple-300">•</span>
                  <span className="text-sm text-purple-200">{uni.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-purple-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                  </svg>
                  <span className="font-medium">{uni.type}</span>
                </div>
              </div>

              {/* University Details */}
              <div className="p-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{uni.internationalStudents}</div>
                    <div className="text-xs text-gray-600 font-medium">International</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{uni.fees}</div>
                    <div className="text-xs text-gray-600 font-medium">Annual Fees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{uni.employmentRate}</div>
                    <div className="text-xs text-gray-600 font-medium">Employment</div>
                  </div>
                </div>

                {/* Top Programs */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    POPULAR PROGRAMS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {uni.programs.slice(0, 3).map((program, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-white text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:border-purple-300 hover:text-purple-700 transition-all duration-300 font-medium shadow-sm"
                      >
                        {program}
                      </span>
                    ))}
                    {uni.programs.length > 3 && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-3 py-2 rounded-lg font-semibold border border-purple-200">
                        +{uni.programs.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-3 text-sm text-gray-600 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Founded:</span>
                    <span className="font-semibold text-gray-900">{uni.founded}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total Students:</span>
                    <span className="font-semibold text-gray-900">{uni.totalStudents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Scholarships:</span>
                    <span className="font-semibold text-green-600">{uni.scholarships}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Student-Faculty Ratio:</span>
                    <span className="font-semibold text-blue-600">{uni.studentFacultyRatio}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link 
                    to={`/university/${encodeURIComponent(uni.name)}`}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-105 text-center shadow-md hover:shadow-lg"
                  >
                    View Full Details
                  </Link>
                  <Link 
                    to={`/universities/${encodeURIComponent(uni.country)}`}
                    className="flex items-center justify-center w-12 bg-gray-100 text-gray-600 rounded-xl hover:bg-purple-100 hover:text-purple-700 transition-all duration-300 border border-gray-200 hover:border-purple-300"
                    title="View all universities in this country"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredUniversities.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No universities found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCountry("All");
              }}
              className="bg-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mb-12">
          <Link 
            to="/"
            className="inline-flex items-center gap-3 bg-white text-purple-700 border border-purple-300 py-3 px-8 rounded-xl font-semibold hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AllUniversities;