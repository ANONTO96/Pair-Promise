import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ApprovedContactRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch contact requests
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/pendingCheckouts`);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching contact requests:", error);
        toast.error("Failed to fetch contact requests.");
      }
    };
    fetchData();
  }, []);

  const handleApproveRequest = async (requestId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/checkouts/${requestId}`, {
        status: "approved",
      });
      toast.success("Contact request approved successfully!");
  
      // Remove the approved request from the list
      setRequests(requests.filter(request => request._id !== requestId));
    } catch (error) {
      console.error("Error approving contact request:", error);
      toast.error("Failed to approve contact request.");
    }
  };
  

  return (
    <div className="p-6 bg-rose-50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-center text-rose-700 mb-6">Approved Contact Requests</h1>
      {requests.length === 0 ? (
        <p className="text-center text-rose-500">No contact requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse bg-white shadow-lg">
            <thead className="bg-rose-200">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Biodata Id</th>
                <th className="border px-4 py-2">Approved Contact Request</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(request => (
                <tr key={request._id} className="hover:bg-rose-100">
                  <td className="border px-4 py-2">{request.name}</td>
                  <td className="border px-4 py-2">{request.email}</td>
                  <td className="border px-4 py-2">{request.biodataId}</td>
                  <td className="border px-4 py-2 text-center">
                  <button
                        className="px-4 py-2 bg-rose-500 text-white rounded shadow hover:bg-rose-600"
                        onClick={() => handleApproveRequest(request._id)}
                      >
                        Approve
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedContactRequest;
