import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';


const CheckOut = () => {
  const { id } = useParams();
  const { user, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      biodataId: id,
      name: user?.displayName,
      email: user?.email,
      status: 'pending',
      purchasedContacts: 5
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/contactReq`, data);
      toast.success('Request successful!');
      navigate(`/myContactReq/${user.email}`)
    } catch (error) {
      toast.error('An error occurred. Please try again.', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl w-[300px] mx-auto rounded-2xl bg-gradient-to-r from-rose-300 to-rose-500 text-white font-semibold text-center mb-6">-- Checkout --</h1>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">

        {/* Form */}
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {/* Biodata ID */}
          <div>
            <label htmlFor="biodataId" className="block text-gray-700 font-medium mb-2">
              Biodata ID
            </label>
            <input
              type="text"
              id="biodataId"
              value={id}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-700"
            />
          </div>

          {/* User Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={user?.email || ''}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-700"
            />
          </div>

          {/* Stripe Card Number */}
          <div>
            <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
              Card Number
            </label>
            <input
              type="number"
              id="cardNumber"
              required
              placeholder="4242 4242 4242 4242"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-300 to-rose-500 text-white py-3 px-6 rounded-lg text-lg font-medium hover:from-rose-400 hover:to-rose-600 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay $5 and Request Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
