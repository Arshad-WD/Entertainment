import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email_id: "",
    number: "",
    Password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const tempErrors = {};
    const { Name, Email_id, Password, number } = formData;

    if (!Name.trim()) tempErrors.Name = "Name can't be blank";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!Email_id.trim()) {
      tempErrors.Email_id = "Email can't be blank";
    } else if (!emailRegex.test(Email_id)) {
      tempErrors.Email_id = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{9,}$/;
    if (!number.trim()) {
      tempErrors.number = "Phone number can't be blank";
    } else if (!phoneRegex.test(number)) {
      tempErrors.number = "Invalid phone number";
    }

    if (!Password) {
      tempErrors.Password = "Password can't be blank";
    } else if (Password.length < 6) {
      tempErrors.Password = "Password must be at least 6 characters";
    }

    return tempErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const formValidation = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          window.location.href = "http://localhost:5173";
          
        } else {
          alert(data.error || "Something went wrong!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to submit form!");
      }

      setIsSubmitting(false);
    } else {
      setErrors(validationErrors);
    }
  };


  return (
    <div className="bg-signimg flex justify-center items-start h-screen bg-cover bg-center align-middle mt-0">
      <div className="bg-white/20 backdrop-blur-sm p-10 rounded-lg shadow-md w-[30rem] mt-4 h-[40rem] border-[0.5px] animate-fade-in">
        <form onSubmit={formValidation} className="flex flex-col items-center">
          <h1 className="text-5xl mb-6 text-white">DETAILS</h1>

          <div className="relative w-full mb-6">
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              required
              className={`w-full bg-transparent border-b-2 py-2 text-white transition-all duration-300 peer ${errors.Name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-white`}
            />
            <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${formData.Name ? "-translate-y-5 text-white" : "translate-y-0 text-gray-400"}`}>
              Enter Name
            </label>
            {errors.Name && <p className="text-red-500 text-sm">{errors.Name}</p>}
          </div>

          <div className="relative w-full mb-6">
            <input
              type="email"
              name="Email_id"
              value={formData.Email_id}
              onChange={handleInputChange}
              required
              className={`w-full bg-transparent border-b-2 py-2 text-white transition-all duration-300 peer ${errors.Email_id ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-white`}
            />
            <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${formData.Email_id ? "-translate-y-5 text-white" : "translate-y-0 text-gray-400"}`}>
              Enter Email
            </label>
            {errors.Email_id && <p className="text-red-500 text-sm">{errors.Email_id}</p>}
          </div>

          <div className="relative w-full mb-6">
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              required
              className={`w-full bg-transparent border-b-2 py-2 text-white transition-all duration-300 peer ${errors.number ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-white`}
            />
            <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${formData.number ? "-translate-y-5 text-white" : "translate-y-0 text-gray-400"}`}>
              Enter Phone Number
            </label>
            {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
          </div>

          <div className="relative w-full mb-6">
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
              required
              className={`w-full bg-transparent border-b-2 py-2 text-white transition-all duration-300 peer ${errors.Password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-white`}
            />
            <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${formData.Password ? "-translate-y-5 text-white" : "translate-y-0 text-gray-400"}`}>
              Enter Password
            </label>
            {errors.Password && <p className="text-red-500 text-sm">{errors.Password}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white/20 border-2 border-white mt-10 py-2 px-6 rounded-full text-white hover:bg-white/40 transition-all duration-300"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
