import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  Star,
  Search,
  Globe,
  CheckCircle,
  MessageSquare,
  MapPin,
  DollarSign,
  ArrowRight,
  Shield,
  Award,
  Target,
  Heart,
  Zap,
  TrendingUp,
  Bookmark,
  Crown,
  Filter,
} from "lucide-react";

// Course images mapping
const courseImages = {
  "Engineering": "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "Business": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "Computer Science": "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "Medicine": "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "Arts & Humanities": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "Science": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "default": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
};

// Our premium courses with proper images
const ourCourses = [
  {
    id: 1,
    title: "IELTS & TOEFL Preparation Package",
    instructor: "English Language Experts",
    category: "Test Preparation",
    level: "Beginner to Advanced",
    duration: "8 weeks",
    students: 3250,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Focused training to improve English language skills for study abroad exams with personalized feedback and proven results.",
    features: [
      "Comprehensive practice tests",
      "Tips to improve each module",
      "Personalized feedback sessions",
      "Score improvement strategies",
      "Expert trainers with 10+ years experience",
    ],
    bestseller: true,
    popular: true,
    discount: "17% OFF"
  },
  {
    id: 2,
    title: "GRE / GMAT Coaching Program",
    instructor: "Quant & Verbal Experts",
    category: "Test Preparation",
    level: "Intermediate",
    duration: "12 weeks",
    students: 1870,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Comprehensive coaching for competitive exams required for master's and MBA programs abroad with proven success.",
    features: [
      "Covers all sections (Quant, Verbal, AWA)",
      "Full-length mock tests with analysis",
      "Personalized study plans",
      "Time management strategies",
      "Access to premium question banks",
    ],
    bestseller: true,
    popular: true,
    discount: "17% OFF"
  },
  {
    id: 3,
    title: "Complete Admission Guidance Package",
    instructor: "University Admission Specialists",
    category: "Admission Guidance",
    level: "All Levels",
    duration: "Ongoing",
    students: 2430,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "End-to-end support for university selection and application process with guaranteed results.",
    features: [
      "University shortlisting based on profile",
      "SOP/LOR writing support",
      "Application review & submission",
      "Scholarship application assistance",
      "10+ university applications included",
    ],
    bestseller: false,
    popular: true,
    discount: "14% OFF"
  },
  {
    id: 4,
    title: "Visa Assistance & Interview Prep",
    instructor: "Visa Documentation Experts",
    category: "Visa Assistance",
    level: "All Levels",
    duration: "4 weeks",
    students: 4120,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1589561084287-1b64b8a0d4e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Complete support for visa documentation and interview preparation with 98% success rate.",
    features: [
      "Document checklist & verification",
      "Mock interview sessions",
      "Visa SOP assistance",
      "Financial documentation guidance",
      "Country-specific visa strategies",
    ],
    bestseller: false,
    popular: false,
    discount: "17% OFF"
  },
  {
    id: 5,
    title: "Pre-Departure Orientation Program",
    instructor: "International Student Advisors",
    category: "Pre-Departure",
    level: "All Levels",
    duration: "2 weeks",
    students: 1560,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Prepare for life abroad with cultural adaptation and practical guidance from experienced advisors.",
    features: [
      "Cultural adaptation sessions",
      "Travel & accommodation guidance",
      "Banking & mobile setup assistance",
      "Safety & legal awareness",
      "Alumni networking opportunities",
    ],
    bestseller: false,
    popular: false,
    discount: "29% OFF"
  },
  {
    id: 6,
    title: "Career & Country Counselling Package",
    instructor: "Career Guidance Experts",
    category: "Career Counseling",
    level: "All Levels",
    duration: "Ongoing",
    students: 2890,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Personalized counseling to choose the right course, country and university for your career goals.",
    features: [
      "Career aptitude assessment",
      "Country comparison analysis",
      "ROI & job market evaluation",
      "University shortlisting",
      "Long-term career planning",
    ],
    bestseller: false,
    popular: true,
    discount: "22% OFF"
  },
];

// Sample study abroad courses with proper images
const studyAbroadCourses = [
  {
    id: 1,
    name: "Computer Science Engineering",
    description: "Comprehensive computer science program covering AI, machine learning, and software development with industry placements.",
    duration: "4 years",
    tuition: "$25,000/year",
    country: "USA",
    countryFlag: "🇺🇸",
    qualification: "Bachelor's Degree",
    entryRequirements: "SAT 1200+, IELTS 6.5",
    careerProspects: "Software Engineer, Data Scientist, AI Specialist",
    image: courseImages["Computer Science"],
    link: "/course/cs-engineering"
  },
  {
    id: 2,
    name: "MBA in International Business",
    description: "Top-ranked MBA program focusing on global business strategies, leadership, and international market analysis.",
    duration: "2 years",
    tuition: "$35,000/year",
    country: "UK",
    countryFlag: "🇬🇧",
    qualification: "Master's Degree",
    entryRequirements: "GMAT 650+, IELTS 7.0",
    careerProspects: "Business Consultant, International Manager",
    image: courseImages["Business"],
    link: "/course/mba-international"
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    description: "Advanced mechanical engineering program with focus on robotics, automation, and sustainable energy solutions.",
    duration: "4 years",
    tuition: "€15,000/year",
    country: "Germany",
    countryFlag: "🇩🇪",
    qualification: "Bachelor's Degree",
    entryRequirements: "Abitur equivalent, IELTS 6.0",
    careerProspects: "Mechanical Engineer, Automotive Engineer",
    image: courseImages["Engineering"],
    link: "/course/mechanical-engineering"
  },
  {
    id: 4,
    name: "Medicine (MBBS)",
    description: "Comprehensive medical program with clinical rotations and research opportunities in world-class hospitals.",
    duration: "6 years",
    tuition: "$40,000/year",
    country: "Australia",
    countryFlag: "🇦🇺",
    qualification: "Doctoral Degree",
    entryRequirements: "NEET qualified, IELTS 7.0",
    careerProspects: "Doctor, Surgeon, Medical Researcher",
    image: courseImages["Medicine"],
    link: "/course/medicine-mbbs"
  },
  {
    id: 5,
    name: "Data Science & Analytics",
    description: "Cutting-edge data science program covering big data, machine learning, and business intelligence applications.",
    duration: "2 years",
    tuition: "$28,000/year",
    country: "Canada",
    countryFlag: "🇨🇦",
    qualification: "Master's Degree",
    entryRequirements: "GRE 310+, IELTS 6.5",
    careerProspects: "Data Scientist, Analytics Manager",
    image: courseImages["Computer Science"],
    link: "/course/data-science"
  },
  {
    id: 6,
    name: "International Relations",
    description: "Comprehensive study of global politics, diplomacy, and international cooperation with UN internship opportunities.",
    duration: "3 years",
    tuition: "£18,000/year",
    country: "UK",
    countryFlag: "🇬🇧",
    qualification: "Bachelor's Degree",
    entryRequirements: "IELTS 6.5, Personal Statement",
    careerProspects: "Diplomat, Policy Analyst, NGO Director",
    image: courseImages["Arts & Humanities"],
    link: "/course/international-relations"
  }
];

// Tab components
const TabButton = ({ active, onClick, icon: Icon, children }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
      active
        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg"
    }`}
  >
    <Icon className="w-5 h-5" />
    {children}
  </motion.button>
);

export default function Courses() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("premium");
  const navigate = useNavigate();

  // Country filters for study abroad courses
  const countryFilters = ["All", ...new Set(studyAbroadCourses.map(course => course.country))];

  // Filter courses based on active tab and search
  const filteredCourses = useMemo(() => {
    const courses = activeTab === "premium" ? ourCourses : studyAbroadCourses;
    
    return courses.filter((course) => {
      const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCountry = selectedCountry === "All" || course.country === selectedCountry;
      
      return matchesSearch && (activeTab === "premium" || matchesCountry);
    });
  }, [activeTab, searchQuery, selectedCountry]);

  // Handle image errors
  const handleImageError = (e, courseName, category = "default") => {
    e.target.src = courseImages[category] || courseImages.default;
  };

  // Render course card
  const renderCourseCard = (course, isPremium = false) => {
    const courseImage = isPremium ? course.image : (course.image || courseImages[course.category] || courseImages.default);
    
    return (
      <motion.div
        key={course.id}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2"
        onClick={() => navigate('/inquiryform', { state: { course: isPremium ? course.title : course.name, country: course.country } })}
      >
        {/* Course Header with Image */}
        <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden">
          <img 
            src={courseImage}
            alt={isPremium ? course.title : course.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => handleImageError(e, isPremium ? course.title : course.name, course.category)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {isPremium && course.bestseller && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                <Zap className="w-3 h-3 mr-1" />
                Bestseller
              </span>
            )}
            {isPremium && course.popular && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-500 text-white">
                <Heart className="w-3 h-3 mr-1" />
                Popular
              </span>
            )}
          </div>
          
          {/* Country/Discount Badge */}
          <div className="absolute top-4 right-4">
            {isPremium ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                {course.discount}
              </span>
            ) : (
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-lg">{course.countryFlag}</span>
                <span className="text-xs font-medium text-gray-700">{course.country}</span>
              </div>
            )}
          </div>

          {/* Category/Qualification */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700">
              {isPremium ? course.category : course.qualification}
            </span>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs border border-blue-200 text-blue-700 bg-blue-50">
              {course.level || "Full Time"}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700">{course.rating}</span>
              {isPremium && (
                <span className="text-xs text-gray-500">({course.students})</span>
              )}
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors">
            {isPremium ? course.title : course.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* Instructor/Country */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Users className="w-4 h-4" />
            <span>{isPremium ? `By ${course.instructor}` : `Study in ${course.country}`}</span>
          </div>

          {/* Course Details */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              {isPremium ? course.price : course.tuition}
            </span>
          </div>

          {/* Features for premium courses */}
          {isPremium && course.features && (
            <div className="space-y-2 mb-4">
              {course.features.slice(0, 2).map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price for premium courses */}
          {isPremium && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-gray-900">{course.price}</span>
              <span className="text-lg text-gray-500 line-through">{course.originalPrice}</span>
            </div>
          )}

          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl py-3 font-medium transition-all duration-300 group/btn flex items-center justify-center">
            {isPremium ? "Inquire Now" : "Explore Course"}
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-8 sm:py-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Discover 1000+ Study Abroad Opportunities</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Study Abroad
              <span className="block bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                Courses Worldwide
              </span>
            </h1>
            
            <p className="text-base sm:text-lg mb-6 leading-relaxed max-w-2xl mx-auto text-blue-100">
              Explore top courses in Engineering, Business, IT, Medicine, and more from leading destinations 
              like USA, UK, Canada, Australia, and Germany with comprehensive support.
            </p>
            
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'premium' ? 'premium courses' : 'study abroad courses'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl text-gray-900 text-base focus:outline-none focus:ring-4 focus:ring-yellow-400/30 shadow-2xl border-0 transition-all duration-300 group-hover:shadow-yellow-400/20"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/919422129534"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <MessageSquare className="w-5 h-5" />
                Free Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-12 px-4 sm:px-6 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Explore Our Courses
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose between our premium preparation services or browse study abroad opportunities worldwide
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <TabButton
              active={activeTab === "premium"}
              onClick={() => setActiveTab("premium")}
              icon={Crown}
            >
              Our Premium Courses & Services
            </TabButton>
            <TabButton
              active={activeTab === "abroad"}
              onClick={() => setActiveTab("abroad")}
              icon={Globe}
            >
              Trending Study Abroad Courses
            </TabButton>
          </div>

          {/* Country Filters - Only show for Study Abroad tab */}
          {activeTab === "abroad" && (
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Filter by Destination
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {countryFilters.map((country) => (
                  <motion.button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCountry === country
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:shadow-lg"
                    }`}
                  >
                    {country === "All" ? "All Destinations" : country}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Courses Grid Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`inline-flex items-center gap-2 ${
                activeTab === "premium" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
              } px-4 py-2 rounded-full text-sm font-medium mb-4`}>
                {activeTab === "premium" ? <Crown className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                {activeTab === "premium" ? "Premium Support Services" : "Global Education Opportunities"}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {activeTab === "premium" ? "Our Premium Courses & Services" : "Trending Study Abroad Courses"}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {activeTab === "premium" 
                  ? "Comprehensive preparation and guidance packages to ensure your study abroad journey is successful and stress-free."
                  : "From top-ranked universities in USA and UK to specialized programs in Germany and Canada, find your perfect course with comprehensive support."
                }
              </p>
            </motion.div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course) => 
              renderCourseCard(course, activeTab === "premium")
            )}
          </motion.div>

          {filteredCourses.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No courses found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {activeTab === "premium" 
                  ? "We couldn't find any premium courses matching your search criteria. Try adjusting your search terms."
                  : "We couldn't find any courses matching your search criteria. Try adjusting your filters or search terms."
                }
              </p>
              <button
                onClick={() => {
                  setSelectedCountry("All");
                  setSearchQuery("");
                }}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Your Study Abroad Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who achieved their dreams with our comprehensive guidance and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919422129534"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <MessageSquare className="w-5 h-5" />
                Get Free Consultation
              </a>
              <button
                onClick={() => navigate('/inquiryform')}
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-purple-900 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Our Experts
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}