import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";

const MyContactReq = () => {
  const { user, setLoading } = useContext(AuthContext);
  const [contactRequests, setContactRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchContactRequests();
    }
  }, [user?.email]);

  const fetchContactRequests = async () => {
    try {
      // Fetch the list of contact requests
      const { data: requestList } = await axios.get(
        `${import.meta.env.VITE_API_URL}/contactReq/${user?.email}`
      );

      // Fetch biodata details for each request using BiodataId
      const biodataDetails = await Promise.all(
        requestList.map(async (request) => {
          try {
            const { data } = await axios.get(
              `${import.meta.env.VITE_API_URL}/profile/${request.biodataId}`
            );
            return {
              ...request,
              ...data[0], // Merge biodata details with the request
            };
          } catch (error) {
            console.error(
              `Failed to fetch biodata for ID: ${request.biodataId}`,
              error
            );
            return { ...request, Name: "Error fetching details" }; // Gracefully handle errors
          }
        })
      );

      setContactRequests(biodataDetails);
    } catch (error) {
      toast.error("Error fetching contact requests.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (requestId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/contactReq/${requestId}`);
      toast.success("Contact request deleted successfully.");
      setContactRequests(contactRequests.filter((req) => req._id !== requestId));
    } catch (error) {
      toast.error("Error deleting contact request.");
      console.error(error);
    }
  };

  if (contactRequests.length === 0) {
    return <div className="text-center py-20 text-gray-600">You have no contact requests yet.</div>;
  }

  return (
    <div className="md:w-[90%] lg:w-[75%] mx-auto px-4 py-20">
      <Helmet>
        <title>Pair Promise | My Contact Requests</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center text-pink-700 mb-8">-- My Contact Requests --</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-pink-600 text-white h-14">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Biodata ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Mobile No</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contactRequests.map((request, index) => (
              <tr
                key={request._id}
                className={index % 2 === 0 ? "bg-pink-50" : "bg-white"}
              >
                <td className="border px-4 py-2">{request.Name || "N/A"}</td>
                <td className="border px-4 py-2">{request._id}</td>
                <td className="border px-4 py-2">
  <div
    className={`flex items-center justify-center px-2 py-1 rounded-full ${
      request.status === "approved"
        ? "bg-green-100 text-green-600"
        : "bg-yellow-100 text-yellow-600"
    }`}
  >
    {/* Icon for Mobile Number */}
    {request.status === "approved" ? (
      <>
        <svg
          className="w-5 h-5 mr-2 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        /> 
        </svg>
        <span className="whitespace-nowrap">{request.status}</span>
      </>
    ) : (
      <span className="flex
      gap-2"> <img className="w-5 h-5" src="https://img.icons8.com/?size=100&id=11324&format=png&color=D97706" alt="" />{request.status}</span>
    )}
  </div>
</td>

<td className="border px-4 py-2">
  <div
    className={`flex items-center justify-center px-2 py-1 rounded-full ${
      request.status === "approved"
        ? "bg-green-100 text-green-600"
        : "bg-yellow-100 text-yellow-600"
    }`}
  >
    {/* Icon for Mobile Number */}
    {request.status === "approved" ? (
      <>
        <svg
          className="w-5 h-5 mr-2 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3l18 18M14.121 14.121l4.242 4.243m-1.414-4.242L9.88 4.88C8.988 3.988 7.515 3.988 6.622 4.88l-2.121 2.121c-.901.902-.901 2.357 0 3.258L8.707 14.707c.901.901 2.357.901 3.258 0l6.37-6.37c.901-.902.901-2.357 0-3.258l-2.121-2.121c-.901-.902-2.356-.902-3.258 0L14.121 14.121z"
          />
        </svg>
        <span className="whitespace-nowrap">{request.MobileNumber || "N/A"}</span>
      </>
    ) : (
      <span className="flex
      gap-2"> <img className="w-5 h-5" src="https://img.icons8.com/?size=100&id=11324&format=png&color=D97706" alt="" />Pending</span>
    )}
  </div>
</td>

<td className="border px-4 py-2">
  <div
    className={`flex items-center justify-center px-2 py-1 rounded-full ${
      request.status === "approved"
        ? "bg-green-100 text-green-600"
        : "bg-yellow-100 text-yellow-600"
    }`}
  >
    {/* Icon for Contact Email */}
    {request.status === "approved" ? (
      <>
        <svg
          className="w-5 h-5 mr-2 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12l-18 0m18 0l-3-3m3 3l-3 3"
          />
        </svg>
        <span className="whitespace-nowrap">{request.ContactEmail || "N/A"}</span>
      </>
    ) : (
      <span className="flex
      gap-2"> <img className="w-5 h-5" src="https://img.icons8.com/?size=100&id=11324&format=png&color=D97706" alt="" />Pending</span>
    )}
  </div>
</td>

                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactReq;
