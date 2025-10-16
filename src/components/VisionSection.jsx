import { ShieldCheck, Star, HeartHandshake, UsersRound, Target } from "lucide-react";

const values = [
  {
    title: "Integrity",
    description: "We act honestly and uphold strong moral principles.",
    icon: <ShieldCheck className="w-6 h-6 text-purple-700" />,
  },
  {
    title: "Excellence",
    description: "We strive for the highest quality in everything we do.",
    icon: <Star className="w-6 h-6 text-purple-700" />,
  },
  {
    title: "Commitment",
    description: "We dedicate ourselves fully to our students’ success.",
    icon: <HeartHandshake className="w-6 h-6 text-purple-700" />,
  },
  {
    title: "Respect",
    description: "We value diversity and treat everyone with dignity.",
    icon: <UsersRound className="w-6 h-6 text-purple-700" />,
  },
  {
    title: "Responsibility",
    description: "We are accountable for our guidance and support.",
    icon: <Target className="w-6 h-6 text-purple-700" />,
  },
];

const VisionMission = () => (
  <>
    {/* Vision & Mission */}
    <section className="px-6 py-24 bg-gradient-to-br from-purple-50 to-purple-100 text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-purple-800 mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          To be the premier global education consultancy, empowering students to achieve their academic and career aspirations through trusted guidance and global networks.
        </p>
        <h2 className="text-4xl font-bold text-purple-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          SS Overseas Education is dedicated to connecting students with top institutions across the globe. We ensure personalized support, transparency, and the best-fit opportunities to unlock each student’s true potential.
        </p>
      </div>
    </section>

   
  </>
);

export default VisionMission;
