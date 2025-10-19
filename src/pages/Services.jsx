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

  const services = [
    {
      id: 1,
      title: "Study Abroad Counseling",
      description: "Expert guidance to pick the right country, course, and university for your career goals.",
      icon: Globe,
      features: [
        "1-on-1 expert counseling sessions",
        "Course & country analysis",
        "Personalized roadmap creation",
        "Career pathway guidance"
      ],
      duration: "60-90 mins",
      popular: true,
      cta: "Inquire Now",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "University Application Assistance",
      description: "Complete support for applying to top global universities with high acceptance rates.",
      icon: FileSearch,
      features: [
        "SOP/LOR writing support",
        "Application guidance",
        "Profile enhancement tips",
        "Document verification"
      ],
      duration: "4-6 weeks",
      popular: true,
      cta: "Inquire Now",
      image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Test Preparation Coaching",
      description: "Professional training for IELTS, TOEFL, GRE, GMAT exams with certified trainers.",
      icon: BookOpen,
      features: [
        "Certified expert trainers",
        "Mock tests & detailed feedback",
        "Personalized study plans",
        "Score improvement guarantee"
      ],
      duration: "8-12 weeks",
      popular: false,
      cta: "Inquire Now",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Visa Guidance & Processing",
      description: "Complete visa support from documentation to interview preparation.",
      icon: Bookmark,
      features: [
        "Visa documentation checklist",
        "Mock interview sessions",
        "98% success rate",
        "Application tracking"
      ],
      duration: "3-4 weeks",
      popular: false,
      cta: "Inquire Now",
      image: "https://images.unsplash.com/photo-1589561084287-1b64b8a0d4e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Scholarship & Financial Aid",
      description: "Maximize your funding opportunities with expert scholarship guidance.",
      icon: DollarSign,
      features: [
        "Scholarship applications",
        "Budget planning assistance",
        "Financial documentation",
        "Loan guidance"
      ],
      duration: "2-4 weeks",
      popular: false,
      cta: "Inquire Now",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "Pre-Departure & Post-Arrival",
      description: "Smooth transition support for your life abroad journey.",
      icon: Plane,
      features: [
        "Pre-departure briefings",
        "Accommodation assistance",
        "Cultural adaptation",
        "Airport pickup services"
      ],
      duration: "1-2 weeks",
      popular: false,
      cta: "Inquire Now",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const supportFeatures = [
    {
      title: "Expert Counselors",
      description: "Guidance from study abroad professionals with 10+ years experience",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500"
    },
    {
      title: "100% Success Rate",
      description: "Proven track record of successful student placements",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500"
    },
    {
      title: "End-to-End Support",
      description: "Complete assistance from application to arrival and beyond",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500"
    },
    {
      title: "Global Network",
      description: "Partnerships with 200+ top universities worldwide",
      icon: Globe,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500"
    },
  ];

  const stats = [
    { number: "10,000+", label: "Students Helped", icon: Users, color: "text-purple-600" },
    { number: "98%", label: "Visa Success Rate", icon: Award, color: "text-green-600" },
    { number: "200+", label: "Partner Universities", icon: Globe, color: "text-blue-600" },
    { number: "25+", label: "Countries Served", icon: MapPin, color: "text-orange-600" },
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
    navigate("/inquiryform", { state: { service: service.title } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Enhanced Hero Section */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
        style={{ backgroundColor: '#581C87' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-purple-700/30"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full -translate-y-36 translate-x-36"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full -translate-x-48 translate-y-48"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Star className="w-4 h-4 fill-current text-yellow-300" />
              <span className="text-sm font-medium">Premium Study Abroad Services</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Complete Study Abroad
              <span className="block bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                Journey Partner
              </span>
            </h1>
            
            <motion.p
              className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              End-to-end guidance for international education success. From counseling to arrival, 
              we're with you at every step of your global education journey.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-yellow-500/25"
              >
                Start Your Journey
              </button>
              <button 
                onClick={() => navigate('/courses')}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                Explore Courses
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 ${stat.bgColor || 'bg-purple-500'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 mb-4">
                Our Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Study Abroad Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From initial counseling to post-arrival support, we provide end-to-end services 
                to make your study abroad journey seamless and successful.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${
                  service.popular ? "border-purple-500" : "border-gray-100"
                } group-hover:border-purple-300 h-full flex flex-col`}>
                  
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {service.popular && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Most Popular
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Service Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 flex-1">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
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
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 group/btn"
                      >
                        {service.cta}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white mb-4">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Your Journey in 4 Simple Steps
              </h2>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                Our proven process ensures you get the right guidance at every stage of your study abroad journey.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-purple-900 font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-purple-100 mb-2">{step.description}</p>
                <p className="text-sm text-purple-200">{step.duration}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Choose SS Overseas?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're not just consultants; we're your partners in achieving global education success.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Begin Your Global Education Journey?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who have achieved their dreams with our comprehensive guidance and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Free Consultation
              </button>
              <button 
                onClick={() => navigate('/courses')}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
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