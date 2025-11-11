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
  ArrowRight,
} from "lucide-react";

export default function Services() {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // ---- Open Google Form in a new tab ----
  const openInquiryForm = (service) => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSfqs_SYWB2r1B9tJYXCoIUuBFjXgNAoRwFePYSp88vagVvAHw/viewform",
      "_blank",
      "noopener,noreferrer"
    );
  };

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
      image: "https://d3f5t311jggq1i.cloudfront.net/2024/12/medium-shot-woman-working-as-travel-agent-scaled.jpg"
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
      image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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
      image: "https://theglobalconnect.co.in/wp-content/uploads/2023/07/visa-process.jpg"
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
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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
      image: "https://www.avanse.com/blogs/images/16feb-blog-2024.jpg"
    },
  ];

  const supportFeatures = [
    {
      title: "Expert Counselors",
      description: "Guidance from study abroad professionals",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500"
    },
    {
      title: "100% Success Rate",
      description: "Proven track record of success",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500"
    },
    {
      title: "End-to-End Support",
      description: "Assistance from application to arrival",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500"
    },
    {
      title: "Global Network",
      description: "Partnerships with top universities",
      icon: Globe,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500"
    },
  ];

  const stats = [
    { number: "10,000+", label: "Students Helped", icon: Users, color: "text-purple-600", bgColor: "bg-purple-500" },
    { number: "98%", label: "Visa Success Rate", icon: Award, color: "text-green-600", bgColor: "bg-green-500" },
    { number: "200+", label: "Partner Universities", icon: Globe, color: "text-blue-600", bgColor: "bg-blue-500" },
    { number: "25+", label: "Countries Served", icon: MapPin, color: "text-orange-600", bgColor: "bg-orange-500" },
  ];

  const process = [
    {
      step: 1,
      title: "Consultation",
      description: "Free profile evaluation",
      duration: "30-45 mins",
      icon: Users
    },
    {
      step: 2,
      title: "Plan Creation",
      description: "Customized roadmap",
      duration: "3-5 days",
      icon: FileSearch
    },
    {
      step: 3,
      title: "Execution",
      description: "Application & visa support",
      duration: "Ongoing",
      icon: CheckCircle
    },
    {
      step: 4,
      title: "Success",
      description: "Achieve your goals",
      duration: "Lifetime",
      icon: Award
    },
  ];

  const handleDirectInquiry = (service) => {
    openInquiryForm(service);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Hero Section */}
      <motion.section
        className="relative py-10 px-3 sm:px-6 lg:px-8 text-white overflow-hidden"
        style={{ backgroundColor: '#581C87' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-purple-700/30"></div>
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-48 sm:h-48 bg-purple-500/10 rounded-full -translate-y-20 sm:-translate-y-24 translate-x-20 sm:translate-x-24"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-purple-400/10 rounded-full -translate-x-24 sm:-translate-x-32 translate-y-24 sm:translate-y-32"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 mb-3 sm:mb-4 border border-white/20">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current text-yellow-300" />
              <span className="text-[10px] sm:text-xs font-medium">Study Abroad Services</span>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              Your Study Abroad
              <span className="block bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                Journey Partner
              </span>
            </h1>

            <motion.p
              className="text-sm sm:text-base lg:text-lg text-purple-100 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Comprehensive support for your international education success with end-to-end guidance and expert counseling.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button
                onClick={() => openInquiryForm({ title: "General Consultation" })}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-yellow-500/25 text-xs sm:text-sm"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => navigate('/courses')}
                className="px-4 py-2 sm:px-6 sm:py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 text-xs sm:text-sm"
              >
                Explore Courses
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-8 px-3 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className={`text-lg sm:text-xl font-bold ${stat.color} mb-1`}>{stat.number}</div>
                <div className="text-[10px] sm:text-xs text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-purple-100 text-purple-700 mb-3 sm:mb-4">
                Our Services
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                Comprehensive Study Abroad Solutions
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
                End-to-end support for your international education journey
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border ${service.popular ? "border-purple-500 ring-2 ring-purple-500/20" : "border-gray-100"
                  } group-hover:border-purple-300 h-full flex flex-col`}>

                  {/* Service Image */}
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                    {service.popular && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white shadow-lg">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Popular
                        </span>
                      </div>
                    )}

                    {/* Service Icon */}
                    <div className="absolute bottom-3 left-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center shadow-lg`}>
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 flex-1">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Duration and CTA */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </div>
                      <button
                        onClick={() => handleDirectInquiry(service)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-purple-500/25 group/btn text-sm font-semibold"
                      >
                        {service.cta}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Support Features Section */}
      <section className="py-12 px-3 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                Why Choose Us
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Your Trusted Study Abroad Partner
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We combine expertise, experience, and dedication to make your study abroad journey seamless and successful
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Ready to Begin Your Study Abroad Journey?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Take the first step towards your international education dreams with our expert guidance and comprehensive support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openInquiryForm({ title: "Free Consultation" })}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-yellow-500/30 text-lg"
              >
                Get Free Consultation
              </button>
              <button
                onClick={() => navigate('/courses')}
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 text-lg"
              >
                Browse All Courses
              </button>
            </div>
            <p className="text-purple-200 mt-6 text-sm">
              No commitment required • 100% Free Consultation • Expert Guidance
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}