import React, { useEffect, useState } from "react";

const TopNav = ({ config }) => {
  const [savedConfig, setSavedConfig] = useState(config);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load the config from localStorage on initial mount
  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("config"));
    if (savedConfig) {
      setSavedConfig(savedConfig);
    }
  }, []);

  const { logo, useCases, cta } = savedConfig;

  return (
    <div className="w-full bg-white ">
      <div className="container max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img src={logo} alt="Logo" className="w-auto h-12 sm:h-14 md:h-16 lg:h-20" />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-9">
          <nav className="flex space-x-4 lg:space-x-9">
            {useCases.map((useCase, index) => (
              <a
                key={index}
                href={`#usecase${index + 1}`}
                className="text-gray-600 hover:text-gray-900 font-medium text-xs sm:text-sm lg:text-base"
              >
                {useCase}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href={cta.link}
            className="text-black px-3 py-2 sm:px-4 sm:py-2.5 rounded-3xl shadow hover:bg-black hover:text-white transition border border-black text-xs sm:text-sm lg:text-base"
          >
            {cta.text}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Responsive Navigation Menu for Small Screens */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-gray-100 border-t">
          <nav className="flex flex-col space-y-2">
            {useCases.map((useCase, index) => (
              <a
                key={index}
                href={`#usecase${index + 1}`}
                className="text-gray-600 hover:text-gray-900 font-medium text-sm"
              >
                {useCase}
              </a>
            ))}
          </nav>
          <a
            href={cta.link}
            className="block text-center text-black px-3 py-2 mt-4 rounded-3xl shadow hover:bg-black hover:text-white transition border border-black text-sm"
          >
            {cta.text}
          </a>
        </div>
      )}
    </div>
  );
};

export default TopNav;
