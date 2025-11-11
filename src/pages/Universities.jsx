// Universities.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { countries } from "../offeredCountries";

const Universities = () => {
  const { countryName } = useParams();
  const decoded = decodeURIComponent(countryName || "").trim();
  const country = countries.find(
    (c) => c.name.toLowerCase() === decoded.toLowerCase()
  );

  if (!country) {
    return (
      <div className="text-center py-20 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Country Not Found</h1>
          <p className="text-gray-600 mb-6">"{decoded}" is not available.</p>
          <Link
            to="/"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <img
              src={country.flag}
              alt={`${country.name} Flag`}
              className="w-20 h-14 object-cover rounded-lg shadow-md border-2 border-white"
            />
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{country.name}</h1>
              <p className="text-sm text-gray-500">{country.capital} • {country.language}</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-3">{country.details}</p>
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
              {country.topRanked} Top Ranked
            </span>
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
              {country.students} Students
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
              {country.programsCount} Programs
            </span>
          </div>
        </div>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {country.universities.map((uni, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white p-4">
                <h3 className="font-bold text-lg line-clamp-1">{uni.name}</h3>
                <p className="text-xs opacity-90">{uni.location}</p>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-800">{uni.type}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">QS Rank</span>
                  <span className="font-bold text-purple-600">#{uni.rank}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Founded</span>
                  <span className="font-medium text-gray-700">{uni.founded}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Students</span>
                  <span className="font-medium text-blue-600">{uni.totalStudents}</span>
                </div>

                {/* Acceptance Badge */}
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Acceptance</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${parseInt(uni.acceptanceRate) <= 20
                        ? "bg-red-100 text-red-700"
                        : parseInt(uni.acceptanceRate) <= 35
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                  >
                    {uni.acceptanceRate}
                  </span>
                </div>

                {/* Popular Program */}
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Top Program</p>
                  <p className="font-semibold text-sm text-purple-700 line-clamp-1">
                    {uni.popularPrograms.split(", ")[0]}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="px-5 pb-5">
                <Link
                  to={`/university/${encodeURIComponent(uni.name.trim())}`}
                  className="block text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Universities;