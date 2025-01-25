import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [biodataCount, setBiodataCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [premiumCount, setPremiumCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch biodata data
        const biodataResponse = await axios.get(`${import.meta.env.VITE_API_URL}/allBioData`);
        const biodata = biodataResponse.data;

        // Total biodata count
        setBiodataCount(biodata.length);

        // Male and female count
        setMaleCount(biodata.filter((item) => item.BiodataType === "Male").length);
        setFemaleCount(biodata.filter((item) => item.BiodataType === "Female").length);

        // Premium biodata count
        setPremiumCount(biodata.filter((item) => item.role === "premium").length);

        // Fetch checkouts data to calculate revenue
        const checkoutsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/checkouts`);
        const checkouts = checkoutsResponse.data;

        // Total revenue calculation from purchasedContacts in checkouts data
        const totalRevenue = checkouts.reduce((sum, checkout) => sum + (checkout.purchasedContacts || 0), 0);
        setRevenue(totalRevenue);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to fetch dashboard data.");
      }
    };

    fetchData();
  }, []);

  const chartData = [
    { name: "Total Biodata", count: biodataCount },
    { name: "Male Biodata", count: maleCount },
    { name: "Female Biodata", count: femaleCount },
    { name: "Premium Biodata", count: premiumCount },
  ];

  const chartDataRevenue = [
    { name: "Total Revenue", revenue: revenue },
  ];

  return (
    <div className="p-6 bg-rose-50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-center text-rose-700 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold text-rose-600">Total Biodata</h2>
          <p className="text-2xl text-rose-700">{biodataCount}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold text-rose-600">Male Biodata</h2>
          <p className="text-2xl text-rose-700">{maleCount}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold text-rose-600">Female Biodata</h2>
          <p className="text-2xl text-rose-700">{femaleCount}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold text-rose-600">Premium Biodata</h2>
          <p className="text-2xl text-rose-700">{premiumCount}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold text-rose-600">Total Revenue</h2>
          <p className="text-2xl text-rose-700">₹{revenue}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center text-rose-700 mb-4">Biodata Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Chart */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center text-rose-700 mb-4">Revenue Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartDataRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
