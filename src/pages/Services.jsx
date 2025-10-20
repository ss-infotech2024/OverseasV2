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
  MapPin,
  Award,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Study Abroad Counseling",
      description: "Guidance for country, course, and university.",
      icon: Globe,
      features: ["1-on-1 expert counseling"],
      duration: "60-90 mins",
      popular: true,
      cta: "Inquire",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "University Application",
      description: "Support for global university applications.",
      icon: FileSearch,
      features: ["SOP/LOR writing"],
      duration: "4-6 weeks",
      popular: true,
      cta: "Inquire",
      image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Test Prep Coaching",
      description: "Training for IELTS, TOEFL, GRE, GMAT.",
      icon: BookOpen,
      features: ["Certified trainers"],
      duration: "8-12 weeks",
      popular: false,
      cta: "Inquire",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Visa Guidance",
      description: "Visa support with documentation.",
      icon: Bookmark,
      features: ["Documentation checklist"],
      duration: "3-4 weeks",
      popular: false,
      cta: "Inquire",
      image: "https://images.unsplash.com/photo-1589561084287-1b64b8a0d4e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Scholarship Aid",
      description: "Guidance for funding opportunities.",
      icon: DollarSign,
      features: ["Scholarship applications"],
      duration: "2-4 weeks",
      popular: false,
      cta: "Inquire",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "Pre & Post-Arrival",
      description: "Support for life abroad transition.",
      icon: Plane,
      features: ["Pre-departure briefings"],
      duration: "1-2 weeks",
      popular: false,
      cta: "Inquire",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const supportFeatures = [
    {
      title: "Expert Counselors",
      description: "10+ years experience",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500"
    },
    {
      title: "100% Success",
      description: "Proven student placements",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500"
    },
    {
      title: "End-to-End Support",
      description: "From application to arrival",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500"
    },
    {
      title: "Global Network",
      description: "200+ top universities",
      icon: Globe,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500"
    },
  ];

  const stats = [
    { number: "10,000+", label: "Students Helped", icon: Users, color: "text-purple-600" },
    { number: "98%", label: "Visa Success", icon: Award, color: "text-green-600" },
    { number: "200+", label: "Universities", icon: Globe, color: "text-blue-600" },
    { number: "25+", label: "Countries", icon: MapPin, color: "text-orange-600" },
  ];

  const process = [
    { 
      step: 1, 
      title: "Consultation", 
      description: "Profile evaluation", 
      duration: "30-45 mins",
      icon: Users
    },
    { 
      step: 2, 
      title: "Plan Creation", 
      description: "Custom roadmap", 
      duration: "3-5 days",
      icon: FileSearch
    },
    { 
      step: 3, 
      title: "Execution", 
      description: "Application & visa",
      duration: "Ongoing",
      icon: CheckCircle
    },
    { 
      step: 4, 
      title: "Success", 
      description: "Achieve goals",
      duration: "Lifetime",
      icon: Award
    },
  ];

  const handleDirectInquiry = (service) => {
    navigate("/inquiryform", { state: { service: service.title } });
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
              Guidance for international education success.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button 
                onClick={() => navigate('/contact')}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-yellow-500/25 text-xs sm:text-sm"
              >
                Start Journey
              </button>
              <button 
                onClick={() => navigate('/courses')}
                className="px-4 py-2 sm:px-6 sm:py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 text-xs sm:text-sm"
              >
                Courses
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
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor || 'bg-purple-500'} rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3`}>
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
                Study Abroad Solutions
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
                Seamless study abroad journey support.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 sm:gap-4 lg:gap-6">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border ${
                  service.popular ? "border-purple-500" : "border-gray-100"
                } group-hover:border-purple-300 h-full flex flex-col`}>
                  
                  {/* Service Image */}
                  <div className="relative h-16 sm:h-20 md:h-24 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {service.popular && (
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
                        <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium bg-yellow-500 text-white">
                          <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 mr-0.5 fill-current" />
                          Popular
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Service Content */}
                  <div className="p-2 sm:p-3 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-md flex items-center justify-center">
                        <service.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-purple-700 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3 flex-1">
                      {service.description}
                    </p>

                    {/* Features List - Show 1 on mobile, all on larger screens */}
                    <ul className="space-y-1 mb-2 sm:mb-3 hidden sm:block">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0" />
                          <span className="text-[10px] sm:text-xs text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-1 mb-2 sm:hidden">
                      {service.features.slice(0, 1).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="text-[10px] text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Duration and CTA */}
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {service.duration}
                      </div>
                      <button
                        onClick={() => handleDirectInquiry(service)}
                        className="flex items-center gap-0.5 px-2 py-1 sm:px-3 sm:py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 group/btn text-[10px] sm:text-xs"
                      >
                        {service.cta}
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-8 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-white/20 text-white mb-3 sm:mb-4">
                How It Works
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
                Your Journey in 4 Steps
              </h2>
              <p className="text-sm sm:text-base text-purple-100 max-w-xl mx-auto">
                Proven process for study abroad success.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-white/20 transition-colors duration-300">
                    <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-1 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center text-purple-900 font-bold text-[10px] sm:text-xs">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2">{step.title}</h3>
                <p className="text-[10px] sm:text-xs text-purple-100 mb-1">{step.description}</p>
                <p className="text-[10px] sm:text-xs text-purple-200">{step.duration}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Features Section */}
      <section className="py-8 px-3 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                Why Choose Us?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
                Partners in global education success.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              Begin Your Journey?
            </h2>
            <p className="text-sm sm:text-base text-purple-100 mb-4 sm:mb-6 max-w-lg mx-auto">
              Achieve your dreams with our guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <button 
                onClick={() => navigate('/contact')}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:-translate-y-1 text-xs sm:text-sm"
              >
                Free Consultation
              </button>
              <button 
                onClick={() => navigate('/courses')}
                className="px-4 py-2 sm:px-6 sm:py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 text-xs sm:text-sm"
              >
                Browse Courses
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}