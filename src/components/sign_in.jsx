import React, { useState } from "react";
import { Link } from 'react-router-dom';

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

  return (<>
    <div className=" bg-signimg flex justify-center items-start h-screen bg-cover bg-center align-middle" >
      <Link to="/"> <h1 className='font-sans  flex justify-center font-bold size-18 text-2xl hover:text-3xl text-yellow-50'>LuxeVista</h1></Link>


      <div className="bg-white/20 backdrop-blur-sm p-10  rounded-lg shadow-md w-[30rem] mt-20 h-[40rem] border-[0.5px]">
        <form onSubmit={formValidation} className="flex flex-col items-center">
          <h1 className="text-5xl mb-6 text-white">DETAILS</h1>
          <div className="relative w-full mb-4">
            <input
              type="text"
              name="Name"
              placeholder="Enter Name"
              value={formData.Name}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-white py-2 text-white placeholder-transparent"
            />
            <label className="absolute top-1/2 left-0 text-white transform -translate-y-8 transition-all duration-150 pointer-events-none text-base ">
              Enter Name
            </label>

          </div>

          <div className="relative w-full mb-4">
            <input
              type="email"
              name="Email_id"
              value={formData.Email_id}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-white py-2 text-white placeholder-transparent"
            />
            <label className="absolute top-1/2 transform -translate-y-8  left-0 text-white transition-all">Enter Email</label>
          </div>

          <div className="relative w-full mb-4">
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-white py-2 text-white placeholder-transparent"
            />
            <label className="absolute top-1/2 transform -translate-y-8  left-0 text-white transition-all">Enter Phone Number</label>
          </div>

          <div className="relative w-full mb-4">
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-white py-2 text-white placeholder-transparent"
            />
            <label className="absolute top-1/2 transform -translate-y-8  left-0 text-white transition-all">Enter Password</label>
          </div>

          <div className="flex justify-between text-xl items-center w-full text-white  mt-7 mb-4">
            <label>
              <input type="checkbox" id="remember" className="mr-2 " />
              Remember me
            </label>
            <a href="#" className="text-white text-xl">Forgot password?</a>
          </div>

          <button type="submit" className="bg-white/20 border-2 border-white mt-10 py-2 px-6 rounded-full text-white hover:bg-white/40 hover:scale-105 transition-all">
            Submit
          </button>
        </form>
        <h1>  <div className="text-white mt-10 text-2xl">
          Don't have an account? <a href="#" className="underline">Register</a>
        </div></h1>

      </div>
    </div></>

  );
};

export default Form;
