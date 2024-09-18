import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email_id: "",
    number: "",
    Password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formValidation = (e) => {
    e.preventDefault();
    const { Name, Email_id, Password, number } = formData;

    if (!Name) {
      alert("Name can't be blank");
    } else if (Password.length < 6) {
      alert("Password can't be less than 6 digits");
    } else if (number.length < 9) {
      alert("Invalid Number");
    } else {
      alert("Form submitted successfully!");
    }
  };

  return (
    <>
      <div className="bg-signimg flex justify-center items-start h-screen bg-cover bg-center align-middle mt-0">
        {/* Animated Form Container */}
        <div className="bg-white/20 backdrop-blur-sm p-10 rounded-lg shadow-md w-[30rem] mt-4 h-[40rem] border-[0.5px] animate-fade-in">
          <form onSubmit={formValidation} className="flex flex-col items-center">
            <h1 className="text-5xl mb-6 text-white">DETAILS</h1>

            {/* Name Input with Floating Label */}
            <div className="relative w-full mb-6">
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-white py-2 text-white transition-all duration-300 peer"
              />
              <label
                className={`absolute left-0 text-white transition-all duration-300 pointer-events-none ${
                  formData.Name || document.activeElement.name === 'Name'
                    ? '-translate-y-5 text-white'
                    : 'translate-y-0 text-gray-400'
                }`}
              >
                Enter Name
              </label>
            </div>

            {/* Email Input with Floating Label */}
            <div className="relative w-full mb-6">
              <input
                type="email"
                name="Email_id"
                value={formData.Email_id}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-white py-2 text-white transition-all duration-300 peer"
              />
              <label
                className={`absolute left-0 text-white transition-all duration-300 pointer-events-none ${
                  formData.Email_id || document.activeElement.name === 'Email_id'
                    ? '-translate-y-5 text-white'
                    : 'translate-y-0 text-gray-400'
                }`}
              >
                Enter Email
              </label>
            </div>

            {/* Phone Number Input with Floating Label */}
            <div className="relative w-full mb-6">
              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-white py-2 text-white transition-all duration-300 peer"
              />
              <label
                className={`absolute left-0 text-white transition-all duration-300 pointer-events-none ${
                  formData.number || document.activeElement.name === 'number'
                    ? '-translate-y-5 text-white'
                    : 'translate-y-0 text-gray-400'
                }`}
              >
                Enter Phone Number
              </label>
            </div>

            {/* Password Input with Floating Label */}
            <div className="relative w-full mb-6">
              <input
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-white py-2 text-white transition-all duration-300 peer"
              />
              <label
                className={`absolute left-0 text-white transition-all duration-300 pointer-events-none ${
                  formData.Password || document.activeElement.name === 'Password'
                    ? '-translate-y-5 text-white'
                    : 'translate-y-0 text-gray-400'
                }`}
              >
                Enter Password
              </label>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between text-xl items-center w-full text-white mt-7 mb-4">
              <label>
                <input type="checkbox" id="remember" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-white text-xl hover:text-gray-400 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-white/20 border-2 border-white mt-10 py-2 px-6 rounded-full text-white hover:bg-white/40 transition-all duration-300"
            >
              Submit
            </button>
          </form>

          {/* Register Section */}
          <div className="text-white mt-6 text-2xl">
            Don't have an account? <a href="#" className="underline hover:text-gray-400 transition-colors">Register</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
