// src/components/AllUniversities.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { countries } from "../offeredCountries";

// ──────────────────────────────────────────────────────────────
//  IMAGE IMPORTS
// ──────────────────────────────────────────────────────────────
import HeroLeft from "../assets/studyabroad1.png";
import HeroRight from "../assets/studyabroad.png";
import HeroMobile from "../assets/studyabroad1.png";

const AllUniversities = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get("country") || "All");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "rank");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [itemsPerPage, setItemsPerPage] = useState(parseInt(searchParams.get("perPage")) || 3);

  useEffect(() => {
    const p = new URLSearchParams();
    if (searchTerm) p.set("search", searchTerm);
    if (selectedCountry !== "All") p.set("country", selectedCountry);
    if (sortBy !== "rank") p.set("sort", sortBy);
    if (currentPage !== 1) p.set("page", currentPage.toString());
    if (itemsPerPage !== 3) p.set("perPage", itemsPerPage.toString());
    setSearchParams(p);
  }, [searchTerm, selectedCountry, sortBy, currentPage, itemsPerPage, setSearchParams]);

  const allUniversities = useMemo(() => {
    return countries.flatMap(c =>
      c.universities.map(u => ({
        ...u,
        country: c.name,
        countryFlag: c.flag,
        countryDetails: c.details,
        rank: u.rank === "N/A" ? 9999 : parseInt(u.rank) || 9999,
      }))
    );
  }, []);

  const filteredUniversities = useMemo(() => {
    let list = allUniversities;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q) ||
        u.programs.some(p => p.toLowerCase().includes(q))
      );
    }

    if (selectedCountry !== "All") {
      list = list.filter(u => u.country === selectedCountry);
    }

    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case "rank": return a.rank - b.rank;
        case "name": return a.name.localeCompare(b.name);
        case "country": return a.country.localeCompare(b.country);
        case "acceptance": return (parseFloat(a.acceptanceRate) || 100) - (parseFloat(b.acceptanceRate) || 100);
        case "students": return (parseInt(b.totalStudents.replace(/,/g, "")) || 0) - (parseInt(a.totalStudents.replace(/,/g, "")) || 0);
        default: return 0;
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
    const avgRank = ranked.length ? Math.round(ranked.reduce((s, u) => s + u.rank, 0) / ranked.length) : 0;
    const counts = allUniversities.reduce((acc, u) => {
      acc[u.country] = (acc[u.country] || 0) + 1;
      return acc;
    }, {});
    const topCountry = Object.entries(counts).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
    return {
      totalUniversities: allUniversities.length,
      totalCountries: new Set(allUniversities.map(u => u.country)).size,
      rankedUniversities: ranked.length,
      topCountry,
      avgRank,
    };
  }, [allUniversities]);

  useEffect(() => setCurrentPage(1), [searchTerm, selectedCountry, sortBy, itemsPerPage]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCountry("All");
    setSortBy("rank");
    setItemsPerPage(3);
    setCurrentPage(1);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      {/* ────────────────────── HERO ────────────────────── */}
      <div className="relative bg-[#29256D] text-white overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 opacity-90" />

        {/* LEFT IMAGE – Hidden on mobile */}
        <div className="absolute left-0 top-0 h-full hidden sm:block">
          <img
            src={HeroLeft}
            alt="Students"
            className="h-full w-[200px] sm:w-[280px] md:w-[320px] lg:w-[375px] object-cover object-center opacity-70"
            loading="lazy"
          />
        </div>

        {/* RIGHT IMAGE – Hidden on mobile */}
        <div className="absolute right-0 top-0 h-full hidden sm:block">
          <img
            src={HeroRight}
            alt="Campus"
            className="h-full w-[200px] sm:w-[280px] md:w-[320px] lg:w-[375px] object-cover object-center opacity-70"
            loading="lazy"
          />
        </div>

        {/* MOBILE BACKGROUND – Full width, no text */}
        <div className="absolute inset-0 sm:hidden">
          <img
            src={HeroMobile}
            alt="Study abroad"
            className="h-full w-full object-cover object-center opacity-60"
            loading="lazy"
          />
        </div>

        {/* CENTER CONTENT – HIDDEN ON MOBILE (less than 640px) */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 hidden sm:block">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 shadow-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921.751-1.688 1.346-1.688.595 0 1.046.767 1.346 1.688l1.087 3.347h3.52c1.398 0 2.532 1.133 2.532 2.531 0 .198-.023.395-.068.586l-2.857 8.57A2.531 2.531 0 0113.422 20H6.578a2.531 2.531 0 01-2.532-2.046l-2.857-8.57a2.531 2.531 0 01-.068-.586c0-1.398 1.134-2.531 2.532-2.531h3.52l1.087-3.347z" />
              </svg>
              100+ Universities • 10+ Countries • Free Counseling
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-yellow-300 leading-tight">
              All Universities
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
              Explore <span className="font-bold text-yellow-300">{allUniversities.length}+</span> world-class universities across
              <span className="font-bold text-yellow-300"> {stats.totalCountries} countries</span>. Find your perfect academic destination.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-blue-900 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-base sm:text-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Book Free Counseling
              </Link>
              <a
                href="tel:+919371494930"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +919371494930
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {[
                { value: stats.totalUniversities + "+", label: "Universities" },
                { value: stats.totalCountries, label: "Countries" },
                { value: stats.rankedUniversities, label: "Ranked" },
                { value: stats.topCountry, label: "Top Country" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white/15 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-300">{s.value}</div>
                  <div className="text-xs sm:text-sm text-gray-200">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave – Always visible */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 sm:h-16 text-white">
            <path d="M0 96L60 85.3C120 74.7 240 53.3 360 48C480 42.7 600 53.3 720 64C840 74.7 960 85.3 1080 85.3C1200 85.3 1320 74.7 1380 69.3L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V96Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* ────────────────────── MAIN CONTENT (Filters + Cards) ────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-12">

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <svg className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
              {uniqueCountries.map(c => <option key={c} value={c}>{c === "All" ? "All Countries" : c}</option>)}
            </select>

            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
              <option value="rank">Sort by Rank</option>
              <option value="name">Sort by Name</option>
              <option value="country">Sort by Country</option>
              <option value="acceptance">Sort by Acceptance Rate</option>
              <option value="students">Sort by Student Size</option>
            </select>

            <select value={itemsPerPage} onChange={e => setItemsPerPage(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
              {[3, 5, 10, 20, 50, 100].map(n => <option key={n} value={n}>{n} per page</option>)}
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {searchTerm && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><span>Search: "{searchTerm}"</span><button onClick={() => setSearchTerm("")} className="ml-1">x</button></span>}
            {selectedCountry !== "All" && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><span>Country: {selectedCountry}</span><button onClick={() => setSelectedCountry("All")} className="ml-1">x</button></span>}
            {sortBy !== "rank" && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><span>Sort: {sortBy}</span><button onClick={() => setSortBy("rank")} className="ml-1">x</button></span>}
            {itemsPerPage !== 3 && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><span>Per Page: {itemsPerPage}</span><button onClick={() => setItemsPerPage(3)} className="ml-1">x</button></span>}
          </div>
        </div>

        {/* University Cards */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {currentUniversities.map((uni, idx) => (
            <div key={`${uni.country}-${uni.name}-${idx}`} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 w-full max-w-6xl flex flex-col lg:flex-row">
              <div className="flex-1 p-4 sm:p-5 lg:p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-2">{uni.name}</h3>
                    <div className="flex items-center gap-2 mb-1">
                      <img src={uni.countryFlag} alt={uni.country} className="w-6 h-4 object-cover rounded border border-gray-300" />
                      <span className="text-sm text-gray-600 font-medium">{uni.country}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{uni.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" /></svg>
                      <span className="font-medium">{uni.type}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Acceptance Rate: </span>
                      <span className="font-bold text-blue-700">{uni.acceptanceRate}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3 p-2 bg-gray-100 rounded-lg text-xs sm:text-sm">
                  <div className="text-center"><div className="font-bold text-blue-600">{uni.internationalStudents}</div><div className="text-gray-600">International</div></div>
                  <div className="text-center"><div className="font-bold text-green-600">{uni.employmentRate}</div><div className="text-gray-600">Employment</div></div>
                  <div className="text-center"><div className="font-bold text-purple-600">{uni.totalStudents}</div><div className="text-gray-600">Students</div></div>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-1">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    POPULAR PROGRAMS
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {uni.programs.slice(0, 3).map((p, i) => (
                      <span key={i} className="text-xs sm:text-sm bg-white text-gray-700 px-2 py-1 rounded-lg border border-gray-200 hover:border-blue-300 hover:text-blue-700 transition-all">{p}</span>
                    ))}
                    {uni.programs.length > 3 && <span className="text-xs sm:text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-lg border border-blue-200">+{uni.programs.length - 3} more</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600 p-2 bg-gray-100 rounded-lg">
                  <div className="flex justify-between"><span className="font-medium">Founded:</span><span className="font-semibold">{uni.founded}</span></div>
                  <div className="flex justify-between"><span className="font-medium">Students:</span><span className="font-semibold">{uni.totalStudents}</span></div>
                  <div className="flex justify-between"><span className="font-medium">Scholarships:</span><span className="font-semibold text-green-600">{uni.scholarships}</span></div>
                  <div className="flex justify-between"><span className="font-medium">Ratio:</span><span className="font-semibold text-blue-600">{uni.studentFacultyRatio}</span></div>
                </div>
              </div>

              <div className="w-full lg:w-40 p-4 flex flex-row lg:flex-col justify-center gap-3 bg-gray-50 lg:bg-white border-t lg:border-t-0 lg:border-l border-gray-200">
                <Link to={`/university/${encodeURIComponent(uni.name)}`} className="flex-1 lg:flex-none bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-blue-700 text-center shadow-sm hover:shadow-md">View Details</Link>
                <Link to={`/universities/${encodeURIComponent(uni.country)}`} className="w-10 lg:w-auto h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-700 border border-gray-200 hover:border-blue-300" title="All in this country">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 text-sm">
            <div className="text-gray-600">Page {currentPage} of {totalPages}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">Previous</button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const n = totalPages <= 5 ? i + 1 : currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i;
                  return <button key={n} onClick={() => setCurrentPage(n)} className={`w-8 h-8 rounded-lg font-medium transition-all ${currentPage === n ? "bg-blue-600 text-white" : "border border-gray-300 hover:bg-gray-50 text-gray-700"}`}>{n}</button>;
                })}
              </div>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">Next</button>
            </div>
          </div>
        )}

        {filteredUniversities.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">No universities found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">Try adjusting your search or filters.</p>
            <button onClick={clearAllFilters} className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 text-sm">Clear Filters</button>
          </div>
        )}

        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 bg-white text-blue-700 border border-blue-300 py-2 px-6 rounded-lg font-semibold hover:bg-blue-50 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AllUniversities;