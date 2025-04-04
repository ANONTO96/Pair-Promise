import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Helmet } from 'react-helmet-async';
import bg from '../assets/hand-in-hand.png'

const ContactUs = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="container mx-auto px-4 py-20 bg-pink-50">
            <Helmet>
                <title>Pair Promise | Contact Us</title>
            </Helmet>
            <h1 className="text-4xl font-bold text-center text-pink-700 mb-8">-- Contact Us --</h1>
            <p className="text-lg text-gray-700 text-center mb-8">
                We're here to help you on your journey to finding your perfect match. Feel free to reach out to us!
            </p>

            <div className="grid max-w-4xl mx-auto grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Contact Information */}
                <div>
                    <h2 className="text-2xl font-semibold text-pink-700 mb-4">Get in Touch</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Have questions or need assistance? Contact us through any of the following channels:
                    </p>
                    <ul className="space-y-4 text-lg text-gray-700">
                        <li>
                            <span className="font-bold text-pink-700">Email:</span> support@pairpromise.com
                        </li>
                        <li>
                            <span className="font-bold text-pink-700">Phone:</span> +1-800-123-4567
                        </li>
                        <li>
                            <span className="font-bold text-pink-700">Address:</span> 123 Rosy Lane, Love City, LC 12345
                        </li>
                    </ul>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-6 rounded-lg shadow-md"
                    style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    <h2 className="text-2xl font-semibold text-pink-700 mb-4">Send Us a Message</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                            <input
                                type="text"
                                value={user?.displayName || ''}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Enter your name"
                                required
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Enter your email"
                                required
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Message</label>
                            <textarea
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                rows="5"
                                placeholder="Type your message here"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* Additional Information */}
            <div className="mt-10 text-center">
                <h2 className="text-2xl font-semibold text-pink-700 mb-4">Follow Us</h2>
                <p className="text-lg text-gray-700 mb-4">
                    Stay connected with us on social media for updates, tips, and success stories.
                </p>
                <div className="flex justify-center space-x-6">
                    <a href=""><img className="w-8 h-8" src="https://img.icons8.com/?size=100&id=9foSA61V9037&format=png&color=FA5272" alt="" /></a>
                    <a href=""><img className="w-8 h-8" src="https://img.icons8.com/?size=100&id=447&format=png&color=FA5272" alt="" /></a>
                    <a href=""><img className="w-8 h-8" src="https://img.icons8.com/?size=100&id=6Fsj3rv2DCmG&format=png&color=FA5272" alt="" /></a>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
