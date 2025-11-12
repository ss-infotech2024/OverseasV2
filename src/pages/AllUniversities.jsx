// src/components/AllUniversities.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { X, MapPin, Star, Calendar } from "lucide-react";
import { countries } from "../offeredCountries";

// ──────────────────────────────────────────────────────────────
// HIGH-RES IMAGES (≥1200px width) – Desktop only
// ──────────────────────────────────────────────────────────────
import HeroLeft from "../assets/studyabroad1.png";
import HeroRight from "../assets/studyabroad.png";

const AllUniversities = () => {
  // ────── URL Search Params ──────
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get("country") || "All");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "rank");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page"), 10) || 1);
  const [itemsPerPage, setItemsPerPage] = useState(parseInt(searchParams.get("perPage"), 10) || 4);

  // Sync state with URL
  useEffect(() => {
    const p = new URLSearchParams();
    if (searchTerm) p.set("search", searchTerm);
    if (selectedCountry !== "All") p.set("country", selectedCountry);
    if (sortBy !== "rank") p.set("sort", sortBy);
    if (currentPage !== 1) p.set("page", currentPage.toString());
    if (itemsPerPage !== 3) p.set("perPage", itemsPerPage.toString());
    setSearchParams(p);
  }, [searchTerm, selectedCountry, sortBy, currentPage, itemsPerPage, setSearchParams]);

  // ────── Data Processing ──────
  const allUniversities = useMemo(() => {
    return countries.flatMap(c =>
      c.universities.map(u => ({
        ...u,
        country: c.name,
        countryFlag: c.flag,
        countryDetails: c.details,
        rank: u.rank === "N/A" ? 9999 : parseInt(u.rank, 10) || 9999,
      }))
    );
  }, []);

  const filteredUniversities = useMemo(() => {
    let list = allUniversities;

    // Search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        u =>
          u.name.toLowerCase().includes(q) ||
          u.country.toLowerCase().includes(q) ||
          u.location.toLowerCase().includes(q) ||
          u.programs.some(p => p.toLowerCase().includes(q))
      );
    }

    // Country filter
    if (selectedCountry !== "All") {
      list = list.filter(u => u.country === selectedCountry);
    }

    // Sorting
    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case "rank":
          return a.rank - b.rank;
        case "name":
          return a.name.localeCompare(b.name);
        case "country":
          return a.country.localeCompare(b.country);
        case "acceptance":
          return (parseFloat(a.acceptanceRate) || 100) - (parseFloat(b.acceptanceRate) || 100);
        case "students":
          return (
            (parseInt(b.totalStudents.replace(/,/g, ""), 10) || 0) -
            (parseInt(a.totalStudents.replace(/,/g, ""), 10) || 0)
          );
        default:
          return 0;
      }
    });

    return list;
  }, [allUniversities, searchTerm, selectedCountry, sortBy]);

  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentUniversities = filteredUniversities.slice(start, start + itemsPerPage);

  const uniqueCountries = useMemo(() => {
    const set = new Set(allUniversities.map(u => u.country));
    return ["All", ...Array.from(set)].sort();
  }, [allUniversities]);

  const stats = useMemo(() => {
    const ranked = allUniversities.filter(u => u.rank !== 9999);
    const counts = allUniversities.reduce((acc, u) => {
      acc[u.country] = (acc[u.country] || 0) + 1;
      return acc;
    }, {});
    const topCountry = Object.entries(counts).reduce((a, b) => (b[1] > a[1] ? b : a), ["", 0])[0];
    return {
      totalUniversities: allUniversities.length,
      totalCountries: new Set(allUniversities.map(u => u.country)).size,
      rankedUniversities: ranked.length,
      topCountry,
    };
  }, [allUniversities]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCountry, sortBy, itemsPerPage]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCountry("All");
    setSortBy("rank");
    setItemsPerPage(3);
    setCurrentPage(1);
  };

  const pageNumbers = () => {
    const max = 5;
    let start = 1;
    let end = totalPages;
    if (totalPages > max) {
      if (currentPage <= 3) end = max;
      else if (currentPage >= totalPages - 2) start = totalPages - max + 1;
      else {
        start = currentPage - 2;
        end = currentPage + 2;
      }
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // ────── RENDER ──────
  return (
    <>
      {/* ────────────────────── HERO SECTION ────────────────────── */}
      <section className="relative h-[380px] md:h-[500px] lg:h-[600px] overflow-hidden">

        {/* DESKTOP: Left + Right Images */}
        <div className="hidden md:flex h-full">
          <div
            className="w-[425px] bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url(${HeroLeft})` }}
            aria-hidden="true"
          />
          <div className="flex-1" />
          <div
            className="w-[425px] bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url(${HeroRight})` }}
            aria-hidden="true"
          />
        </div>

        {/* MOBILE: Solid gradient background */}
        <div
          className="md:hidden h-full bg-gradient-to-b from-blue-900 to-indigo-900"
          aria-hidden="true"
        />

        {/* TEXT OVERLAY */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="w-full h-full max-w-2xl flex flex-col justify-center text-center bg-[#1B2D6E] bg-opacity-90 p-6 md:p-8 lg:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <p className="mb-2 text-xs font-medium tracking-wider uppercase md:text-sm">
                100+ Universities • 10+ Countries • Free Counseling
              </p>

              <h1 className="mb-3 text-2xl font-bold md:text-4xl lg:text-5xl">
                All Universities
              </h1>

              <p className="mb-6 text-sm md:text-base lg:text-lg">
                Explore {allUniversities.length}+ world-class universities across {stats.totalCountries} countries.
                Find your perfect academic destination.
              </p>

              <a
                href="tel:+919371494930"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
              >
                Book Free Counseling
                <span className="text-xs">+91 93714 94930</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────────── MAIN CONTENT ────────────────────── */}
      <section className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* Filters */}
        <div className="grid gap-3 mb-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search universities, programs..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {uniqueCountries.map(c => (
              <option key={c} value={c}>
                {c === "All" ? "All Countries" : c}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="rank">Sort by Rank</option>
            <option value="name">Sort by Name</option>
            <option value="country">Sort by Country</option>
            <option value="acceptance">Sort by Acceptance Rate</option>
            <option value="students">Sort by Student Size</option>
          </select>

          <select
            value={itemsPerPage}
            onChange={e => setItemsPerPage(Number(e.target.value))}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {[4, 5, 10, 20].map(n => (
              <option key={n} value={n}>{n} per page</option>
            ))}
          </select>
        </div>

        {/* Active Filter Pills */}
        {(searchTerm || selectedCountry !== "All" || sortBy !== "rank" || itemsPerPage !== 3) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-gray-700">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="ml-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {selectedCountry !== "All" && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-gray-700">
                Country: {selectedCountry}
                <button onClick={() => setSelectedCountry("All")} className="ml-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {sortBy !== "rank" && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-gray-700">
                Sort: {sortBy}
                <button onClick={() => setSortBy("rank")} className="ml-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {itemsPerPage !== 4 && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-gray-700">
                Per Page: {itemsPerPage}
                <button onClick={() => setItemsPerPage(4)} className="ml-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="ml-2 text-blue-600 hover:underline text-sm font-medium"
            >
              Clear All
            </button>
          </div>
        )}

        {/* University Cards - IMPROVED STRUCTURE */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentUniversities.map((uni, idx) => (
            <motion.div
              key={`${uni.country}-${uni.name}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Header Section */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
                      {uni.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{uni.location}, {uni.country}</span>
                    </div>
                  </div>

                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="bg-white px-2 py-1 rounded border">{uni.type}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>4.5</span>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="p-4 border-b border-gray-100">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 font-medium">Acceptance</div>
                    <div className="text-sm font-bold text-gray-900">{uni.acceptanceRate}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 font-medium">International</div>
                    <div className="text-sm font-bold text-gray-900">{uni.internationalStudents}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 font-medium">Employment</div>
                    <div className="text-sm font-bold text-gray-900">{uni.employmentRate}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 font-medium">Students</div>
                    <div className="text-sm font-bold text-gray-900">{uni.totalStudents}</div>
                  </div>
                </div>
              </div>

              {/* Programs Section */}
              <div className="p-4 border-b border-gray-100 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-700">Popular Programs</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {uni.programs.slice(0, 3).map((p, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg font-medium border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    >
                      {p}
                    </span>
                  ))}
                  {uni.programs.length > 3 && (
                    <span className="px-2.5 py-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                      +{uni.programs.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer Section */}
              <div className="p-4 bg-gray-50">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs text-gray-600 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Founded: {uni.founded}</span>
                    </div>
                    <div className="text-gray-400 ml-4">Ratio: {uni.studentFacultyRatio}</div>
                  </div>
                  <Link
                    to={`/university/${encodeURIComponent(uni.name)}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap flex-shrink-0"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            {pageNumbers().map(n => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition ${currentPage === n
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-50 text-gray-700"
                  }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredUniversities.length === 0 && (
          <div className="py-16 text-center">
            <p className="mb-3 text-xl font-semibold text-gray-800">No universities found</p>
            <p className="mb-5 text-gray-600">Try adjusting your search or filters.</p>
            <button
              onClick={clearAllFilters}
              className="text-blue-600 font-medium hover:underline"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-16 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
};

export default AllUniversities;