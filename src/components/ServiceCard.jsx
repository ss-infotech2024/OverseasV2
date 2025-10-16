// File: src/components/Services.jsx
import { useState } from "react";
import { 
  Users, 
  MapPin, 
  FileText, 
  Globe, 
  TrendingUp, 
  Briefcase, 
  CheckCircle, 
  ArrowRight,
  Star,
  Award,
  Shield,
  Clock,
  MessageCircle,
  Video,
  Calendar,
  Download,
  Phone,
  Mail
} from "lucide-react";

// Button Component
const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105';
  
  const variants = {
    default: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  };
  
  const sizes = {
    default: 'h-12 py-3 px-6',
    sm: 'h-10 px-4 text-sm',
    lg: 'h-14 px-8 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Component
const Card = ({ children, className = '', hover = false }) => (
  <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 ${hover ? 'hover:shadow-xl hover:border-blue-200 hover:-translate-y-2' : ''} ${className}`}>
    {children}
  </div>
);

// Badge Component
const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-green-100 text-green-800',
    outline: 'border border-gray-300 text-gray-700',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const stats = [
    { number: "10,000+", label: "Students Guided", icon: Users, color: "text-blue-600" },
    { number: "95%", label: "Visa Success Rate", icon: Award, color: "text-green-600" },
    { number: "50+", label: "Partner Universities", icon: Globe, color: "text-purple-600" },
    { number: "15+", label: "Countries Covered", icon: MapPin, color: "text-orange-600" },
  ];

  const services = [
    {
      id: 1,
      icon: Users,
      title: "Counseling & Profile Evaluation",
      description: "Personalized 1-on-1 sessions to assess your academic strengths and guide your goals.",
      features: [
        "Comprehensive profile analysis",
        "Career path assessment",
        "Strength & gap identification",
        "Personalized roadmap creation",
        "Multiple counseling sessions"
      ],
      duration: "60-90 mins",
      sessions: "3+ Sessions",
      popular: true,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      price: "Free",
      cta: "Book Free Session"
    },
    {
      id: 2,
      icon: Globe,
      title: "Country & University Selection",
      description: "Get curated lists of institutions based on budget, goals, and career prospects.",
      features: [
        "100+ university shortlisting",
        "Country comparison analysis",
        "ROI & job market evaluation",
        "Admission probability assessment",
        "Scholarship opportunities"
      ],
      duration: "2-3 weeks",
      sessions: "Complete Package",
      popular: false,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      price: "₹15,000",
      originalPrice: "₹20,000",
      cta: "Get University List"
    },
    {
      id: 3,
      icon: FileText,
      title: "Application & Admission Help",
      description: "Stand out with expert help on SOPs, LORs, resumes, and application portals.",
      features: [
        "SOP writing & editing",
        "LOR drafting assistance",
        "Resume optimization",
        "Application form filling",
        "Document verification"
      ],
      duration: "4-6 weeks",
      sessions: "End-to-end Support",
      popular: true,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      price: "₹25,000",
      originalPrice: "₹35,000",
      cta: "Start Application"
    },
    {
      id: 4,
      icon: Shield,
      title: "Visa Filing & Documentation",
      description: "Full guidance through visa forms, embassy procedures, and interviews.",
      features: [
        "Visa document preparation",
        "Mock interview sessions",
        "Financial documentation",
        "Appointment scheduling",
        "Post-submission tracking"
      ],
      duration: "3-4 weeks",
      sessions: "Complete Processing",
      popular: false,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      price: "₹12,000",
      originalPrice: "₹18,000",
      cta: "Begin Visa Process"
    },
    {
      id: 5,
      icon: TrendingUp,
      title: "Loan Assistance",
      description: "Secure quick approvals and low-interest loans via trusted financial partners.",
      features: [
        "Loan eligibility assessment",
        "Bank & scheme selection",
        "Documentation assistance",
        "Application processing",
        "Sanction guidance"
      ],
      duration: "1-2 weeks",
      sessions: "Complete Support",
      popular: false,
      color: "from-teal-500 to-blue-500",
      bgColor: "bg-teal-50",
      price: "Free*",
      note: "*No hidden charges",
      cta: "Check Eligibility"
    },
    {
      id: 6,
      icon: Briefcase,
      title: "Internship Support",
      description: "Find global internship opportunities tailored to tech & non-tech profiles.",
      features: [
        "Internship search strategy",
        "Resume & cover letter",
        "Interview preparation",
        "Offer negotiation",
        "Visa assistance"
      ],
      duration: "4-8 weeks",
      sessions: "Placement Support",
      popular: true,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      price: "₹18,000",
      originalPrice: "₹25,000",
      cta: "Find Internships"
    }
  ];

  const features = [
    {
      icon: CheckCircle,
      title: "10+ Years Experience",
      description: "Trusted by thousands of students worldwide"
    },
    {
      icon: Users,
      title: "1-on-1 Mentorship",
      description: "Dedicated counselor for personalized guidance"
    },
    {
      icon: Shield,
      title: "100% Confidential",
      description: "Your data and dreams are safe with us"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your queries"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "Free profile evaluation and goal setting",
      duration: "30-45 mins"
    },
    {
      step: 2,
      title: "Plan Creation",
      description: "Personalized roadmap with timelines",
      duration: "3-5 days"
    },
    {
      step: 3,
      title: "Execution",
      description: "End-to-end support in your journey",
      duration: "Ongoing"
    },
    {
      step: 4,
      title: "Success Celebration",
      description: "Welcome to your dream university!",
      duration: "Lifetime"
    }
  ];

  const handleBookService = (service) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const BookingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full mx-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Book Your Service</h3>
            <button 
              onClick={() => setShowBookingModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
          
          {selectedService && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-12 h-12 bg-gradient-to-r ${selectedService.color} rounded-lg flex items-center justify-center`}>
                  <selectedService.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedService.title}</h4>
                  <p className="text-sm text-gray-600">{selectedService.price === "Free" ? "Complimentary Service" : `Starting at ${selectedService.price}`}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date & Time</label>
                  <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowBookingModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 mb-4">
              Our Premium Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              End-to-End Study Abroad
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive services designed to make your study abroad journey seamless, 
              successful, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                hover={true}
                className="relative overflow-hidden"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-yellow-500 text-white border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="p-6">
                  {/* Service Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Service Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Duration & Sessions */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </span>
                    <span>{service.sessions}</span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                      {service.originalPrice && (
                        <span className="text-lg text-gray-500 line-through ml-2">{service.originalPrice}</span>
                      )}
                      {service.note && (
                        <span className="text-sm text-gray-500 block">{service.note}</span>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg`}
                    onClick={() => handleBookService(service)}
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm mb-4">
              How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Your Success Journey
              <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text">
                In 4 Simple Steps
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={step.step} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-yellow-400/30 transform translate-x-12"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-blue-100 mb-2">{step.description}</p>
                <div className="text-yellow-300 text-sm font-medium">{step.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-green-100 text-green-800 mb-4">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Your Success is Our
                <span className="block text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text">
                  Priority
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We go beyond traditional counseling to provide comprehensive support 
                that ensures your study abroad dreams become reality.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 shadow-2xl">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Begin Your Journey?</h3>
                  <p className="text-gray-600 mb-6">
                    Book a free consultation with our experts and take the first step towards your dream education.
                  </p>
                  
                  <div className="space-y-4">
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      onClick={() => handleBookService(services[0])}
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Free Session
                    </Button>
                    
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>9422129534</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>ssoverseas333@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

    

      {/* Booking Modal */}
      {showBookingModal && <BookingModal />}
    </div>
  );
}