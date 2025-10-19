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
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-[#29256D] text-white py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
              All Universities
            </h1>
            <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Explore {allUniversities.length} world-class universities across {stats.totalCountries} countries. 
              Find your perfect academic destination with detailed information and rankings.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search universities, countries, programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
              />
              <svg
                className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
            >
              <option value="rank">Sort by Rank</option>
              <option value="name">Sort by Name</option>
              <option value="country">Sort by Country</option>
              <option value="acceptance">Sort by Acceptance Rate</option>
            </select>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-3">
            {searchTerm && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1 font-medium">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="hover:text-blue-900 ml-1">
                  ×
                </button>
              </span>
            )}
            {selectedCountry !== "All" && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1 font-medium">
                Country: {selectedCountry}
                <button onClick={() => setSelectedCountry("All")} className="hover:text-blue-900 ml-1">
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-700 font-medium text-sm">
            Showing {filteredUniversities.length} of {allUniversities.length} universities
            {selectedCountry !== "All" && ` in ${selectedCountry}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Universities Grid */}
        <div className="flex flex-col items-center gap-4 mb-10">
          {filteredUniversities.map((uni, index) => (
            <div
              key={`${uni.country}-${uni.name}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 w-full sm:w-[90%] lg:w-[85%] max-w-6xl flex flex-col sm:flex-row"
            >
              {/* Left Content */}
              <div className="flex-1 p-3 sm:p-4">
                {/* University Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex flex-col gap-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-800 font-bold text-sm">#{uni.rank}</span>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-700 py-1 px-2 rounded-full font-semibold text-center">
                      Global Rank
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                      {uni.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={uni.countryFlag}
                        alt={`${uni.country} flag`}
                        className="w-5 h-3 object-cover rounded border border-gray-300"
                      />
                      <span className="text-xs text-gray-600 font-medium">{uni.country}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">{uni.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                      </svg>
                      <span className="font-medium">{uni.type}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      <span className="font-medium">Acceptance Rate: </span>
                      <span className="font-bold text-blue-700">{uni.acceptanceRate}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 mb-3 p-2 bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-600">{uni.internationalStudents}</div>
                    <div className="text-xs text-gray-600">International</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-600">{uni.fees}</div>
                    <div className="text-xs text-gray-600">Annual Fees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-600">{uni.employmentRate}</div>
                    <div className="text-xs text-gray-600">Employment</div>
                  </div>
                </div>

                {/* Top Programs */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-800 mb-1 flex items-center gap-1">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    POPULAR PROGRAMS
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {uni.programs.slice(0, 3).map((program, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-white text-gray-700 px-2 py-1 rounded-lg border border-gray-200 hover:border-blue-300 hover:text-blue-700 transition-all duration-300"
                      >
                        {program}
                      </span>
                    ))}
                    {uni.programs.length > 3 && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg border border-blue-200">
                        +{uni.programs.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-1 text-xs text-gray-600 p-2 bg-gray-100 rounded-lg">
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
              </div>

              {/* Right Action Buttons */}
              <div className="w-full sm:w-32 p-3 sm:p-4 flex flex-row sm:flex-col justify-between sm:justify-center gap-2 sm:gap-3 bg-gray-50 sm:bg-white">
                <Link 
                  to={`/university/${encodeURIComponent(uni.name)}`}
                  className="flex-1 sm:flex-none bg-blue-600 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all duration-300 text-center shadow-sm hover:shadow-md"
                >
                  View Full Details
                </Link>
                <Link 
                  to={`/universities/${encodeURIComponent(uni.country)}`}
                  className="flex-none w-10 sm:w-auto flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 border border-gray-200 hover:border-blue-300 py-2"
                  title="View all universities in this country"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredUniversities.length === 0 && (
          <div className="text-center py-10">
            <div className="text-4xl sm:text-5xl mb-3">🔍</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">No universities found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCountry("All");
              }}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mb-10">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-white text-blue-700 border border-blue-300 py-2 px-6 rounded-lg font-semibold hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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