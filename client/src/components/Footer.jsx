import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-rose-100 to-rose-300 text-rose-700 py-10 mt-10">
            <div className="container mx-auto px-4 lg:px-20">
                <div className="flex flex-col justify-center md:items-center gap-6">
                    {/* About Section */}
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-rose-900">About Pair Promise</h2>
                        <p className="mt-2 text-sm">
                            Pair Promise is dedicated to connecting hearts and creating meaningful bonds.
                            Discover your perfect partner and embark on a journey of love and trust.
                        </p>
                    </div>

                    <div className="md:flex md:gap-20 lg:gap-60">
                        {/* Quick Links */}
                    <div className="mt-3">
                        <h2 className="text-lg font-semibold text-rose-900">Quick Links</h2>
                        <ul className="mt-2 space-y-2 text-sm pl-2">
                            <li>
                                <Link to="/" className="hover:text-rose-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/bioData" className="hover:text-rose-500">
                                    All Bio Data
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-rose-500">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-rose-500">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-3">
                        <h2 className="text-lg font-semibold text-rose-900">Contact Us</h2>
                        <ul className="mt-2 text-sm space-y-2 pl-2">
                            <li>Email: <a href="mailto:info@pairpromise.com" className="hover:text-rose-500">info@pairpromise.com</a></li>
                            <li>Phone: <a href="tel:+123456789" className="hover:text-rose-500">+1 234 567 89</a></li>
                            <li>Address: 123 Love Lane, Rose City</li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div className="my-3">
                        <h2 className="text-lg font-semibold text-rose-900">Follow Us</h2>
                        <div className="flex mt-3 space-x-4">
                           <img className="w-8 h-8" src="https://img.icons8.com/?size=100&id=9foSA61V9037&format=png&color=FA5252" alt="" />
                           <img className="w-8 h-8" src="https://img.icons8.com/?size=100&id=447&format=png&color=FA5252" alt="" />
                           <img className="w-8 h-8" src="https://img.icons8.com/?size=100&id=6Fsj3rv2DCmG&format=png&color=FA5252" alt="" />
                        </div>
                    </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-rose-300 mt-6 pt-6 text-center">
                    <p className="text-sm text-rose-600">
                        © {new Date().getFullYear()} Pair Promise. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
