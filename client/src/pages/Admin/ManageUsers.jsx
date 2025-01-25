import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users data.");
      }
    };
    fetchUsers();
  }, []);

  // Fetch members data
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/allBioData`);
        const pendingMembers = response.data.filter(member => member.role === "pending");
        setMembers(pendingMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
        toast.error("Failed to fetch members data.");
      }
    };
    fetchMembers();
  }, []);

  const handleMakeAdmin = async (userId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/updateRoleAdmin/${userId}`, {
        role: "admin",
      });
      toast.success("User promoted to Admin successfully!");
      setUsers(
        users.map(user =>
          user._id === userId ? { ...user, role: "admin" } : user
        )
      );
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role.");
    }
  };

  const handleMakePremium = async (memberId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/updateRolePremium/${memberId}`, {
        role: "premium",
      });
      toast.success("Member promoted to Premium successfully!");
      setMembers(
        members.map(member =>
          member._id === memberId ? { ...member, role: "premium" } : member
        )
      );
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role.");
    }
  };

  return (
    <div className="p-6 bg-rose-50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Users Section */}
      <h1 className="text-3xl font-bold text-center text-rose-700 mb-6">Manage Users</h1>
      {users.length === 0 ? (
        <p className="text-center text-rose-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto mb-8">
          <table className="table-auto w-full border-collapse bg-white shadow-lg">
            <thead className="bg-rose-200">
              <tr>
                <th className="border px-4 py-2">User Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="hover:bg-rose-100">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2 text-center">
                    {user.role === "admin" ? (
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded shadow cursor-not-allowed"
                        disabled
                      >
                        Admin
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 bg-rose-500 text-white rounded shadow hover:bg-rose-600"
                        onClick={() => handleMakeAdmin(user._id)}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Members Section */}
      <h1 className="text-3xl font-bold text-center text-rose-700 mb-6">Pending Premium Member Requests</h1>
      {members.length === 0 ? (
        <p className="text-center text-rose-500">No pending member requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse bg-white shadow-lg">
            <thead className="bg-rose-200">
              <tr>
                <th className="border px-4 py-2">Member Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Make Premium</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member._id} className="hover:bg-rose-100">
                  <td className="border px-4 py-2">{member.Name}</td>
                  <td className="border px-4 py-2">{member.ContactEmail}</td>
                  <td className="border px-4 py-2 text-center">
                    {member.role === "premium" ? (
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded shadow cursor-not-allowed"
                        disabled
                      >
                        Premium Approved
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 bg-rose-500 text-white rounded shadow hover:bg-rose-600"
                        onClick={() => handleMakePremium(member._id)}
                      >
                        Make Premium
                      </button>
                    )}
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

export default ManageUsers;
