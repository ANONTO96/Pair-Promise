import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [bioData, setBioData] = useState([]);
  const [similarBiodata, setSimilarBiodata] = useState([]);
  const [userRole, setUserRole] = useState(""); // State to hold user role

  useEffect(() => {
    fetchBioData();
    fetchUserRole(); // Fetch user role on component mount
  }, [id]);

  const fetchBioData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/profile/${id}`);
      setBioData(data);
      fetchSimilarBiodata(data[0]?.BiodataType); // Fetch similar biodata
    } catch (error) {
      console.error('Error fetching biodata:', error);
    }
  };

  const fetchUserRole = async () => {
    try {
      // Fetch the role of the current user
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/myBioData/${user?.email}`);
      setUserRole(data.role); // Set the user's role in state
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const fetchSimilarBiodata = async (gender) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/allBioData`);
      // Filter biodata based on gender and exclude the current profile by ID
      const filteredBiodata = data
        .filter((profile) => profile.BiodataType === gender && profile._id !== id)
        .slice(0, 3);
      setSimilarBiodata(filteredBiodata);
    } catch (error) {
      console.error('Error fetching similar biodata:', error);
    }
  };

  const handleAddToFavourites = async (id) => {
    try {
      const { data: existingFavorites } = await axios.get(
        `${import.meta.env.VITE_API_URL}/myFavorites/${user?.email}`
      );

      const isAlreadyFavorite = existingFavorites.some(
        (favorite) => favorite.bioDataId === id
      );

      if (isAlreadyFavorite) {
        toast.error("This profile is already in your favorites!");
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/favorites`, {
        bioDataId: id,
        email: user.email,
      });
      toast.success("Added to favorites!");
    } catch (error) {
      toast.error("Error adding to favorites: " + error.message);
    }
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${id}`);
  };

  const { Name, AboutMe, BiodataType, ProfileImage, PermanentDivision, Age, Occupation, MobileNumber, ContactEmail } = bioData[0] || {};

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-semibold text-center mb-8 mt-12">--- Profile Details ---</h1>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <Helmet>
          <title>Pair Promise | Profile</title>
        </Helmet>
        <img
          src={ProfileImage || ''}
          alt="Profile"
          className="w-72 h-72 object-contain rounded-full border-4 border-pink-700"
        />
        <div>
          <h2 className="text-3xl font-bold">{Name}</h2>
          <p className="text-lg text-gray-600">{BiodataType}</p>
          <p className="text-lg text-gray-600">Age: {Age}</p>
          <p className="text-lg text-gray-600">Occupation: {Occupation}</p>
          <p className="text-lg text-gray-600">Division: {PermanentDivision}</p>
        </div>
      </div>

      {/* About Me Section */}
      <section className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">About Me</h3>
        <p className="text-lg text-gray-700">{AboutMe || 'No information provided'}</p>
      </section>

      {/* Contact Section */}
      <section className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
        {user.email === bioData[0]?.ContactEmail ? (
          <p className="text-lg text-red-600">You cannot request contact information for your own profile.</p>
        ) : userRole === 'premium' ? ( // Use fetched role here
          <p className="text-lg text-gray-700">
            Email: {ContactEmail}<br />
            Phone: {MobileNumber}
          </p>
        ) : (
          <button
            onClick={() => handleRequestContact()}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Request Contact Information
          </button>
        )}
      </section>

      {/* Add to Favourites */}
      <div className="mt-6">
        {user.email === bioData[0]?.ContactEmail ? (
          <p className="text-lg text-red-600">You cannot add your own profile to favourites.</p>
        ) : (
          <button
            onClick={async () => await handleAddToFavourites(id)}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
          >
            Add to Favourites
          </button>
        )}
      </div>

      {/* Similar Biodata */}
      <section className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Similar Biodata</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {similarBiodata.map((profile) => (
            <Link to={`/profile/${profile._id}`}
              key={profile._id}
              className="p-4 border-2 rounded-xl shadow-xl hover:shadow-2xl transition"
              onClick={() => navigate(`/profile/${profile._id}`)}
            >
              <img
                src={profile.ProfileImage || 'https://via.placeholder.com/150'}
                alt="Similar Profile"
                className="w-32 h-32 mx-auto object-cover border-2 border-pink-600 rounded-full"
              />
              <h4 className="text-lg font-bold text-center mt-4">{profile.Name}</h4>
              <p className="text-center text-sm text-gray-600">{profile.BiodataType}</p>
              <p className="text-center text-sm text-gray-600">{profile.PermanentDivision}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Go Back */}
      <div className="mt-10 text-center">
        <button
          onClick={() => window.history.back()}
          className="bg-pink-600 text-white py-2 px-6 rounded-lg hover:bg-pink-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Profile;
