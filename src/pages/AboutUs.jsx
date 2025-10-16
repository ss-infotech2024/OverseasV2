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
  Users,
  Target,
  Heart,
  Star,
  Award,
  Globe,
  BookOpen,
  Lightbulb,
  Shield,
  Zap,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Trophy,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm"></header>
  );
};

export default function About() {
  const stats = [
    { label: "Students Placed", value: "700+", icon: Users },
    { label: "Partner Universities", value: "50+", icon: Building },
    { label: "Countries Covered", value: "7+", icon: Globe },
    { label: "Visa Success Rate", value: "95%", icon: Trophy },
  ];

  const values = [
    {
      title: "Student-First Approach",
      description:
        "We prioritize each student's unique needs, aspirations, and success above all else",
      icon: Heart,
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Global Opportunities",
      description:
        "Connecting Indian students with world-class education across 7+ countries",
      icon: Globe,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Transparency & Ethics",
      description:
        "Honest guidance and clear processes at every step of the journey",
      icon: Shield,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Future-Focused",
      description:
        "We don't just help with admissions - we prepare students for long-term success",
      icon: Target,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const team = [
    {
      name: "Rahul Sharma",
      role: "Founder & CEO",
      image: "👨‍💼",
      description:
        "Education entrepreneur with 10+ years in international student counseling",
      specialties: ["University Partnerships", "Strategic Growth"],
    },
    {
      name: "Priya Patel",
      role: "Head of Admissions",
      image: "👩‍🎓",
      description:
        "Expert in university applications with 8+ years of experience",
      specialties: ["SOP/LOR Guidance", "Profile Building"],
    },
    {
      name: "Amit Kumar",
      role: "Visa & Documentation",
      image: "👨‍💻",
      description:
        "Specialist in visa processing with 95% success rate across countries",
      specialties: ["Visa Interview Prep", "Documentation"],
    },
    {
      name: "Neha Gupta",
      role: "Test Preparation",
      image: "👩‍🏫",
      description:
        "IELTS/TOEFL/GRE expert with 7+ years of coaching experience",
      specialties: ["Test Strategies", "Score Improvement"],
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: "Company Founded",
      description: "Started with UK and Canada university partnerships",
    },
    {
      year: "2022",
      title: "Service Expansion",
      description: "Added test preparation and visa assistance services",
    },
    {
      year: "2023",
      title: "Global Reach",
      description: "Partnered with institutions in USA, Australia and Germany",
    },
    {
      year: "2024",
      title: "500+ Students Placed",
      description: "Crossed major milestone of student placements",
    },
    {
      year: "2025",
      title: "Virtual Services",
      description: "Launched online counseling and mentorship programs",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-purple-900 text-white py-20">
        <div className="container-padding py-12 sm:py-6 sm:px-6 px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl lg:text-6xl font-bold mb-6">
              Your Gateway to
              <br />
              <span className="text-yellow-300">Global Education</span>
            </h1>
            <p className="text-sm sm:text-xl text-teal-100 mb-8 leading-relaxed">
              SS Global EduConnect is a trusted overseas education consultancy
              helping Indian students achieve their dreams of studying in top
              destinations like USA, UK, Canada, Australia, and Europe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4"
              >
                <Users className="w-5 h-5 mr-2" />
                Meet Our Team
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Free Consultation
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-12 sm:py-20 sm:px-16 px-8 bg-gray-50">
        <div className="container-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-teal-100 text-teal-800">
                Our Story
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Trusted Overseas Education Consultants
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2021, SS Global EduConnect began with a vision to
                simplify the complex journey of studying abroad for Indian
                students. Starting with just a few partner universities and a
                small dedicated team, we've grown into a trusted brand known for
                personalized guidance and ethical practices.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Based in Nagpur with a growing global network, we serve aspiring
                students who dream of studying in top destinations worldwide.
                Our end-to-end support covers everything from university
                selection to post-arrival assistance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">
                    Personalized counseling for each student
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">
                    Strong network of 50+ university partnerships
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">
                    95% visa success rate across countries
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-3xl p-8 text-center">
                <div className="text-6xl mb-6">🌍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  "To empower students with the right knowledge, tools, and
                  guidance to pursue global education confidently. Your Future,
                  Our Focus."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-20 sm:px-6 px-8 bg-white">
        <div className="container-padding">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              Our Journey
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Milestones of Growth & Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From our founding in 2021 to serving 700+ students across 7+
              countries
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal-200"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-1/2 ${
                        index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                      }`}
                    >
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <Badge className="mb-3 bg-primary text-white">
                            {milestone.year}
                          </Badge>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-20 sm:px-6 px-8 bg-gray-50">
        <div className="container-padding">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800">
              Our Values
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Guides Our Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that shape every interaction and decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  >
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      {/* <section className="py-12 sm:py-20 sm:px-6 px-8 bg-purple-900 text-white">
        <div className="container-padding text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Begin Your Global Education Journey?
          </h2>
          <p className="text-sm sm:text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join 700+ students who have successfully pursued international education with our guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </Button>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-teal-100">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>info@ssglobaleduconnect.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Nagpur, Maharashtra</span>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
