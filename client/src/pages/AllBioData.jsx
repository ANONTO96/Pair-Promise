import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Heading from "../components/shared/Heading";
import axios from 'axios';

const AllBioData = () => {
    const [profiles, setProfiles] = useState([]);
    const [sortedProfiles, setSortedProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const profilesPerPage = 12; // Profiles per page

    const [sortOrder, setSortOrder] = useState('ascending');
    const [selectedDivision, setSelectedDivision] = useState('All');
    const [selectedGender, setSelectedGender] = useState('All');

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

                // Count male and female profiles
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
                setMarriages(response.data.length);
            } catch (error) {
                console.error('Error fetching success stories:', error);
            }
        };

        fetchProfiles();
        fetchSuccessStories();
    }, []);

    // Filter and Sort Profiles
    useEffect(() => {
        let filtered = profiles;

        // Filter by Gender
        if (selectedGender !== 'All') {
            filtered = filtered.filter(profile => profile.BiodataType === selectedGender);
        }

        // Filter by Division
        if (selectedDivision !== 'All') {
            filtered = filtered.filter(profile => profile.PermanentDivision === selectedDivision);
        }

        // Sort by Age
        const sorted = [...filtered].sort((a, b) => {
            const ageA = Number(a.Age);
            const ageB = Number(b.Age);
            return sortOrder === 'ascending' ? ageA - ageB : ageB - ageA;
        });

        setSortedProfiles(sorted);
        setCurrentPage(1); // Reset to first page when filters or sorting change
    }, [profiles, sortOrder, selectedDivision, selectedGender]);

    // Calculate Pagination
    const totalPages = Math.ceil(sortedProfiles.length / profilesPerPage);
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = sortedProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

    return (
        <div className="pt-6">
            <Helmet>
                <title>Pair Promise | BioData</title>
            </Helmet>

            {/* Success Counter Section */}
            <section className="w-[80%] lg:w-[60%] mx-auto bg-gray-100">
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

            {/* All Member Profiles */}
            <section className="w-[90%] md:w-[85%] mx-auto px-4">
                <Heading
                    heading={'Our Honorable Members'}
                    subHeading={
                        "Discover handpicked profiles of individuals looking for their perfect match. Your soulmate might just be a click away"
                    }
                />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    {/* Heading */}
                    <h2 className="text-2xl font-bold text-center sm:text-left">Our Members: {profiles.length}</h2>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
                        {/* Gender Filter */}
                        <select
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2"
                        >
                            <option value="All">All Genders</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        {/* Division Filter */}
                        <select
                            value={selectedDivision}
                            onChange={(e) => setSelectedDivision(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2"
                        >
                            <option value="All">All Divisions</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattagram">Chattagram</option>
                            <option value="Rajshahi">Rajshahi</option>
                            <option value="Sylhet">Sylhet</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Mymensingh">Mymensingh</option>
                        </select>

                        {/* Sort Order by Age */}
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2"
                        >
                            <option value="ascending">Sort by Age: Ascending</option>
                            <option value="descending">Sort by Age: Descending</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {currentProfiles.map((profile) => (
                        <div key={profile._id} className="border rounded-lg p-4 shadow-lg">
                            <img
                                src={profile.ProfileImage}
                                alt="Profile"
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-bold">Biodata ID: <br /> {profile._id}</h3>
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

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                    <div className="btn-group">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="btn"
                        >
                            «
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`btn ${currentPage === index + 1 ? "btn-active" : ""}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="btn"
                        >
                            »
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AllBioData;
