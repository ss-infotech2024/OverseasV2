import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { 
  Users, 
  Award, 
  Globe, 
  Target, 
  Heart, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Quote,
  MapPin,
  Calendar,
  BookOpen
} from 'lucide-react';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  
  const sectionRefs = {
    about: useRef(null),
    mission: useRef(null),
    vision: useRef(null),
    leadership: useRef(null),
    stats: useRef(null),
  };

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section) => {
    setActiveSection(section);
    sectionRefs[section].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const leadershipData = [
    {
      id: 1,
      name: 'Mangesh Ingle',
      role: 'Founder & Director',
      quote: 'Empowering students to achieve their global education dreams through dedicated support and expertise.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-blue-500 to-cyan-500',
      experience: '15+ years',
      specialization: 'International Education'
    },
    {
      id: 2,
      name: 'Alvi Sir',
      role: 'Director Of SS Overseas',
      quote: 'Our mission is to simplify the study abroad journey with personalized guidance and innovative solutions.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-purple-500 to-pink-500',
      experience: '12+ years',
      specialization: 'Student Counseling'
    },
    {
      id: 3,
      name: 'Allan Abraham',
      role: 'Director Of SS Infotech',
      quote: 'We leverage technology to ensure seamless processes and successful outcomes for every student.',
      image: 'https://images.unsplash.com/photo-1522529599102-1a7a4c1240bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-green-500 to-teal-500',
      experience: '10+ years',
      specialization: 'Technology Solutions'
    },
  ];

  const statsData = [
    { 
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />, 
      number: '10,000+', 
      label: 'Students Guided', 
      color: 'from-blue-500 to-cyan-500',
      description: 'Successful placements'
    },
    { 
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />, 
      number: '98%', 
      label: 'Visa Success Rate', 
      color: 'from-green-500 to-emerald-500',
      description: 'Approval rate'
    },
    { 
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />, 
      number: '25+', 
      label: 'Countries', 
      color: 'from-purple-500 to-pink-500',
      description: 'Global reach'
    },
    { 
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />, 
      number: '200+', 
      label: 'Partner Institutions', 
      color: 'from-orange-500 to-red-500',
      description: 'University ties'
    },
  ];

  const processData = [
    {
      step: '01',
      title: 'Initial Counseling',
      description: 'Personalized guidance to understand your goals and aspirations',
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: 'from-blue-400 to-cyan-400',
    },
    {
      step: '02',
      title: 'University Selection',
      description: 'Curated list of institutions matching your profile and preferences',
      icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: 'from-purple-400 to-pink-400',
    },
    {
      step: '03',
      title: 'Application Process',
      description: 'End-to-end support with documentation and submissions',
      icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: 'from-green-400 to-teal-400',
    },
    {
      step: '04',
      title: 'Visa Assistance',
      description: 'Expert guidance for successful visa approval',
      icon: <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: 'from-orange-400 to-red-400',
    },
  ];

  const valuesData = [
    { 
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />, 
      title: 'Student-Centric Approach', 
      description: 'Every student is unique, and so is our approach to their journey' 
    },
    { 
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />, 
      title: 'Excellence in Service', 
      description: 'Committed to delivering high-quality guidance and support' 
    },
    { 
      icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />, 
      title: 'Transparency & Integrity', 
      description: 'Honest advice and clear processes at every step' 
    },
    { 
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />, 
      title: 'Global Perspective', 
      description: 'Connecting students with world-class education opportunities' 
    },
  ];

  const servicesData = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Test Preparation',
      description: 'GRE, TOEFL, IELTS, ACT, SAT coaching'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'University Selection',
      description: 'Best-fit institution matching'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Application Support',
      description: 'End-to-end application guidance'
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: 'Visa Assistance',
      description: 'Documentation and interview preparation'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-72 sm:h-72 bg-purple-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 border border-white/20">
              <span className="text-sm sm:text-base font-medium text-white/90">About SS Overseas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Trusted Study Abroad
              <span className="block bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                Partner
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl sm:max-w-3xl mx-auto mb-8 leading-relaxed">
              Guiding students to global education success with personalized support, expert counseling, and proven results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                Explore Our Story
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
              >
                Get Free Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 lg:gap-8">
            {[
              { id: 'about', label: 'About Us' },
              { id: 'mission', label: 'Mission & Vision' },
              { id: 'stats', label: 'Our Impact' },
              { id: 'leadership', label: 'Leadership' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm sm:text-base font-medium transition-all duration-300 px-3 py-2 rounded-lg ${
                  activeSection === item.id 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-600 hover:text-purple-500 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section ref={sectionRefs.about} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    About <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">SS Overseas</span>
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6"></div>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  SS Overseas Education is a premier consultancy dedicated to guiding students through their study abroad journey. 
                  With experienced counselors and a global network of institutions, we provide comprehensive services to help students 
                  achieve their academic and career goals internationally.
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our expertise spans across counseling, institution selection, application processes, visa assistance, and 
                  pre-departure preparations. We are committed to making international education accessible and achievable for every student.
                </p>

                {/* Services Grid */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {servicesData.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{service.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-2 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Students studying abroad"
                    className="rounded-xl w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                </div>
                
                {/* Experience Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600">15+</div>
                    <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 bg-yellow-400 rounded-xl p-4 shadow-lg">
                  <Award className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={sectionRefs.stats} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Impact</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Transforming dreams into reality with proven results and dedicated support
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-center mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base font-semibold text-center mb-1">{stat.label}</div>
                <div className="text-xs text-white/80 text-center">{stat.description}</div>
              </motion.div>
            ))}
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
              Our Core <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Values</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valuesData.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                    {value.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section ref={sectionRefs.mission} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To empower students to achieve their global education goals through personalized guidance, 
                comprehensive support, and unwavering commitment to their success.
              </p>
              <ul className="space-y-3">
                {[
                  'Personalized counseling sessions',
                  'Comprehensive application support',
                  'Visa guidance and documentation',
                  'Pre-departure orientation'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 shadow-xl text-white"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg text-blue-100 leading-relaxed">
                To be the most trusted and innovative study abroad consultancy, making international education 
                accessible and seamless for every aspiring student worldwide while setting new standards in 
                educational consulting excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section ref={sectionRefs.leadership} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Meet Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Leadership</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Our team of experienced professionals driving global education excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipData.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${person.color}`}></div>
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${person.color} rounded-full p-2 shadow-lg`}>
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{person.name}</h3>
                    <p className={`text-sm font-semibold bg-gradient-to-r ${person.color} bg-clip-text text-transparent mb-2`}>
                      {person.role}
                    </p>
                    <div className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 mb-3">
                      <Calendar className="w-3 h-3 text-gray-600" />
                      <span className="text-xs text-gray-600 font-medium">{person.experience}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {person.quote}
                    </p>
                    
                    <div className="w-full bg-gray-100 rounded-lg p-3">
                      <p className="text-xs text-gray-600 font-medium">{person.specialization}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              A structured approach to ensure your study abroad success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processData.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center group"
              >
                {/* Connecting Line */}
                {index < processData.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-100 -z-10"></div>
                )}
                
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl mx-auto mb-4 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-600 shadow-lg">
                  {step.step}
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Begin Your <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">Global Journey</span>?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of successful students who achieved their international education dreams with SS Overseas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                Start Your Application
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
              >
                Free Consultation
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              Get expert guidance within 24 hours
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;