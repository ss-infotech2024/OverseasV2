import React from "react";
import { Globe, BookOpen, UserCheck, Calendar } from "react-feather";

const AbroadStudyFeatures = () => {
  const features = [
    {
      icon: Globe,
      title: "Global University Network",
      desc: "Access top universities worldwide and expand your academic horizons.",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Course Selection",
      desc: "Choose from a vast range of programs tailored to your career goals.",
    },
    {
      icon: UserCheck,
      title: "Expert Admission Guidance",
      desc: "Get personalized support from experts to simplify your application process.",
    },
    {
      icon: Calendar,
      title: "Flexible Start Dates",
      desc: "Enroll in courses that fit your schedule with multiple intake periods.",
    },
  ];

  return (
    <div className="bg-purple-900 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 my-8 mx-2 sm:mx-4 md:mx-8 lg:mx-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-black ">
        {features.map(({ icon: Icon, title, desc }, index) => (
          <div
            key={index}
            className="group text-center p-4 sm:p-6 rounded-2xl bg-white shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-yellow-400 cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12  bg-yellow-400  rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ease-in-out group-hover:bg-white">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6text-gray-700 transition-colors duration-300 ease-in-out group-hover:text-black" />
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-800 transition-colors duration-300 ease-in-out group-hover:text-black">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-black">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbroadStudyFeatures;
