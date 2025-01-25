import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import Heading from '../components/shared/Heading';
import swiper1 from "../assets/cool-background.svg";
import swiper2 from "../assets/cool-background-s.png";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [marriages, setMarriages] = useState(0);
  const navigate = useNavigate();

  // Fetch Profiles and Success Stories from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/allBioData`);
        setProfiles(response.data);

        // Count male and female profiles based on BiodataType
        const maleProfiles = response.data.filter(profile => profile.BiodataType === 'Male');
        const femaleProfiles = response.data.filter(profile => profile.BiodataType === 'Female');
        setMaleCount(maleProfiles.length);
        setFemaleCount(femaleProfiles.length);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    const fetchSuccessStories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/successStories`);
        setSuccessStories(response.data);

        // Count successful marriages (Just use response.length)
        setMarriages(response.data.length);
      } catch (error) {
        console.error('Error fetching success stories:', error);
      }
    };

    fetchProfiles();
    fetchSuccessStories();
  }, []);

  return (
    <div className="space-y-10">
      <Helmet>
        <title>Pair Promise | Home</title>
      </Helmet>

      {/* Banner Section */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="w-full h-[500px] md:h-[600px] lg:h-[700px]"
      >
        <SwiperSlide>
          <div className="h-full bg-cover bg-center flex items-center justify-center text-white"
            style={{ backgroundImage: `url(${swiper1})` }}>
            <h1 className="text-4xl font-semibold">Welcome to Pair Promise</h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full bg-cover bg-center flex items-center justify-center text-white"
            style={{ backgroundImage: `url(${swiper2})` }}>
            <h1 className="text-4xl font-semibold">Find Your Perfect Match</h1>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* How it Works Section */}
      <section className="container mx-auto px-4 bg-gray-100">
        <Heading heading={"How It Works"} subHeading={"Discover how Pair Promise helps you find your perfect match"} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 border rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Step 1: Create Your Profile</h3>
            <p>Fill out your biodata, upload your photo, and add details about your preferences and interests.</p>
          </div>
          <div className="p-4 border rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Step 2: Browse Profiles</h3>
            <p>Explore other profiles that match your criteria and send connection requests to individuals you're interested in.</p>
          </div>
          <div className="p-4 border rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Step 3: Start the Journey</h3>
            <p>Once both parties accept, start the conversation, and let love bloom!</p>
          </div>
          <div className="p-4 border rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Step 4: Connect and Marry</h3>
            <p>After getting to know each other, take the leap and start your beautiful journey together as a couple!</p>
          </div>
        </div>
      </section>

      {/* Success Counter Section */}
      <section className="container mx-auto bg-gray-100">
        <Heading heading={"Our Success in Numbers"} subHeading={"See the impact we're making"} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-white border rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold">Total Male Profiles</h3>
            <p className="text-3xl text-pink-600">{maleCount}</p>
          </div>
          <div className="p-6 bg-white border rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold">Total Female Profiles</h3>
            <p className="text-3xl text-pink-600">{femaleCount}</p>
          </div>
          <div className="p-6 bg-white border rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold">Successful Marriages</h3>
            <p className="text-3xl text-pink-600">{marriages}</p>
          </div>
        </div>
      </section>

      {/* Premium Member Profiles (Showing Only 6) */}
      <section className="container mx-auto px-4">
        <Heading heading={'Our Premium Members'} subHeading={"Discover handpicked profiles of individuals looking for their perfect match. Your soulmate might just be a click away!"} />
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Premium Members</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {profiles.slice(0, 6).map((profile) => (
            <div key={profile._id} className="border rounded-lg p-4 shadow-lg">
              <img
                src={profile.ProfileImage}
                alt="Profile"
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">Biodata ID: {profile._id}</h3>
              <p>Type: {profile.BiodataType}</p>
              <p>Division: {profile.PermanentDivision}</p>
              <p>Age: {profile.Age}</p>
              <p>Occupation: {profile.Occupation}</p>
              <button
                onClick={() => navigate(`/profile/${profile._id}`)}
                className="bg-pink-600 text-white rounded-lg px-4 py-2 mt-4"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* success stories */}
      <section className="container mx-auto py-10">
        <Heading heading={'"Our Success Stories"'} subHeading={"Celebrate the beautiful journeys of love and commitment from couples who found their happily ever after with us."} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {successStories.slice(0, 4).sort((a, b) => new Date(b.date) - new Date(a.date)) // Show only first 6 stories
            .map((story) => (
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
      </section>
    </div>
  );
};

export default Home;
