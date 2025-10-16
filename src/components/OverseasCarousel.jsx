import React from "react";

const slides = [
  {
    image: "/images/overseas1.jpg",
    title: "Study in the UK",
    description: "Get expert guidance for world-class education opportunities in the United Kingdom.",
  },
  {
    image: "/images/overseas2.jpg",
    title: "Explore Australia",
    description: "Achieve your academic goals with top universities and a vibrant lifestyle.",
  },
  {
    image: "/images/overseas3.jpg",
    title: "Canada Awaits You",
    description: "Build your future with globally respected degrees and welcoming culture.",
  },
];

const OverseasCarousel = () => {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { image, title, description } = slides[current];

  return (
    <div className="relative w-full h-80 overflow-hidden rounded-xl shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-all duration-700"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center p-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm max-w-md">{description}</p>
      </div>
    </div>
  );
};

export default OverseasCarousel;
