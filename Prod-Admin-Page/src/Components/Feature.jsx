
import { motion } from "framer-motion";

const Feature = ({ featureConfig }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          {featureConfig.heading.title}{" "}
          <span className="text-blue-500">{featureConfig.heading.subtitle}</span>
        </h1>
        <p className="text-gray-600 mt-2">{featureConfig.heading.description}</p>
      </div>

      {/* Feature Sections */}
      {featureConfig.features.map((feature, index) => (
        <div
          key={feature.id}
          className={`flex flex-col md:flex-row ${
            feature.isImageLeft ? "" : "md:flex-row-reverse"
          } items-center mb-12`}
        >
          {/* Image Section with Motion */}
          <motion.div
            initial={{ x: feature.isImageLeft ? -250 : 250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2, // Slow down the animation to 2 seconds
              type: "spring",
              stiffness: 40, // Even gentler spring for smooth animation
              damping: 20, // Smooth out the motion with more damping
            }}
            className="md:w-1/2"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-auto rounded-lg"
            />
          </motion.div>

          {/* Content Section with Motion */}
          <motion.div
            initial={{ x: feature.isImageLeft ? -250 : 250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2, // Slow down the animation to 2 seconds
              type: "spring",
              stiffness: 40, // Even gentler spring for smooth animation
              damping: 20, // Smooth out the motion with more damping
            }}
            className="md:w-1/2 md:pl-8 text-center md:text-left"
          >
            <h2 className="text-2xl font-bold">
              {feature.title}{" "}
              <span className="text-orange-400">{feature.subtitle}</span>
            </h2>
            <p className="text-gray-600 mt-4">{feature.content}</p>

            {/* Button with Continuous Jump Animation */}
            <motion.button
              animate={{
                y: [0, -6, 0], // Slightly reduced the vertical movement
              }}
              transition={{
                repeat: Infinity, // Repeat animation infinitely
                repeatType: "loop", // Loop the animation
                duration: 3, // Slow the bounce to 3 seconds for a relaxed effect
                ease: "easeInOut", // Smooth easing for bounce
              }}
              className="mt-4 px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-700 transition"
            >
              {feature.buttonText}
            </motion.button>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default Feature;
