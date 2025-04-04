import { Helmet } from 'react-helmet-async';

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      <Helmet>
        <title>Pair Promise | About Us</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-700">-- About Us --</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to <span className="font-bold text-pink-600">Pair Promise</span>, your trusted platform for finding 
          meaningful connections and life partners. We are dedicated to helping individuals across the globe 
          find their perfect match through a user-friendly, secure, and reliable online experience.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          At <span className="font-bold text-pink-600">Pair Promise</span>, we believe in the power of love and commitment. 
          Our mission is to create a safe, respectful, and inclusive environment where people from diverse 
          backgrounds can connect, communicate, and build lasting relationships.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700 space-y-3">
          <li>Extensive database of verified profiles.</li>
          <li>Advanced matchmaking algorithms to find the best matches.</li>
          <li>Secure and confidential communication channels.</li>
          <li>Dedicated customer support to assist you at every step.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          We are guided by values of trust, transparency, and respect. Our platform is built to uphold 
          these principles while providing a seamless and delightful user experience.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Whether you are looking for a soulmate or a companion for life's journey, <span className="font-bold text-pink-600">Pair Promise </span> 
          is here to make your search easier and more enjoyable. Join us today and take the first step toward your happily ever after!
        </p>
      </section>

      <div className="text-center mt-10">
        <button
          onClick={() => window.location.href = '/register'}
          className="bg-pink-600 text-white py-3 px-8 rounded-lg hover:bg-pink-700 text-lg"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
