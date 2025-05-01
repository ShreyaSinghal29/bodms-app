import React from "react";
import Header from "./Header";
import Input from "./Input";
import Button from "./Button";

const BloodDonationApp = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <Header />
      <Input label="Name" placeholder="Enter your name" />
      <Input label="Blood Group" placeholder="Enter your blood group" />
      <Input label="Contact Number" placeholder="Enter your contact" />
      <Button text="Register as Donor" />
    </div>
  );
};

export default BloodDonationApp;
