import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Services() {
  const studyAbroadServices = [
    {
      title: "Study Abroad Counseling",
      description:
        "Personalized guidance to choose the right country, course, and university based on your academic goals",
      icon: Globe,
      features: [
        "1-on-1 expert sessions with experienced counselors",
        "Comprehensive country & course comparison analysis",
        "Career-oriented approach to decision making",
        "Personalized roadmap for your study abroad journey",
        "In-depth evaluation of your academic profile",
      ],
      popular: false,
    },
    {
      title: "University Application Assistance",
      description:
        "End-to-end support for applying to top international universities with well-crafted applications",
      icon: FileSearch,
      features: [
        "Professional SOP/LOR/Resume writing support",
        "Step-by-step application form filling guidance",
        "Profile enhancement tips for competitive edge",
        "University-specific application strategy",
        "Document verification and submission support",
      ],
      popular: true,
    },
    {
      title: "Test Preparation Coaching",
      description:
        "Comprehensive training for IELTS, TOEFL, GRE, GMAT, and other required entrance exams",
      icon: BookOpen,
      features: [
        "Certified trainers with proven results",
        "Flexible online & offline batch options",
        "Regular mock tests with detailed feedback",
        "Personalized study plans based on diagnostic tests",
        "Exam strategies and time management techniques",
      ],
      popular: false,
    },
    {
      title: "Visa Guidance & Processing",
      description:
        "Complete visa support from document preparation to interview coaching",
      icon: Bookmark,
      features: [
        "Comprehensive visa documentation checklist",
        "Visa SOP and financial proof assistance",
        "Realistic mock interviews with feedback",
        "98% visa success rate across countries",
        "Country-specific visa application guidance",
      ],
      popular: false,
    },
    {
      title: "Scholarship & Financial Aid Support",
      description:
        "Expert assistance in finding and applying for scholarships and funding opportunities",
      icon: DollarSign,
      features: [
        "Access to country-specific scholarship databases",
        "Professional help with scholarship applications & essays",
        "Personalized budget planning guidance",
        "Financial documentation preparation",
        "Tips for increasing scholarship chances",
      ],
      popular: false,
    },
    {
      title: "Pre-Departure & Post-Arrival Services",
      description:
        "Complete orientation and support for a smooth transition abroad",
      icon: Plane,
      features: [
        "Detailed pre-departure briefing sessions",
        "Airport pickup arrangements (where applicable)",
        "Assistance with accommodation options",
        "Local support network connections",
        "Cultural adaptation guidance",
      ],
      popular: false,
    },
    {
      title: "Profile Building & Skill Development",
      description:
        "Strategic help to build a standout profile with internships, certifications, and projects",
      icon: UserCircle,
      features: [
        "Curated internship & volunteering opportunities",
        "MOOC/course suggestions (Coursera, edX, etc.)",
        "LinkedIn profile optimization",
        "Professional resume/CV development",
        "Portfolio building for creative fields",
      ],
      popular: false,
    },
    {
      title: "Parent Counseling & Financial Planning",
      description:
        "Specialized sessions for parents covering all aspects of study abroad",
      icon: Users,
      features: [
        "ROI-focused country/course analysis",
        "Comprehensive safety & housing assurance",
        "EMI/Loan guidance with trusted banking partners",
        "Education loan documentation support",
        "Post-study return on investment projections",
      ],
      popular: false,
    },
    {
      title: "Post-Study Work & PR Guidance",
      description:
        "Strategic advice on work permits, stay-back options, and permanent residency pathways",
      icon: Briefcase,
      features: [
        "Country-specific work visa information",
        "PR pathways & eligibility tracking",
        "Current job market trends analysis",
        "Professional networking strategies",
        "Long-term career planning abroad",
      ],
      popular: false,
    },
  ];

  const supportFeatures = [
    {
      title: "Expert Counselors",
      description: "Get guidance from experienced study abroad professionals",
      icon: Users,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "100% Success Rate",
      description: "Proven track record of successful applications",
      icon: CheckCircle,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "End-to-End Support",
      description: "Comprehensive assistance from application to arrival",
      icon: Shield,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Global Network",
      description: "Partnerships with top universities worldwide",
      icon: Globe,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        className="bg-purple-900 text-white py-20 px-8"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-padding">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-3xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              Study Abroad
              <br />
              <span className="text-yellow-400">Support Services</span>
            </motion.h1>
            <motion.p
              className="sm:text-xl text-lg text-lightLavender mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              From university selection to visa processing, we provide
              end-to-end support for your international education journey.
              Choose from our comprehensive services designed for your success.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-12 sm:py-20 sm:px-6 px-8">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Study Abroad Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support for every step of your international
              education journey
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {studyAbroadServices.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  className={`relative border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${
                    service.popular
                      ? "ring-2 ring-teal-500 transform scale-105"
                      : ""
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-teal-500 text-white px-4 py-1 shadow-md">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <motion.div
                      className="w-14 h-14 bg-lightLavender rounded-2xl flex items-center justify-center mb-4"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <service.icon className="w-7 h-7 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl mb-2">
                      {service.title}
                    </CardTitle>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact">
                      <Button
                        className={`w-full text-white ${
                          service.popular
                            ? "bg-purple-900 hover:bg-primary"
                            : "bg-purple-900 hover:bg-indigo-800"
                        }`}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Support Features */}
      <section className="py-12 sm:py-20 sm:px-6 px-8 bg-white">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support to make your study abroad journey
              smooth and successful
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-lg text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                    >
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
