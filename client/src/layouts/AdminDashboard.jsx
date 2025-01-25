import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-gradient-to-b from-rose-100 to-rose-300 shadow-lg border-r border-rose-200">
                <div className="text-center py-4">
                    <h2 className="text-2xl font-bold text-rose-600">Pair Promise</h2>
                    <p className="text-sm text-rose-500">Admin Panel</p>
                </div>
                <ul className="menu px-4 space-y-2">
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
                                    isActive
                                        ? "bg-rose-400 text-white"
                                        : "text-rose-600 hover:bg-rose-200 hover:text-rose-700"
                                }`
                            }
                            to="/admin/manageUsers"
                        >
                            <img
                                className="w-6 h-6"
                                src="https://img.icons8.com/?size=100&id=7odR6nBarM9M&format=png&color=000000"
                                alt=""
                            />
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
                                    isActive
                                        ? "bg-rose-400 text-white"
                                        : "text-rose-600 hover:bg-rose-200 hover:text-rose-700"
                                }`
                            }
                            to="/admin/approvedPremium"
                        >
                            <img
                                className="w-6 h-6"
                                src="https://img.icons8.com/?size=100&id=mH0e2xyMRsgV&format=png&color=000000"
                                alt=""
                            />
                            Approved Premium
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
                                    isActive
                                        ? "bg-rose-400 text-white"
                                        : "text-rose-600 hover:bg-rose-200 hover:text-rose-700"
                                }`
                            }
                            to="/admin/approvedContactRequest"
                        >
                            <img
                                className="w-6 h-6"
                                src="https://img.icons8.com/?size=100&id=53305&format=png&color=000000"
                                alt=""
                            />
                            Approved Contact Request
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
                                    isActive
                                        ? "bg-rose-400 text-white"
                                        : "text-rose-600 hover:bg-rose-200 hover:text-rose-700"
                                }`
                            }
                            to="/admin/dashboard"
                        >
                            <img
                                className="w-6 h-6"
                                src="https://img.icons8.com/?size=100&id=52234&format=png&color=000000"
                                alt=""
                            />
                            Admin Dashboard
                        </NavLink>
                    </li>
                    <div className="divider border-rose-200"></div>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded-lg transition-colors duration-300 ${
                                    isActive
                                        ? "bg-rose-400 text-white"
                                        : "text-rose-600 hover:bg-rose-200 hover:text-rose-700"
                                }`
                            }
                            to="/"
                        >
                            <img
                                className="w-6 h-6"
                                src="https://img.icons8.com/?size=100&id=TZ2lKyH3LVjx&format=png&color=000000"
                                alt=""
                            />
                            Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Content */}
            <div className="flex-1 bg-rose-50">
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-rose-600 mb-4">Welcome to the Admin Panel</h1>
                    <p className="text-rose-500">
                        Manage the platform efficiently with the tools provided below.
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-md mx-6 my-4 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
