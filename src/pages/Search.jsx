import React, { useState, useEffect } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { motion } from "framer-motion";

const Search = () => {
  const [criteria, setCriteria] = useState({
    bloodGroup: "",
    location: "",
  });

  const [donors, setDonors] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donors");
        const data = await res.json();
        setDonors(data);
      } catch (err) {
        console.error("Error fetching donors:", err);
      }
    };

    fetchDonors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = donors.filter(
      (donor) =>
        donor.bloodType.toLowerCase() === criteria.bloodGroup.toLowerCase() &&
        donor.location?.city?.toLowerCase() === criteria.location.toLowerCase()
    );
    setResults(filtered);
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
        Search for Donors
      </h2>

      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Blood Group</label>
          <Input
            placeholder="e.g. A+, O-"
            value={criteria.bloodGroup}
            onChange={(e) => setCriteria({ ...criteria, bloodGroup: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Location</label>
          <Input
            placeholder="e.g. Delhi"
            value={criteria.location}
            onChange={(e) => setCriteria({ ...criteria, location: e.target.value })}
          />
        </div>

        <div className="text-center">
          <Button text="Search Donors" />
        </div>
      </form>

      <div className="mt-8">
        {results.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Matching Donors</h3>
            {results.map((donor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm"
              >
                <p><span className="font-semibold">Name:</span> {donor.name}</p>
                <p><span className="font-semibold">Blood Group:</span> {donor.bloodType}</p>
                <p><span className="font-semibold">Location:</span> {donor.location.city}</p>
                <p><span className="font-semibold">Contact:</span> {donor.contact}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">No results to display.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
