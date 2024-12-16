import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const Hero = ({
  title,
  subtitle,
  bgImage,
  buttonText,
}) => {
  const [storedHeroConfig, setStoredHeroConfig] = useState(null);

  useEffect(() => {
    const savedHeroConfig = JSON.parse(localStorage.getItem("heroConfig"));
    if (savedHeroConfig) {
      setStoredHeroConfig(savedHeroConfig);
    } else {
      setStoredHeroConfig({
        title,
        subtitle,
        bgImage,
        buttonText,
      });
    }
  }, [title, subtitle, bgImage, buttonText]);

  return (
    <div className="flex flex-wrap items-center justify-between py-16 px-4 bg-custom-gradient">
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {storedHeroConfig?.title || title}
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl mb-6">
              {storedHeroConfig?.subtitle || subtitle}
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="relative px-6 py-2 text-xs sm:text-sm lg:text-base rounded-md text-white bg-secondary "
              disabled={false}
            >
              {/* Button Content */}
              <motion.div
                className="relative flex items-center justify-center"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px", // Initial gap between arrow and text
                  // overflow: "hidden",
                }}
                whileHover={{
                  gap: "30px", // Adjust gap for both arrow and text on hover
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
              >
                {/* Arrow and Text */}
                <motion.div
                  className="flex items-center gap-2" // This groups the text and arrow together
                  initial={{ x: 0 }}
                  whileHover={{
                    x: 100, // Moves arrow and text together to the right
                    transition: { duration: 0.5, ease: "easeInOut" },
                  }}
                >
                  {/* Arrow */}
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 90 }} // Arrow moves right on hover
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <FaArrowRight className="bg-primary p-2 text-white rounded-full text-3xl" />
                  </motion.span>

                  {/* Text */}
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: -130 }} // Text moves left on hover
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {storedHeroConfig?.buttonText || buttonText}
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.button>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2">
            <img
              src={storedHeroConfig?.bgImage || bgImage}
              alt="Hero"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
