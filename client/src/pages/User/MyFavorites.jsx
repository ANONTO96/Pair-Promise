import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Helmet } from 'react-helmet-async';
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const MyFavorites = () => {
  const { user, setLoading } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchFavorites();
    }
  }, [user?.email]);

  const fetchFavorites = async () => {
    try {
      // Fetch the list of favorite biodata IDs
      const { data: favoriteList } = await axios.get(
        `${import.meta.env.VITE_API_URL}/myFavorites/${user?.email}`
      );

      // Map through the favorites and fetch details for each bioDataId
      const biodataDetails = await Promise.all(
        favoriteList.map(async (favorite) => {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/profile/${favorite.bioDataId}`
          );
          return data[0];
        })
      );

      setFavorites(biodataDetails);
    } catch (error) {
      toast.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  if (favorites.length === 0) {
    return <div className="text-center py-20 text-gray-600">You have no favorites yet.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-20">
       <Helmet>
        <title>Pair Promise | My Favorites</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center text-pink-700 mb-8">-- My Favorites --</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-pink-600 text-white">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Occupation</th>
              <th className="px-4 py-2">Permanent Division</th>
              <th className="px-4 py-2">Gender</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((biodata, index) => (
              <tr
                key={biodata._id}
                className={index % 2 === 0 ? "bg-pink-50" : "bg-white"}
              >
                <td className="border px-4 py-2">
                  <Link to={`/profile/${biodata._id}`}>
                  <img
                    src={biodata.ProfileImage || "https://via.placeholder.com/150"}
                    alt={biodata.Name}
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />
                  </Link>
                </td>
                <td className="border px-4 py-2">{biodata.Name}</td>
                <td className="border px-4 py-2">{biodata.Age}</td>
                <td className="border px-4 py-2">{biodata.Occupation}</td>
                <td className="border px-4 py-2">{biodata.PermanentDivision}</td>
                <td className="border px-4 py-2">
                  {biodata.BiodataType === "Male" ? "Male" : "Female"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavorites;
