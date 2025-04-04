import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [role, setRole] = useState(null);

    // Fetch user role
    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.email) {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_API_URL}/users/${user.email}`
                    );
                    setRole(response.data.role);
                } catch (error) {
                    console.error("Failed to fetch user role:", error);
                }
            }
        };
        fetchUserRole();
    }, [user]);

    const adminDashboard = (
        <>
        <li>
                <Link
                    className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 border rounded-full bg-rose-100"
                    to="/admin/dashboard"
                >
                    Admin Dashboard
                </Link>
            </li>
            <li>
                <Link
                    className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 border rounded-full bg-rose-100"
                    to="/admin/manageUsers"
                >
                    Manage Users
                </Link>
            </li>
            <li>
                <Link
                    className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 border rounded-full bg-rose-100"
                    to="/admin/approvedPremium"
                >
                    Approved Premium
                </Link>
            </li>
            <li>
                <Link
                    className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 border rounded-full bg-rose-100"
                    to="/admin/approvedContactRequest"
                >
                    Approved Contact Request
                </Link>
            </li>
        </>
    );

    const userDashboard = (
        <>
            <li>
                <Link
                    className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 border rounded-full bg-rose-100"
                    to={`/addMyBioData/${user?.email}`}
                >
                    Add My BioData
                </Link>
            </li>
            <li>
                <Link
                    className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 border rounded-full bg-rose-100"
                    to={`/myBioData/${user?.email}`}
                >
                    My BioData
                </Link>
            </li>
            <li>
                <Link
                    className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 border rounded-full bg-rose-100"
                    to={`/myFavorites/${user?.email}`}
                >
                    My Favorites BioData
                </Link>
            </li>
            <li>
                <Link
                    className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 border rounded-full bg-rose-100"
                    to={`/myContactReq/${user?.email}`}
                >
                    My Contact Request
                </Link>
            </li>
            <li>
                <Link
                    className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 border rounded-full bg-rose-100"
                    to={`/gotMarried/${user?.email}`}
                >
                    Got Married
                </Link>
            </li>
        </>
    );

    const navOptions = (
        <>
            <li className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 rounded-lg">
                <Link to="/">Home</Link>
            </li>
            <li className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 rounded-lg">
                <Link to="/bioData">All Bio Data</Link>
            </li>
            <li className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 rounded-lg">
                <Link to="/allSuccessStories">All Success Stories</Link>
            </li>
            <li className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 rounded-lg">
                <Link to="/aboutUs">About Us</Link>
            </li>
            <li className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 rounded-lg">
                <Link to="/contactUs">Contact Us</Link>
            </li>
            {user && (
                <li>
                    <details>
                        <summary className="cursor-pointer text-rose-500 hover:text-rose-600 hover:font-semibold">{
                            role === "admin" ? 'Admin Panel' : 'Dashboard'}
                        </summary>
                        <ul className="p-2 w-[200px]">
                            {role === "admin" ? adminDashboard : userDashboard}
                        </ul>
                    </details>
                </li>
            )}
        </>
    );

    return (
        <div className="navbar fixed z-10 bg-gradient-to-r from-rose-100 to-rose-300 shadow-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <button
                        tabIndex={0}
                        className="btn bg-transparent border-0 hover:bg-rose-200 lg:hidden text-rose-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </button>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white rounded-box shadow-lg border border-rose-100 mt-3 w-60 p-2"
                    >
                        {navOptions}
                    </ul>
                </div>
                <Link
                    to="/"
                    className="text-2xl font-bold text-rose-600 px-2 hover:text-rose-700 hover:bg-rose-200 hover:rounded-2xl flex items-center"
                >
                    <img
                        className="w-12"
                        src="https://img.icons8.com/?size=100&id=49205&format=png&color=B23A48"
                        alt=""
                    />
                    Pair Promise
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-rose-600 font-semibold">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end space-x-2">
                {!user && (
                    <>
                        <Link
                            to="/login"
                            className="btn bg-rose-500 text-white border-rose-600 hover:bg-rose-600"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/register"
                            className="btn bg-rose-500 text-white border-rose-600 hover:bg-rose-600"
                        >
                            Register
                        </Link>
                    </>
                )}
                {user && (
                    <div className="dropdown dropdown-end">
                        <button
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div
                                title={user?.displayName}
                                className="w-10 rounded-full ring ring-rose-400"
                            >
                                <img
                                    referrerPolicy="no-referrer"
                                    alt="User Profile Photo"
                                    src={user?.photoURL}
                                />
                            </div>
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 shadow bg-white rounded-box w-52"
                        >
                            <li>
                                <details>
                                    <summary className="cursor-pointer text-rose-500 hover:text-rose-600 hover:font-semibold">
                                    {
                            role === "admin" ? 'Admin Panel' : 'Dashboard'}
                                    </summary>
                                    <ul className="p-2">
                                        {role === "admin"
                                            ? adminDashboard
                                            : userDashboard}
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <button
                                    onClick={logOut}
                                    className="text-rose-500 hover:text-rose-600 hover:font-semibold hover:bg-rose-200 border rounded-full bg-rose-100"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
