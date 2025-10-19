import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import {
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  Star,
  Filter,
  Search,
  Globe,
  Download,
  CheckCircle,
  MessageSquare,
  MapPin,
  Calendar,
  DollarSign,
  Users as UsersIcon,
  ArrowRight,
  Shield,
  Award,
  Target,
  Heart,
  Zap,
  TrendingUp,
  Bookmark,
  Crown,
} from "lucide-react";
import { countries } from "../courses";

// Flatten all courses with country info for easy filtering
const allCourses = countries.flatMap(country =>
  country.courses.map(course => ({
    ...course,
    country: country.name,
    countryLink: country.viewMoreLink,
    countryFlag: country.flag, // Note: 'flag' is not defined in the provided data; you may need to add flag URLs
  }))
);

// Our additional courses data
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
    // price: "₹15,000",
    // originalPrice: "₹18,000",
    image: "/img/courses/ielts-toefl.jpg",
    description: "Focused training to improve English language skills for study abroad exams with personalized feedback",
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
    // price: "₹25,000",
    // originalPrice: "₹30,000",
    image: "/img/courses/gre-gmat.jpg",
    description: "Comprehensive coaching for competitive exams required for master's and MBA programs abroad",
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
    // price: "₹30,000",
    // originalPrice: "₹35,000",
    image: "/img/courses/admission-guidance.jpg",
    description: "End-to-end support for university selection and application process",
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
    // price: "₹10,000",
    // originalPrice: "₹12,000",
    image: "/img/courses/visa-assistance.jpg",
    description: "Complete support for visa documentation and interview preparation",
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
    // price: "₹5,000",
    // originalPrice: "₹7,000",
    image: "/img/courses/pre-departure.jpg",
    description: "Prepare for life abroad with cultural adaptation and practical guidance",
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
    // price: "₹7,000",
    // originalPrice: "₹9,000",
    image: "/img/courses/career-counseling.jpg",
    description: "Personalized counseling to choose the right course, country and university",
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

// Tab components
const TabButton = ({ active, onClick, icon: Icon, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
      active
        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg"
    }`}
  >
    <Icon className="w-5 h-5" />
    {children}
  </button>
);

export default function Courses() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("premium"); // 'premium' or 'abroad'
  const navigate = useNavigate();

  // Extract unique countries for filters
  const countryFilters = ["All", ...countries.map(c => c.name)];

  // Filter study abroad courses based on country and search
  const filteredAbroadCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesCountry = selectedCountry === "All" || course.country === selectedCountry;
      const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCountry && matchesSearch;
    });
  }, [selectedCountry, searchQuery]);

  // Filter premium courses based on search
  const filteredPremiumCourses = useMemo(() => {
    return ourCourses.filter((course) => {
      return course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
             course.category.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  // Get current courses based on active tab
  const currentCourses = activeTab === "premium" ? filteredPremiumCourses : filteredAbroadCourses;
  const showCountryFilter = activeTab === "abroad";

  // Function to handle image errors
  const handleImageError = (e, courseName) => {
    e.target.src = `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=${encodeURIComponent(courseName)}`;
  };

  // Render course card based on type
  const renderCourseCard = (course, isPremium = false) => {
    if (isPremium) {
      return (
        <div
          key={course.id}
          className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
        >
          {/* Course Header */}
          <div className="relative h-48 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
            <img 
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => handleImageError(e, course.title)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {course.bestseller && (
                <Badge className="bg-yellow-500 text-white border-0 font-medium">
                  <Zap className="w-3 h-3 mr-1" />
                  Bestseller
                </Badge>
              )}
              {course.popular && (
                <Badge className="bg-pink-500 text-white border-0 font-medium">
                  <Heart className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>
            
            {/* Discount Badge */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-500 text-white border-0 font-medium">
                {course.discount}
              </Badge>
            </div>

            {/* Category */}
            <div className="absolute bottom-4 left-4">
              <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-gray-700 border-0">
                {course.category}
              </Badge>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                {course.level}
              </Badge>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                <span className="text-xs text-gray-500">({course.students})</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
              {course.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {course.description}
            </p>

            {/* Instructor */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Users className="w-4 h-4" />
              <span>By {course.instructor}</span>
            </div>

            {/* Course Details */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {course.students.toLocaleString()}+ students
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-gray-900">{course.price}</span>
              <span className="text-lg text-gray-500 line-through">{course.originalPrice}</span>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl py-3 font-medium transition-all duration-300 group/btn">
              Inquiry  Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={course.id}
          className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2"
          onClick={() => navigate(course.link)}
        >
          {/* Course Header with Image */}
          <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden">
            <img 
              src={course.img} // Updated to use the img path from countries data
              alt={course.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => handleImageError(e, course.name)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Country Flag */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
              <img 
                src={course.countryFlag} 
                alt={course.country}
                className="w-4 h-3 object-cover rounded"
              />
              <span className="text-xs font-medium text-gray-700">{course.country}</span>
            </div>
            
            {/* Qualification Badge */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-white/90 backdrop-blur-sm text-purple-700 border-0 font-medium">
                {course.qualification}
              </Badge>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors">
              {course.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {course.description}
            </p>

            {/* Course Details */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                {course.tuition}
              </span>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600">Entry: {course.entryRequirements}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600">Careers: {course.careerProspects}</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl py-3 font-medium transition-all duration-300 group/btn">
              Explore Course
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-12 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container-padding text-center max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Discover 1000+ Study Abroad Opportunities</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Study Abroad
            <span className="block bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              Courses Worldwide
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl mx-auto text-blue-100">
            Explore top courses in Engineering, Business, IT, Medicine, and more from leading destinations like Germany, UK, USA, Canada, and Australia.
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'premium' ? 'premium courses' : 'study abroad courses'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400/30 shadow-2xl border-0 transition-all duration-300 group-hover:shadow-yellow-400/20"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/919422129534"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Free Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="container-padding">
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
          {showCountryFilter && (
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Filter by Destination
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {countryFilters.map((country) => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCountry === country
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {country !== "All" && (
                        <img 
                          src={countries.find(c => c.name === country)?.flag} 
                          alt=""
                          className="w-4 h-3 object-cover rounded"
                        />
                      )}
                      {country === "All" ? "All Destinations" : country}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Courses Grid Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="container-padding">
          <div className="text-center mb-12 sm:mb-16">
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
                : "From tuition-free programs in Germany to top-ranked universities in the USA and UK, find your perfect course with comprehensive support."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {currentCourses.map((course) => 
              renderCourseCard(course, activeTab === "premium")
            )}
          </div>

          {currentCourses.length === 0 && (
            <div className="text-center py-16">
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
              <Button
                onClick={() => {
                  setSelectedCountry("All");
                  setSearchQuery("");
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
        <div className="container-padding text-center max-w-4xl mx-auto">
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
            >
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-2xl"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Get Free Consultation
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-2xl"
              onClick={() => navigate('/contact')}
            >
              Contact Our Experts
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}