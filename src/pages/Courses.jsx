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
    title: "IELTS & TOEFL Prep",
    instructor: "Language Experts",
    category: "Test Preparation",
    level: "Beginner to Advanced",
    duration: "8 weeks",
    students: 3250,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Training for study abroad exams.",
    features: ["Practice tests"],
    bestseller: true,
    popular: true,
    discount: "17% OFF"
  },
  {
    id: 2,
    title: "GRE / GMAT Coaching",
    instructor: "Quant & Verbal Experts",
    category: "Test Preparation",
    level: "Intermediate",
    duration: "12 weeks",
    students: 1870,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Coaching for master's and MBA exams.",
    features: ["Mock tests"],
    bestseller: true,
    popular: true,
    discount: "17% OFF"
  },
  {
    id: 3,
    title: "Admission Guidance",
    instructor: "Admission Specialists",
    category: "Admission Guidance",
    level: "All Levels",
    duration: "Ongoing",
    students: 2430,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Support for university applications.",
    features: ["SOP/LOR writing"],
    bestseller: false,
    popular: true,
    discount: "14% OFF"
  },
  {
    id: 4,
    title: "Visa Assistance",
    instructor: "Visa Experts",
    category: "Visa Assistance",
    level: "All Levels",
    duration: "4 weeks",
    students: 4120,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1589561084287-1b64b8a0d4e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Visa documentation support.",
    features: ["Document checklist"],
    bestseller: false,
    popular: false,
    discount: "17% OFF"
  },
  {
    id: 5,
    title: "Pre-Departure Program",
    instructor: "Student Advisors",
    category: "Pre-Departure",
    level: "All Levels",
    duration: "2 weeks",
    students: 1560,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Prepare for life abroad.",
    features: ["Cultural sessions"],
    bestseller: false,
    popular: false,
    discount: "29% OFF"
  },
  {
    id: 6,
    title: "Career Counselling",
    instructor: "Career Experts",
    category: "Career Counseling",
    level: "All Levels",
    duration: "Ongoing",
    students: 2890,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Choose the right course and country.",
    features: ["Career assessment"],
    bestseller: false,
    popular: true,
    discount: "22% OFF"
  },
];

// Sample study abroad courses with proper images
const studyAbroadCourses = [
  {
    id: 1,
    name: "Computer Science",
    description: "AI and software development program.",
    duration: "4 years",
    tuition: "$25,000/year",
    country: "USA",
    countryFlag: "🇺🇸",
    qualification: "Bachelor's",
    entryRequirements: "SAT 1200+, IELTS 6.5",
    careerProspects: "Software Engineer",
    image: courseImages["Computer Science"],
    link: "/course/cs-engineering"
  },
  {
    id: 2,
    name: "MBA in Business",
    description: "Global business strategies and leadership.",
    duration: "2 years",
    tuition: "$35,000/year",
    country: "UK",
    countryFlag: "🇬🇧",
    qualification: "Master's",
    entryRequirements: "GMAT 650+, IELTS 7.0",
    careerProspects: "Business Consultant",
    image: courseImages["Business"],
    link: "/course/mba-international"
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    description: "Robotics and sustainable energy program.",
    duration: "4 years",
    tuition: "€15,000/year",
    country: "Germany",
    countryFlag: "🇩🇪",
    qualification: "Bachelor's",
    entryRequirements: "Abitur equivalent, IELTS 6.0",
    careerProspects: "Mechanical Engineer",
    image: courseImages["Engineering"],
    link: "/course/mechanical-engineering"
  },
  {
    id: 4,
    name: "Medicine (MBBS)",
    description: "Medical program with clinical rotations.",
    duration: "6 years",
    tuition: "$40,000/year",
    country: "Australia",
    countryFlag: "🇦🇺",
    qualification: "Doctoral",
    entryRequirements: "NEET qualified, IELTS 7.0",
    careerProspects: "Doctor",
    image: courseImages["Medicine"],
    link: "/course/medicine-mbbs"
  },
  {
    id: 5,
    name: "Data Science",
    description: "Big data and machine learning program.",
    duration: "2 years",
    tuition: "$28,000/year",
    country: "Canada",
    countryFlag: "🇨🇦",
    qualification: "Master's",
    entryRequirements: "GRE 310+, IELTS 6.5",
    careerProspects: "Data Scientist",
    image: courseImages["Computer Science"],
    link: "/course/data-science"
  },
  {
    id: 6,
    name: "International Relations",
    description: "Global politics and diplomacy study.",
    duration: "3 years",
    tuition: "£18,000/year",
    country: "UK",
    countryFlag: "🇬🇧",
    qualification: "Bachelor's",
    entryRequirements: "IELTS 6.5, Personal Statement",
    careerProspects: "Diplomat",
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
    className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
      active
        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
        : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:shadow-lg"
    }`}
  >
    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
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
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-purple-200 h-full flex flex-col"
        onClick={() => navigate('/inquiryform', { state: { course: isPremium ? course.title : course.name, country: course.country } })}
      >
        {/* Course Header with Image */}
        <div className="relative h-16 sm:h-20 md:h-24 overflow-hidden">
          <img 
            src={courseImage}
            alt={isPremium ? course.title : course.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => handleImageError(e, isPremium ? course.title : course.name, course.category)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Badges */}
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
            {isPremium ? (
              <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium bg-green-500 text-white">
                {course.discount}
              </span>
            ) : (
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1">
                <span className="text-sm sm:text-base">{course.countryFlag}</span>
                <span className="text-[8px] sm:text-[10px] font-medium text-gray-700">{course.country}</span>
              </div>
            )}
          </div>

          {/* Category/Qualification */}
          <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2">
            <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-medium bg-white/90 backdrop-blur-sm text-gray-700">
              {isPremium ? course.category : course.qualification}
            </span>
          </div>

          {/* Premium Badges */}
          {isPremium && (course.bestseller || course.popular) && (
            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 flex gap-1 sm:gap-2">
              {course.bestseller && (
                <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-medium bg-yellow-500 text-white">
                  <Zap className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5" />
                  Bestseller
                </span>
              )}
              {course.popular && (
                <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-medium bg-pink-500 text-white">
                  <Heart className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5" />
                  Popular
                </span>
              )}
            </div>
          )}
        </div>

        {/* Course Content */}
        <div className="p-2 sm:p-3 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[8px] sm:text-[10px] border border-blue-200 text-blue-700 bg-blue-50">
              {course.level || "Full Time"}
            </span>
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] sm:text-xs font-medium text-gray-700">{course.rating}</span>
              {isPremium && (
                <span className="text-[8px] sm:text-[10px] text-gray-500">({course.students})</span>
              )}
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
            {isPremium ? course.title : course.name}
          </h3>
          
          <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-2 flex-1">
            {course.description}
          </p>

          {/* Instructor/Country */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3">
            <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{isPremium ? course.instructor : course.country}</span>
          </div>

          {/* Course Details */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {isPremium ? course.price : course.tuition}
            </span>
          </div>

          {/* Features for premium courses - Show 1 on mobile, all on larger screens */}
          {isPremium && course.features && (
            <>
              <div className="space-y-1 mb-2 sm:mb-3 hidden sm:block">
                {course.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-1.5">
                    <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-[10px] sm:text-xs text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1 mb-2 sm:hidden">
                {course.features.slice(0, 1).map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-1.5">
                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-[10px] text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-md py-1.5 sm:py-2 font-medium transition-all duration-300 group/btn flex items-center justify-center text-[10px] sm:text-xs">
            {isPremium ? "Inquire" : "Explore"}
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-8 px-3 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-blue-500/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 mb-3 sm:mb-4 border border-white/20">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs font-medium">1000+ Study Abroad Courses</span>
            </div>
            
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              Study Abroad
              <span className="block bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                Courses Worldwide
              </span>
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed max-w-xl mx-auto text-blue-100">
              Top courses in Engineering, Business, IT, and more.
            </p>
            
            <div className="max-w-xl mx-auto mb-4 sm:mb-6">
              <div className="relative group">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 z-10" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'premium' ? 'premium courses' : 'study abroad courses'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 rounded-xl text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400/30 shadow-md border-0 transition-all duration-300 group-hover:shadow-yellow-400/20"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center">
              <a
                href="https://wa.me/919422129534"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-xl shadow-md hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-1 text-xs sm:text-sm"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                Free Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 px-3 sm:px-6 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Explore Our Courses
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Premium services or study abroad opportunities
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
            <TabButton
              active={activeTab === "premium"}
              onClick={() => setActiveTab("premium")}
              icon={Crown}
            >
              Premium Courses
            </TabButton>
            <TabButton
              active={activeTab === "abroad"}
              onClick={() => setActiveTab("abroad")}
              icon={Globe}
            >
              Study Abroad
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
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                Filter by Destination
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {countryFilters.map((country) => (
                  <motion.button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
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
      <section className="py-8 px-3 sm:px-6 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`inline-flex items-center gap-1.5 ${
                activeTab === "premium" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
              } px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium mb-3 sm:mb-4`}>
                {activeTab === "premium" ? <Crown className="w-3 h-3 sm:w-4 sm:h-4" /> : <Globe className="w-3 h-3 sm:w-4 sm:h-4" />}
                {activeTab === "premium" ? "Premium Services" : "Global Courses"}
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                {activeTab === "premium" ? "Premium Courses" : "Study Abroad Courses"}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
                {activeTab === "premium" 
                  ? "Preparation and guidance for success."
                  : "Top programs in USA, UK, Canada, and more."
                }
              </p>
            </motion.div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 sm:gap-4 lg:gap-6"
          >
            {filteredCourses.map((course) => 
              renderCourseCard(course, activeTab === "premium")
            )}
          </motion.div>

          {filteredCourses.length === 0 && (
            <motion.div 
              className="text-center py-8 sm:py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">No courses found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
                {activeTab === "premium" 
                  ? "No premium courses match your search."
                  : "No courses match your filters."
                }
              </p>
              <button
                onClick={() => {
                  setSelectedCountry("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 px-3 sm:px-6 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              Start Your Study Abroad Journey
            </h2>
            <p className="text-sm sm:text-base text-blue-100 mb-4 sm:mb-6 max-w-lg mx-auto">
              Achieve your dreams with our guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <a
                href="https://wa.me/919422129534"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-6 sm:py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 text-xs sm:text-sm"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                Free Consultation
              </a>
              <button
                onClick={() => navigate('/inquiryform')}
                className="px-4 py-2 sm:px-6 sm:py-3 border border-white text-white hover:bg-white hover:text-purple-900 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 text-xs sm:text-sm"
              >
                Contact Experts
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}