import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Globe, 
  Target, 
  Heart, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Quote 
} from 'lucide-react';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState('about');
  const navigate = useNavigate();
  const sectionRefs = {
    about: useRef(null),
    mission: useRef(null),
    vision: useRef(null),
    leadership: useRef(null),
    stats: useRef(null),
  };

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
      name: 'Rajesh Sharma',
      role: 'CEO & Founder',
      quote: 'Education is the passport to the future, and at SS Overseas, we are committed to helping every student succeed. Our vision goes beyond placements—we are building global citizens.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-blue-500 to-cyan-500',
      experience: '15+ years',
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Chief Academic Officer',
      quote: 'We leverage technology to simplify the visa process, making global education accessible. Our platforms ensure you are informed and prepared.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-purple-500 to-pink-500',
      experience: '12+ years',
    },
    {
      id: 3,
      name: 'Anil Kumar',
      role: 'Director of Admissions',
      quote: 'Our 98% visa approval rate reflects our meticulous approach and personalized guidance. We treat every application as a unique journey.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-green-500 to-teal-500',
      experience: '10+ years',
    },
  ];

  const statsData = [
    { icon: <Users className="w-8 h-8" />, number: '10,000+', label: 'Students Guided', color: 'from-blue-500 to-cyan-500' },
    { icon: <Award className="w-8 h-8" />, number: '98%', label: 'Visa Success Rate', color: 'from-green-500 to-emerald-500' },
    { icon: <Globe className="w-8 h-8" />, number: '25+', label: 'Countries', color: 'from-purple-500 to-pink-500' },
    { icon: <Target className="w-8 h-8" />, number: '200+', label: 'Partner Institutions', color: 'from-orange-500 to-red-500' },
  ];

  const processData = [
    {
      step: '01',
      title: 'Initial Counseling',
      description: 'Personalized guidance to understand your goals and aspirations',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-400 to-cyan-400',
    },
    {
      step: '02',
      title: 'University Selection',
      description: 'Curated list of institutions matching your profile and preferences',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-400',
    },
    {
      step: '03',
      title: 'Application Process',
      description: 'End-to-end support with documentation and submissions',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-green-400 to-teal-400',
    },
    {
      step: '04',
      title: 'Visa Assistance',
      description: 'Expert guidance for successful visa approval',
      icon: <ArrowRight className="w-6 h-6" />,
      color: 'from-orange-400 to-red-400',
    },
  ];

  const valuesData = [
    { icon: <Heart className="w-8 h-8" />, title: 'Student-Centric Approach', description: 'Every student is unique, and so is our approach to their journey' },
    { icon: <Zap className="w-8 h-8" />, title: 'Excellence in Service', description: 'Committed to delivering high-quality guidance and support' },
    { icon: <CheckCircle className="w-8 h-8" />, title: 'Transparency & Integrity', description: 'Honest advice and clear processes at every step' },
    { icon: <Globe className="w-8 h-8" />, title: 'Global Perspective', description: 'Connecting students with world-class education opportunities' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 to-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-white/20">
              <span className="text-sm font-medium">About SS Overseas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Your Study Abroad Partner</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-6">
              Guiding students to global education success with personalized support and expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('about')}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
              >
                Explore Our Story
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation (Internal Section Links) */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6">
            {[
              { id: 'about', label: 'About' },
              { id: 'mission', label: 'Mission' },
              { id: 'vision', label: 'Vision' },
              { id: 'leadership', label: 'Leadership' },
              { id: 'stats', label: 'Achievements' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id ? 'text-purple-600' : 'text-gray-600 hover:text-purple-500'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="block h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-1"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section ref={sectionRefs.about} className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About SS Overseas Education</h2>
              <p className="text-gray-600 mb-6">
                SS Overseas Education is a premier consultancy dedicated to guiding students through the study abroad process. With experienced counselors and a global network of institutions, we provide comprehensive services to help students achieve their academic and career goals.
              </p>
              <p className="text-gray-600 mb-6">
                Our expertise covers counseling, institution selection, applications, visas, and pre-departure preparations. We are committed to making international education accessible and achievable for all students.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start gap-3">
                  <Quote className="w-6 h-6 text-purple-500 flex-shrink-0" />
                  <p className="text-purple-800 font-medium text-sm">
                    We provide comprehensive support, including preparation for exams like GRE, TOEFL, IELTS, ACT, SAT, and more, along with personalized guidance.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg p-1 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Students studying abroad"
                  className="rounded-lg w-full h-80 object-cover"
                />
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md mt-4 text-center">
                <div className="text-2xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-gray-600">Years of Experience</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats and Values Section */}
      <section ref={sectionRefs.stats} className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-gray-600">Transforming dreams into reality</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-r ${stat.color} rounded-lg p-4 text-white text-center shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Our Core Values</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {valuesData.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2 text-white">
                    {value.icon}
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">{value.title}</h4>
                  <p className="text-xs text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={sectionRefs.mission} className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Empowering students to achieve their global education goals with personalized guidance and support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section ref={sectionRefs.vision} className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To make international education accessible and seamless for all aspiring students worldwide.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Interviews', description: 'Direct online interviews', color: 'from-blue-500 to-cyan-500' },
                { title: 'Process', description: 'Quick and easy process', color: 'from-green-500 to-emerald-500' },
                { title: 'Visa Approvals', description: '98% visa approvals', color: 'from-purple-500 to-pink-500' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${item.color} rounded-lg p-4 text-white text-center shadow-md hover:shadow-lg transition-all duration-300`}
                >
                  <h3 className="text-sm font-bold mb-2">{item.title}</h3>
                  <p className="text-xs">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Begin Your Journey
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section ref={sectionRefs.leadership} className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600">Our team of experts driving global education excellence</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {leadershipData.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className={`h-1 bg-gradient-to-r ${person.color}`}></div>
                <div className="p-4 text-center">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-20 h-20 rounded-full mx-auto mb-2"
                  />
                  <h3 className="text-lg font-bold text-gray-900">{person.name}</h3>
                  <p className={`text-xs font-medium bg-gradient-to-r ${person.color} bg-clip-text text-transparent`}>
                    {person.role}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">{person.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-gray-600">A structured approach to ensure your study abroad success</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processData.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-lg mx-auto mb-2 flex items-center justify-center text-white`}>
                  {step.icon}
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-xs text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
            <p className="text-lg text-blue-100 mb-6">
              Join thousands of students who achieved their dreams with SS Overseas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-500 transition-all duration-300">
                Start Your Application
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-300">
                Free Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;