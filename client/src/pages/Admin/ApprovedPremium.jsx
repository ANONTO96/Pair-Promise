import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovedPremium = () => {
  const [premiumUsers, setPremiumUsers] = useState([]);

  useEffect(() => {
    // Fetch all biodata
    const fetchPremiumUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/allBioData`);
        const premiumUsersData = response.data.filter(user => user.role === "premium");
        setPremiumUsers(premiumUsersData);
      } catch (error) {
        console.error("Error fetching premium users:", error);
      }
    };
    fetchPremiumUsers();
  }, []);

  return (
    <div className="p-6 bg-rose-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-rose-700 mb-6">Our Premium Users</h1>
      {premiumUsers.length === 0 ? (
        <p className="text-center text-rose-500">No approved premium users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse bg-white shadow-lg">
            <thead className="bg-rose-200">
              <tr>
                <th className="border px-4 py-2">User Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Division</th>
                <th className="border px-4 py-2">Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {premiumUsers.map(user => (
                <tr key={user._id} className="hover:bg-rose-100">
                  <td className="border px-4 py-2">{user.Name}</td>
                  <td className="border px-4 py-2">{user.ContactEmail}</td>
                  <td className="border px-4 py-2">{user.PresentDivision}</td>
                  <td className="border px-4 py-2">{user.MobileNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedPremium;
