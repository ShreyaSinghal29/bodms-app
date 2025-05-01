import React, { useState } from "react";

const Input = ({ label, placeholder, type = "text", value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
};

export default Input;