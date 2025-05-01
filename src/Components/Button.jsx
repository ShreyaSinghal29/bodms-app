import React from "react";

const Button = ({ text, onClick, loading = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Processing..." : text}
    </button>
  );
};

export default Button;