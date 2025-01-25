import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const UpdateBioData = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [BioData, setBioData] = useState({
    Name: '',
    AboutMe: '',
    BiodataType: '',
    ProfileImage: '',
    PermanentDivision: '',
    Age: '',
    Occupation: '',
    Height: '',
    Weight: '',
    Race: '',
    FathersName: '',
    MothersName: '',
    PresentDivision: '',
    ExpectedPartnerAge: '',
    ExpectedPartnerHeight: '',
    ExpectedPartnerWeight: '',
    ContactEmail: user?.email || '',
    MobileNumber: '',
  });

  const divisions = ['Dhaka', 'Chattagram', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet'];
  const heightOptions = ['4ft', '4ft 5in', '5ft', '5ft 5in', '6ft', '6ft 5in', '7ft'];
  const weightOptions = ['50kg', '55kg', '60kg', '65kg', '70kg', '75kg', '80kg', '85kg', '90kg', '95kg', '100kg+'];
  const occupations = ['Student', 'Engineer', 'Doctor', 'Business', 'Teacher', 'Other'];
  const races = ['Fair', 'Medium', 'Dark'];

  useEffect(() => {
    const fetchBioData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/myBioData/${user.email}`);
        if (data) {
          setBioData(data);
        } else {
          toast.error('No biodata found for this user!');
        }
      } catch (error) {
        toast.error('Failed to fetch biodata!');
      }
    };
  
    if (user?.email) {
      fetchBioData();
    }
  }, [user?.email]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBioData({ ...BioData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!BioData.MobileNumber) {
      toast.error('Mobile Number is required!');
      return;
    }

    // Exclude `_id` from the BioData
  const { _id, ...dataToSubmit } = BioData;

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/updateBioData/${user.email}`, dataToSubmit);
      toast.success('Biodata updated successfully!');
      navigate(`/myBioData/${user.email}`);
    } catch (error) {
      toast.error('Failed to update biodata!');
    }
  };

  return (
    <div className="container mx-auto px-4 text-pink-700 py-20">
      <Helmet>
        <title>Pair Promise | Update BioData</title>
      </Helmet>
      <h1 className="text-4xl font-semibold text-center mb-8">-- Update Your Biodata --</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="Name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={BioData.Name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* About Me */}
        <div>
          <label htmlFor="AboutMe" className="block text-gray-700 font-medium mb-2">
            About Me
          </label>
          <textarea
            id="AboutMe"
            name="AboutMe"
            value={BioData.AboutMe}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Biodata Type */}
        <div>
          <label htmlFor="BiodataType" className="block text-gray-700 font-medium mb-2">
            Biodata Type
          </label>
          <select
            id="BiodataType"
            name="BiodataType"
            value={BioData.BiodataType}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Profile Image */}
        <div>
          <label htmlFor="ProfileImage" className="block text-gray-700 font-medium mb-2">
            Profile Image URL
          </label>
          <input
            type="text"
            id="ProfileImage"
            name="ProfileImage"
            value={BioData.ProfileImage}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Permanent Division */}
        <div>
          <label htmlFor="PermanentDivision" className="block text-gray-700 font-medium mb-2">
            Permanent Division
          </label>
          <select
            id="PermanentDivision"
            name="PermanentDivision"
            value={BioData.PermanentDivision}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Division</option>
            {divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>

        {/* Present Division */}
        <div>
          <label htmlFor="PresentDivision" className="block text-gray-700 font-medium mb-2">
            Present Division
          </label>
          <select
            id="PresentDivision"
            name="PresentDivision"
            value={BioData.PresentDivision}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Division</option>
            {divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>

        {/* Age */}
        <div>
          <label htmlFor="Age" className="block text-gray-700 font-medium mb-2">
            Age
          </label>
          <input
            type="number"
            id="Age"
            name="Age"
            value={BioData.Age}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Occupation */}
        <div>
          <label htmlFor="Occupation" className="block text-gray-700 font-medium mb-2">
            Occupation
          </label>
          <select
            id="Occupation"
            name="Occupation"
            value={BioData.Occupation}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Occupation</option>
            {occupations.map((occupation) => (
              <option key={occupation} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </div>

        {/* Height */}
        <div>
          <label htmlFor="Height" className="block text-gray-700 font-medium mb-2">
            Height
          </label>
          <select
            id="Height"
            name="Height"
            value={BioData.Height}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Height</option>
            {heightOptions.map((height) => (
              <option key={height} value={height}>
                {height}
              </option>
            ))}
          </select>
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="Weight" className="block text-gray-700 font-medium mb-2">
            Weight
          </label>
          <select
            id="Weight"
            name="Weight"
            value={BioData.Weight}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Weight</option>
            {weightOptions.map((weight) => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            ))}
          </select>
        </div>

        {/* Race */}
        <div>
          <label htmlFor="Race" className="block text-gray-700 font-medium mb-2">
            Race
          </label>
          <select
            id="Race"
            name="Race"
            value={BioData.Race}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Race</option>
            {races.map((race) => (
              <option key={race} value={race}>
                {race}
              </option>
            ))}
          </select>
        </div>

        {/* Father's Name */}
        <div>
          <label htmlFor="FathersName" className="block text-gray-700 font-medium mb-2">
            Father's Name
          </label>
          <input
            type="text"
            id="FathersName"
            name="FathersName"
            value={BioData.FathersName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Mother's Name */}
        <div>
          <label htmlFor="MothersName" className="block text-gray-700 font-medium mb-2">
            Mother's Name
          </label>
          <input
            type="text"
            id="MothersName"
            name="MothersName"
            value={BioData.MothersName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Expected Partner Age */}
        <div>
          <label htmlFor="ExpectedPartnerAge" className="block text-gray-700 font-medium mb-2">
            Expected Partner Age
          </label>
          <input
            type="number"
            id="ExpectedPartnerAge"
            name="ExpectedPartnerAge"
            value={BioData.ExpectedPartnerAge}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Expected Partner Height */}
        <div>
          <label htmlFor="ExpectedPartnerHeight" className="block text-gray-700 font-medium mb-2">
            Expected Partner Height
          </label>
          <select
            id="ExpectedPartnerHeight"
            name="ExpectedPartnerHeight"
            value={BioData.ExpectedPartnerHeight}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Height</option>
            {heightOptions.map((height) => (
              <option key={height} value={height}>
                {height}
              </option>
            ))}
          </select>
        </div>

        {/* Expected Partner Weight */}
        <div>
          <label htmlFor="ExpectedPartnerWeight" className="block text-gray-700 font-medium mb-2">
            Expected Partner Weight
          </label>
          <select
            id="ExpectedPartnerWeight"
            name="ExpectedPartnerWeight"
            value={BioData.ExpectedPartnerWeight}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Weight</option>
            {weightOptions.map((weight) => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            ))}
          </select>
        </div>

        {/* Contact Email */}
        <div>
          <label htmlFor="ContactEmail" className="block text-gray-700 font-medium mb-2">
            Contact Email
          </label>
          <input
            type="email"
            id="ContactEmail"
            name="ContactEmail"
            value={BioData.ContactEmail}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="MobileNumber" className="block text-gray-700 font-medium mb-2">
            Mobile Number
          </label>
          <input
            type="text"
            id="MobileNumber"
            name="MobileNumber"
            value={BioData.MobileNumber}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-pink-700 transition duration-300"
          >
            Save and Update Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBioData;
