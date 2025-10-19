import React from 'react';
import videoSrc from '../assets/worldicon.mp4';

const VideoHero = () => {
  return (
    <section className="relative w-full bg-white  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <video
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[50vh] object-cover rounded-lg"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          poster="https://via.placeholder.com/1280x720?text=Loading+Video"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default VideoHero;
