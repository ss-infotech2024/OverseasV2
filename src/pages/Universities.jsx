// Universities.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { countries } from "../offeredCountries";

const Universities = () => {
  const { countryName } = useParams();
  const decoded = decodeURIComponent(countryName || "").trim();
  const country = countries.find(c => c.name.toLowerCase() === decoded.toLowerCase());

  if (!country) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Country Not Found</h1>
        <Link to="/" className="text-blue-600 underline">← Back to Home</Link>
      </div>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <img src={country.flag} alt="" className="w-20 h-12 mx-auto mb-4 rounded" />
          <h1 className="text-3xl font-bold">Universities in {country.name}</h1>
          <p className="text-gray-600 mt-2">{country.details}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {country.universities.map((uni, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-1">{uni.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{uni.location} • {uni.type}</p>
              <div className="text-xs space-y-1 mb-3">
                <div>Acceptance: <strong>{uni.acceptanceRate}</strong></div>
                <div>Int'l: <strong>{uni.internationalStudents}</strong></div>
              </div>
              <Link
                to={`/university/${encodeURIComponent(uni.name.trim())}`}
                className="block text-center bg-purple-600 text-white py-2 rounded hover:bg-purple-700 text-sm"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Universities;