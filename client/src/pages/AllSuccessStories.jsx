import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import Heading from '../components/shared/Heading';

const AllSuccessStories = () => {
  const [successStories, setSuccessStories] = useState([]);

  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/successStories`);
        setSuccessStories(response.data);
      } catch (error) {
        console.error('Error fetching success stories:', error);
      }
    };

    fetchSuccessStories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <Heading heading={"All Success Stories"} subHeading={"Explore all the beautiful stories of love and commitment."} />

      {/* Success Marriage Count */}
      <div className="text-center my-6">
        <h2 className="text-2xl font-semibold">
          Total Successful Marriages: <span className="text-pink-600">{successStories.length}</span>
        </h2>
      </div>

      {/* Success Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {successStories.sort((a, b) => new Date(b.date) - new Date(a.date)).map((story) => (
          <div key={story._id} className="p-4 border rounded-lg shadow-lg">
            <img
              src={story.coupleImage}
              alt="Couple"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold">Marriage Date: {story.date}</h3>
            <p className="flex items-center">
              {Array.from({ length: story.stars }).map((_, idx) => (
                <FaStar key={idx} className="text-yellow-500" />
              ))}
            </p>
            <p>{story.story}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSuccessStories;
