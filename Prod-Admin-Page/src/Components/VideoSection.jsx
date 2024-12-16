import React from "react";
import PropTypes from "prop-types";

const VideoSection = ({ videoConfig }) => {
  const { heading = {}, videoSrc = "" } = videoConfig || {};

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">{heading.title || "Default Title"}</h1>
        <p className="text-gray-800 mt-2">{heading.description || "Default Description"}</p>
      </div>
      <div className="video-container w-full max-w-4xl mx-auto">
        <video controls className="w-full h-auto rounded-md shadow-lg">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

VideoSection.propTypes = {
  videoConfig: PropTypes.shape({
    heading: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    videoSrc: PropTypes.string,
  }),
};

export default VideoSection;
