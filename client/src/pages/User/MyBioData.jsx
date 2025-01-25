import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';
import { FaCrown } from 'react-icons/fa'; 

const MyBioData = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const { email } = useParams();
    const [biodata, setBiodata] = useState([]);

    useEffect(() => {
        fetchMyBioData();
    }, []);

    const fetchMyBioData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/myBioData/${email}`);
            setBiodata(data);
        } catch (error) {
            console.error("Error fetching biodata:", error);
        }
    };

    const handleMakePremium = async () => {
        if (biodata.role === 'premium') {
            Swal.fire({
                icon: 'info',
                title: 'Already Premium',
                text: 'Your account is already marked as premium.',
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "Once you request, your biodata will be sent for admin approval!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, make it premium!',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`${import.meta.env.VITE_API_URL}/updateRole/${biodata.ContactEmail}`, { role: 'pending' });
                    await fetchMyBioData();
                    Swal.fire(
                        'Request Sent!',
                        'Your biodata has been sent for admin approval.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error updating role:', error);
                    Swal.fire(
                        'Error!',
                        'There was an issue sending your request. Please try again later.',
                        'error'
                    );
                }
            }
        });
    };

    const {
        Name,
        AboutMe,
        BiodataType,
        ProfileImage,
        PermanentDivision,
        Age,
        Occupation,
        Height,
        Weight,
        Race,
        FathersName,
        MothersName,
        PresentDivision,
        ExpectedPartnerAge,
        ExpectedPartnerHeight,
        ExpectedPartnerWeight,
        ContactEmail,
        MobileNumber,
        role
    } = biodata;

    return (
        <div className="container mx-auto px-4 py-20 bg-pink-50">
            <Helmet>
                <title>Pair Promise | My BioData</title>
            </Helmet>
            <h1 className="text-4xl font-bold text-center text-pink-700 mb-8">-- My Biodata --</h1>

            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl">
                <img
                    src={ProfileImage || ""}
                    alt=""
                    className="w-40 h-40 object-cover rounded-full border-4 border-pink-600"
                />
                <div>
                <h2 className="text-3xl font-bold text-pink-700 flex items-center">
                        {Name} 
                        {role === 'premium' && <FaCrown className="w-5 mb-6 text-yellow-500" />} 
                    </h2>
                    <p className="text-lg text-gray-700">{BiodataType}</p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Age:</span> {Age}</p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Height:</span> {Height}</p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Weight:</span> {Weight}</p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Occupation:</span> {Occupation}</p>
                </div>
            </div>

            {/* About Me Section */}
            <section className="mt-10">
                <h3 className="text-2xl font-semibold text-pink-700 mb-4">About Me</h3>
                <p className="text-lg text-gray-700">{AboutMe || "No details provided"}</p>
            </section>

            {/* Family Information */}
            <section className="mt-10">
                <h3 className="text-2xl font-semibold text-pink-700 mb-4">Family Information</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                    <li><strong>Father's Name:</strong> {FathersName}</li>
                    <li><strong>Mother's Name:</strong> {MothersName}</li>
                    <li><strong>Permanent Division:</strong> {PermanentDivision}</li>
                    <li><strong>Present Division:</strong> {PresentDivision}</li>
                    <li><strong>Race:</strong> {Race}</li>
                </ul>
            </section>

            {/* Partner Preferences */}
            <section className="mt-10">
                <h3 className="text-2xl font-semibold text-pink-700 mb-4">Partner Preferences</h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                    <li><strong>Expected Age:</strong> {ExpectedPartnerAge} years</li>
                    <li><strong>Expected Height:</strong> {ExpectedPartnerHeight} cm</li>
                    <li><strong>Expected Weight:</strong> {ExpectedPartnerWeight} kg</li>
                </ul>
            </section>

            {/* Contact Information */}
            <section className="mt-10">
                <h3 className="text-2xl font-semibold text-pink-700 mb-4">Contact Information</h3>
                <p className="text-lg text-gray-700">
                    <strong>Email:</strong> {ContactEmail || "Not provided"}
                    <br />
                    <strong>Mobile:</strong> {MobileNumber || "Not provided"}
                </p>
            </section>

            {/* Update BioData Button */}
            <div className="mt-10 text-center">
                <button
                    onClick={() => navigate(`/updateBioData/${user.email}`)}
                    className="btn bg-pink-600 text-white hover:bg-pink-700 px-6 py-3 rounded-lg"
                >
                    Update Your BioData
                </button>
            </div>

            {/* Make BioData Premium Button */}
            {role !== 'premium' && (
                <div className="mt-4 text-center">
                    <button
                        onClick={handleMakePremium}
                        className={`btn ${role === 'pending' ? 'bg-gray-600' : 'bg-pink-600'} text-white hover:bg-pink-700 px-6 py-3 rounded-lg`}
                        disabled={role === 'pending'}
                    >
                        {role === 'pending' ? 'Pending Approval' : 'Make Biodata to Premium'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyBioData;
