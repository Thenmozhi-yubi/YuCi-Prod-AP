import React from 'react';

const Cta = ({ ctaConfig }) => {
  const { heading, content, button, image } = ctaConfig;

  return (
    <div className="container mx-auto px-4 p-8 max-w-4xl relative z-10"> {/* Reduced width using max-w-4xl */}
      <div className="flex flex-col lg:flex-row items-center justify-between bg-primary text-white p-8 rounded-lg shadow-md">
        {/* Left Side */}
        <div className="lg:w-1/2 text-center lg:text-left mb-6 lg:mb-0">
          {/* Heading */}
          <h2 className="text-3xl font-bold mb-4">{heading}</h2>
          {/* Content */}
          <p className="mb-6">{content}</p>
          {/* Button */}
          <a
            href={button.link}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            {button.text}
          </a>
        </div>
        {/* Right Side */}
        <div className="lg:w-1/2">
          <img
            src={image}
            alt="CTA Illustration"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Cta;
