import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  CheckCircle,
  Shield,
  Globe,
  FileSearch,
  Bookmark,
  Plane,
  DollarSign,
  Briefcase,
  UserCircle,
  MapPin,
  Award,
  Clock,
  Star,
} from "lucide-react";

export default function Services() {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Study Abroad Counseling",
      description: "Guidance to pick the right country, course, and university.",
      icon: Globe,
      features: [
        "1-on-1 expert counseling",
        "Course & country analysis",
        "Personalized roadmap",
      ],
      duration: "60-90 mins",
      popular: true,
      color: "from-blue-600 to-blue-800",
      cta: "Inquire Now",
    },
    {
      id: 2,
      title: "University Application Assistance",
      description: "Support for applying to top global universities.",
      icon: FileSearch,
      features: [
        "SOP/LOR writing support",
        "Application guidance",
        "Profile enhancement tips",
      ],
      duration: "4-6 weeks",
      popular: true,
      color: "from-blue-600 to-blue-800",
      cta: "Inquire Now",
    },
    {
      id: 3,
      title: "Test Preparation Coaching",
      description: "Training for IELTS, TOEFL, GRE, GMAT exams.",
      icon: BookOpen,
      features: [
        "Certified trainers",
        "Mock tests & feedback",
        "Personalized study plans",
      ],
      duration: "8-12 weeks",
      popular: false,
      color: "from-blue-600 to-blue-800",
      cta: "Inquire Now",
    },
    {
      id: 4,
      title: "Visa Guidance & Processing",
      description: "Visa support from documents to interviews.",
      icon: Bookmark,
      features: [
        "Visa documentation checklist",
        "Mock interviews",
        "98% success rate",
      ],
      duration: "3-4 weeks",
      popular: false,
      color: "from-blue-600 to-blue-800",
      cta: "Inquire Now",
    },
    {
      id: 5,
      title: "Scholarship & Financial Aid",
      description: "Help with scholarships and funding options.",
      icon: DollarSign,
      features: [
        "Scholarship applications",
        "Budget planning",
        "Financial documentation",
      ],
      duration: "2-4 weeks",
      popular: false,
      color: "from-blue-600 to-blue-800",
      cta: "Inquire Now",
    },
    {
      id: 6,
      title: "Pre-Departure & Post-Arrival",
      description: "Support for a smooth transition abroad.",
      icon: Plane,
      features: [
        "Pre-departure briefings",
        "Accommodation assistance",
        "Cultural adaptation",
      ],
      duration: "1-2 weeks",
      popular: false,
      color: "from-blue-600 to-blue-800",
      cta: "Inquire Now",
    },
    {
      id: 7,
      title: "Profile Building & Skills",
      description: "Build a standout profile with certifications.",
      icon: UserCircle,
      features: [
        "Internship opportunities",
        "Resume development",
        "LinkedIn optimization",
      ],
      duration: "4-8 weeks",
      popular: false,
      color: "from-blue-600 to-blue-800",
      cta: "Inquire Now",
    },
    {
      id: 8,
      title: "Parent Counseling & Finance",
      description: "Sessions for parents on study abroad planning.",
      icon: Users,
      features: [
        "Country/course analysis",
        "Loan guidance",
        "Safety assurance",
      ],
      duration: "1-2 sessions",
      popular: false,
      color: "from-blue-600 to-blue-800",
      cta: "Inquire Now",
    },
    {
      id: 9,
      title: "Post-Study Work & PR",
      description: "Advice on work permits and PR pathways.",
      icon: Briefcase,
      features: [
        "Work visa information",
        "PR eligibility tracking",
        "Career planning",
      ],
      duration: "Ongoing",
      popular: false,
      color: "from-blue-600 to-blue-800",
      cta: "Inquire Now",
    },
  ];

  const supportFeatures = [
    {
      title: "Expert Counselors",
      description: "Guidance from study abroad professionals",
      icon: Users,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "100% Success Rate",
      description: "Proven track record of success",
      icon: CheckCircle,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "End-to-End Support",
      description: "Assistance from application to arrival",
      icon: Shield,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Global Network",
      description: "Partnerships with top universities",
      icon: Globe,
      color: "bg-blue-100 text-blue-700",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Students Helped", icon: Users, color: "text-blue-700" },
    { number: "95%", label: "Visa Success Rate", icon: Award, color: "text-blue-700" },
    { number: "50+", label: "Partner Universities", icon: Globe, color: "text-blue-700" },
    { number: "15+", label: "Countries Served", icon: MapPin, color: "text-blue-700" },
  ];

  const process = [
    { step: 1, title: "Consultation", description: "Free profile evaluation", duration: "30-45 mins" },
    { step: 2, title: "Plan Creation", description: "Customized roadmap", duration: "3-5 days" },
    { step: 3, title: "Execution", description: "Application & visa support", duration: "Ongoing" },
    { step: 4, title: "Success", description: "Achieve your goals", duration: "Lifetime" },
  ];

  const handleDirectInquiry = (service) => {
    navigate("/inquiryform", { state: { service: service.title } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Services Grid */}
      <section className="py-6 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
              Our Services
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Study Abroad Solutions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Support for your international education journey.
            </p>
          </div>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-3 sm:p-5 relative hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all ${service.popular ? "ring-2 ring-blue-500" : ""}`}>
                  {service.popular && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-blue-500 text-white">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 fill-current" />
                        Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-2 sm:mb-3">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${service.color} rounded-md flex items-center justify-center mb-2 sm:mb-3`}
                    >
                      <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2">{service.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{service.description}</p>
                  </div>
                  <ul className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-[10px] sm:text-xs text-gray-700 line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {service.duration}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDirectInquiry(service)}
                      className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md hover:from-blue-700 hover:to-blue-900 text-[10px] sm:text-sm transition"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-6 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white mb-3">
              How It Works
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
              Your Journey in 4 Steps
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {process.map((step) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-md flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <span className="text-sm sm:text-base font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2">{step.title}</h3>
                <p className="text-[10px] sm:text-sm text-blue-100 mb-1 sm:mb-2 line-clamp-1">{step.description}</p>
                <p className="text-[10px] sm:text-xs text-blue-300">{step.duration}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Features Section */}
      <section className="py-6 px-3 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Why Choose Us?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Comprehensive support for a successful study abroad journey.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 sm:p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-[10px] sm:text-sm text-gray-600 line-clamp-2">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}