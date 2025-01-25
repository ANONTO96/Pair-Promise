import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const GotMarried = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    selfBiodataId: '',
    partnerBiodataId: '',
    date: '',
    coupleImage: '',
    story: '',
    stars: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/successStories`,
        formData
      );

      if (response.status === 201) {
        toast.success('Your success story has been submitted!');
        setFormData({
          selfBiodataId: '',
          partnerBiodataId: '',
          date: '',
          coupleImage: '',
          story: '',
          stars: 0,
        });
        navigate('/allSuccessStories')
      } else {
        toast.error('There was an error submitting your story. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-28 p-6 bg-rose-100 shadow-md rounded-md">
      <h2 className="text-3xl font-semibold text-rose-700 mb-4">Share Your Success Story</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="selfBiodataId" className="block text-rose-700">Your Biodata ID</label>
          <input
            type="text"
            id="selfBiodataId"
            name="selfBiodataId"
            value={formData.selfBiodataId}
            onChange={handleChange}
            required
            className="w-full p-2 border border-rose-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div>
          <label htmlFor="partnerBiodataId" className="block text-rose-700">Partner's Biodata ID</label>
          <input
            type="text"
            id="partnerBiodataId"
            name="partnerBiodataId"
            value={formData.partnerBiodataId}
            onChange={handleChange}
            required
            className="w-full p-2 border border-rose-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-rose-700">Marriage Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-rose-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div>
          <label htmlFor="coupleImage" className="block text-rose-700">Couple Image URL</label>
          <input
            type="text"
            id="coupleImage"
            name="coupleImage"
            value={formData.coupleImage}
            onChange={handleChange}
            required
            placeholder="Enter the image URL"
            className="w-full p-2 border border-rose-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div>
          <label htmlFor="story" className="block text-rose-700">Success Story Review</label>
          <textarea
            id="story"
            name="story"
            value={formData.story}
            onChange={handleChange}
            rows="5"
            required
            className="w-full p-2 border border-rose-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Share your feelings about using this website..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="stars" className="block text-rose-700">Rate Your Experience (out of 5)</label>
          <input
            type="number"
            id="stars"
            name="stars"
            value={formData.stars}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            required
            className="w-full p-2 border border-rose-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-rose-500 text-white py-2 px-4 rounded hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default GotMarried;
