import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const DonorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    donorId: "",
    contact: "",
    bloodType: "",
    organ: "",
    age: "",
    gender: "",
    locationCity: "",
    latitude: "",
    longitude: "",
    hlaType: "",
    urgencyLevel: "",
    recipientBloodType: "",
    recipientRh: "",
    recipientAge: "",
    recipientLat: "",
    recipientLon: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    switch (field) {
      case "name":
      case "donorId":
      case "locationCity":
        if (!value.trim()) return "This field is required.";
        break;
      case "contact":
        if (!/^\d{10}$/.test(value)) return "Enter a valid 10-digit number.";
        break;
      case "age":
        if (!value || value < 1) return "Enter a valid age.";
        break;
      case "latitude":
      case "longitude":
        if (!value) return "This field is required.";
        break;
      case "gender":
      case "bloodType":
        if (!value) return "Please select an option.";
        break;
      case "urgencyLevel":
        if (value && (value < 1 || value > 5)) return "Must be between 1 and 5.";
        break;
      default:
        return null;
    }
    return null;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: validateField(field, value) });
  };

  const validateForm = () => {
    const newErrors = {};
    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          donorId: formData.donorId,
          contact: formData.contact,
          bloodType: formData.bloodType,
          organ: formData.organ || null,
          age: Number(formData.age),
          gender: formData.gender,
          location: {
            city: formData.locationCity,
            coordinates: {
              lat: Number(formData.latitude),
              lng: Number(formData.longitude),
            },
          },
          hlaType: formData.hlaType || null,
          urgencyLevel: Number(formData.urgencyLevel) || null,
          recipient: {
            bloodType: formData.recipientBloodType,
            rh: formData.recipientRh,
            age: Number(formData.recipientAge),
            latitude: Number(formData.recipientLat),
            longitude: Number(formData.recipientLon),
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Donor registered successfully!");
      } else {
        alert("Failed to register donor.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Server error during registration.");
    }
  };

  const renderError = (field) =>
    errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>;

  const autofillLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
          }));
          setErrors((prev) => ({
            ...prev,
            latitude: null,
            longitude: null,
          }));
        },
        (err) => {
          alert("Location access denied.");
          console.error("Geolocation error:", err);
        }
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Donor Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input label="Donor ID" value={formData.donorId} onChange={handleChange("donorId")} />
            {renderError("donorId")}
          </div>
          <div>
            <Input label="Name" value={formData.name} onChange={handleChange("name")} />
            {renderError("name")}
          </div>
          <div>
            <Input
              label="Contact"
              type="tel"
              placeholder="10-digit number"
              value={formData.contact}
              onChange={handleChange("contact")}
            />
            {renderError("contact")}
          </div>
          <div>
            <Input label="Age" type="number" value={formData.age} onChange={handleChange("age")} />
            {renderError("age")}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={formData.gender}
              onChange={handleChange("gender")}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {renderError("gender")}
          </div>
        </div>

        {/* Medical Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Type</label>
            <select
              value={formData.bloodType}
              onChange={handleChange("bloodType")}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {renderError("bloodType")}
          </div>
          <div>
            <Input label="Organ (optional)" value={formData.organ} onChange={handleChange("organ")} />
          </div>
          <div>
            <Input label="HLA Type (optional)" value={formData.hlaType} onChange={handleChange("hlaType")} />
          </div>
          <div>
            <Input
              label="Urgency Level (1–5)"
              type="number"
              value={formData.urgencyLevel}
              onChange={handleChange("urgencyLevel")}
            />
            {renderError("urgencyLevel")}
          </div>
        </div>

        {/* Location Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input label="City" value={formData.locationCity} onChange={handleChange("locationCity")} />
            {renderError("locationCity")}
          </div>
          <div>
            <Input label="Latitude" type="number" value={formData.latitude} onChange={handleChange("latitude")} />
            {renderError("latitude")}
          </div>
          <div>
            <Input label="Longitude" type="number" value={formData.longitude} onChange={handleChange("longitude")} />
            {renderError("longitude")}
          </div>
        </div>
        <button
          type="button"
          onClick={autofillLocation}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          📍 Use My Location
        </button>

        <div className="pt-4">
          <Button text="Submit Donor Info" />
        </div>
      </form>
    </div>
  );
};

export default DonorForm;
