import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, Award, Globe, Target, Heart, Zap, CheckCircle, ArrowRight, Quote, MapPin, Calendar, BookOpen, MessageCircle, Phone
} from 'lucide-react';
import mangeshsir from "../assets/mangeshsir.jpg";
import allensir from "../assets/allensir.jpg"
import alvisir from "../assets/Alvisir.jpg"

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

  const WHATSAPP_NUMBER = "918999972278";
  const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

  const openWhatsApp = (context = "General Inquiry", name = "") => {
    const text = name 
      ? `Hi, I want to connect with *${name}* regarding *${context}*.`
      : `Hi, I'm interested in *${context}*. Can you help?`;
    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`, "_blank");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section) => {
    setActiveSection(section);
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const leadershipData = [
    {
      id: 1,
      name: 'Mangesh Ingle',
      role: 'Founder & Director',
      quote: 'Empowering students to achieve their global education dreams through dedicated support and expertise.',
      image: mangeshsir,
      color: 'bg-blue-600',
      hoverRing: 'ring-blue-500',
      icon: <Target className="w-5 h-5" />,
      experience: '15+ years',
      specialization: 'International Education'
    },
    {
      id: 2,
      name: 'Alvi Sir',
      role: 'Director Of SS Overseas',
      quote: 'Our mission is to simplify the study abroad journey with personalized guidance and innovative solutions.',
      image: alvisir,
      color: 'bg-purple-600',
      hoverRing: 'ring-purple-500',
      icon: <Users className="w-5 h-5" />,
      experience: '12+ years',
   
    },
    {
      id: 3,
      name: 'Allan Abraham',
      role: 'Director Of SS Infotech',
      quote: 'We leverage technology to ensure seamless processes and successful outcomes for every student.',
      image: allensir,
      color: 'bg-green-600',
      hoverRing: 'ring-green-500',
      icon: <Zap className="w-5 h-5" />,
      experience: '10+ years',
    
    },
  ];

  const statsData = [
    { icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />, number: '10,000+', label: 'Students Guided', description: 'Successful placements', color: 'bg-blue-600' },
    { icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />, number: '98%', label: 'Visa Success Rate', description: 'Approval rate', color: 'bg-green-600' },
    { icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />, number: '25+', label: 'Countries', description: 'Global reach', color: 'bg-purple-600' },
    { icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />, number: '200+', label: 'Partner Institutions', description: 'University ties', color: 'bg-orange-600' },
  ];

  const processData = [
    { step: '01', title: 'Initial Counseling', description: 'Personalized guidance to understand your goals', icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'bg-blue-500' },
    { step: '02', title: 'University Selection', description: 'Curated list of institutions matching your profile', icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'bg-purple-500' },
    { step: '03', title: 'Application Process', description: 'End-to-end support with documentation', icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'bg-green-500' },
    { step: '04', title: 'Visa Assistance', description: 'Expert guidance for successful visa approval', icon: <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'bg-orange-500' },
  ];

  const valuesData = [
    { icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />, title: 'Student-Centric Approach', description: 'Every student is unique, and so is our approach' },
    { icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />, title: 'Excellence in Service', description: 'Committed to delivering high-quality guidance' },
    { icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />, title: 'Transparency & Integrity', description: 'Honest advice and clear processes' },
    { icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />, title: 'Global Perspective', description: 'Connecting students with world-class education' },
  ];

  const servicesData = [
    { icon: <BookOpen className="w-5 h-5" />, title: 'Test Preparation', description: 'GRE, TOEFL, IELTS, ACT, SAT coaching' },
    { icon: <MapPin className="w-5 h-5" />, title: 'University Selection', description: 'Best-fit institution matching' },
    { icon: <Calendar className="w-5 h-5" />, title: 'Application Support', description: 'End-to-end application guidance' },
    { icon: <Award className="w-5 h-5" />, title: 'Visa Assistance', description: 'Documentation and interview preparation' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="text-sm font-medium text-white/90">About SS Overseas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Trusted Study Abroad
              <span className="block bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">Partner</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Guiding students to global education success with personalized support, expert counseling, and proven results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => scrollToSection('about')} className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-semibold hover:bg-yellow-500 transition-all duration-300 shadow-lg text-base sm:text-lg">
                Explore Our Story
              </button>
              <button onClick={() => openWhatsApp("Free Consultation")} className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 text-base sm:text-lg">
                Get Free Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6">
            {['about', 'mission', 'stats', 'leadership'].map((id) => (
              <button key={id} onClick={() => scrollToSection(id)} className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg ${activeSection === id ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-purple-500 hover:bg-gray-50'}`}>
                {id === 'about' ? 'About Us' : id === 'mission' ? 'Mission & Vision' : id === 'stats' ? 'Our Impact' : 'Leadership'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section ref={sectionRefs.about} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    About <span className="text-purple-600">SS Overseas</span>
                  </h2>
                  <div className="w-20 h-1 bg-purple-600 rounded-full mb-6"></div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  SS Overseas Education is a premier consultancy dedicated to guiding students through their study abroad journey. 
                  With experienced counselors and a global network of institutions, we provide comprehensive services to help students 
                  achieve their academic and career goals internationally.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {servicesData.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">{s.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{s.title}</h4>
                        <p className="text-xs text-gray-600">{s.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-2 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Students" className="rounded-xl w-full h-96 object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">15+</div>
                  <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats & Values */}
      <section ref={sectionRefs.stats} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-purple-600">Impact</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Transforming dreams into reality with proven results</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {statsData.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className={`${s.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105`}>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">{s.icon}</div>
                <div className="text-3xl font-bold text-center mb-2">{s.number}</div>
                <div className="text-sm font-semibold text-center mb-1">{s.label}</div>
                <div className="text-xs text-white/80 text-center">{s.description}</div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-12">Our Core <span className="text-purple-600">Values</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valuesData.map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all border">
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">{v.icon}</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{v.title}</h4>
                  <p className="text-gray-600">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={sectionRefs.mission} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 shadow-xl border">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white mb-6"><Target className="w-6 h-6" /></div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-600 mb-6">To empower students to achieve their global education goals through personalized guidance and unwavering support.</p>
            <ul className="space-y-3">
              {['Personalized counseling', 'Comprehensive application support', 'Visa guidance', 'Pre-departure orientation'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600"><CheckCircle className="w-5 h-5 text-green-500" />{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="bg-purple-600 rounded-2xl p-8 shadow-xl text-white">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6"><Globe className="w-6 h-6" /></div>
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg text-blue-100">To be the most trusted and innovative study abroad consultancy, making international education accessible worldwide.</p>
          </motion.div>
        </div>
      </section>

      {/* === LEADERSHIP SECTION – REDESIGNED === */}
      <section ref={sectionRefs.leadership} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-purple-600">Leadership</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Visionaries driving excellence in global education</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipData.map((person, i) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Glow on Hover */}
                <div className={`absolute -inset-1 ${person.color} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition duration-500`}></div>

                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                  <div className={`h-2 ${person.color}`}></div>
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col items-center text-center space-y-5">
                      {/* Image */}
                      <div className="relative">
                        <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                          <img src={person.image} alt={person.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className={`absolute -bottom-2 -right-2 ${person.color} rounded-full p-2 shadow-lg`}>
                          {person.icon}
                        </div>
                      </div>

                      {/* Name & Role */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                        <p className={`text-sm font-semibold ${person.color.replace('bg-', 'text-')} mt-1`}>{person.role}</p>
                      </div>

                      {/* Experience */}
                      <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                        <Calendar className="w-3 h-3 text-gray-600" />
                        <span className="text-xs text-gray-600 font-medium">{person.experience}</span>
                      </div>

                      {/* Quote */}
                      <p className="text-sm text-gray-600 italic leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                        "{person.quote}"
                      </p>

                
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-purple-600">Process</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A structured approach to ensure your success</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processData.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="relative text-center group">
                {i < processData.length - 1 && <div className="hidden lg:block absolute top-12 left-1 Insurance w-full h-0.5 bg-gray-200 -z-10"></div>}
                <div className={`w-16 h-16 ${step.color} rounded-2xl mx-auto mb-4 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-600 shadow-lg">
                  {step.step}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Begin Your <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">Global Journey</span>?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who achieved their dreams with SS Overseas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => openWhatsApp("Start Application")} className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-semibold hover:bg-yellow-500 transition-all shadow-lg text-base sm:text-lg">
                Start Your Application
              </button>
              <button onClick={() => openWhatsApp("Free Consultation")} className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all text-base sm:text-lg">
                Free Consultation
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-6">Get expert guidance within 24 hours</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;