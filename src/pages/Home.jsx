import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans relative overflow-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-pink-600 tracking-tight">VitaMatch</h1>
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/search">Search</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-24 py-16">
        {/* Image Section with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0"
        >
          <img
  src="/images/original-003adee00415551ad9ee08e8388ccee0.webp"
  alt="Blood Donation"
  className="max-w-md w-full drop-shadow-xl"
/>

        </motion.div>

        {/* Text Content with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Donate Blood, <br className="hidden md:block" /> Save Lives
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            VitaMatch connects heroes like you to those in need using smart AI matchmaking.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-pink-600 text-white px-6 py-3 rounded-full font-medium shadow hover:bg-pink-700 transition"
              >
                Register
              </motion.button>
            </Link>
            <Link to="/search">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-gray-100 text-pink-600 px-6 py-3 rounded-full font-medium border hover:bg-gray-200 transition"
              >
                Search Donors
              </motion.button>
            </Link>
            <Link to="https://minorbodms.streamlit.app/" target="_blank" rel="noopener noreferrer">
  <button className="bg-pink-500 text-white px-6 py-2 rounded-full">
    Check AI Matches
  </button>
</Link>

          </div>
        </motion.div>
      </div>

      {/* Gradient Background Wave */}
      <div className="absolute bottom-0 w-full z-[-1]">
        <svg viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#fce4ec"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,122.7C384,160,480,224,576,245.3C672,267,768,245,864,240C960,235,1056,245,1152,229.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Home;
