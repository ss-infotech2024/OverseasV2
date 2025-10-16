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
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Globe,
  Users,
  Calendar,
  Headphones,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbxJ9MyagVfqVf3KWOKMxrO2vr9dhcr9E3BytyMUO5hL1AIq3M4g6mRva-fVmXY7d61qjg/exec";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.result === "success") {
        alert("✅ Form submitted successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          inquiryType: "general",
        });
      } else {
        alert("❌ Submission failed: " + result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("⚠️ Network error. Please try again.");
    }

    // // Handle form submission here    //"AKfycbwtrI85wfmZ7t9XeojW5bXLActNC1ByEhrnBjow5tIi";
    // console.log("Form submitted:", formData);
    // alert("Thank you for your message! We'll get back to you soon.");
  };

  const contactMethods = [
    {
      title: "General Inquiries",
      icon: Mail,
      primary: "ssoverseas333@gamil.com",
      secondary: "Get answers to general questions",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Phone Support",
      icon: Phone,
      primary: "+91 9422129534",
      secondary: "Mon-Fri, 9AM-6PM PST",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Live Chat",
      icon: MessageSquare,
      primary: "Start Chat",
      secondary: "Available 24/7 for urgent support",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Emergency Support",
      icon: Headphones,
      primary: "+91 9422129534",
      secondary: "24/7 emergency assistance",
      color: "bg-red-100 text-red-700",
    },
  ];

  const offices = [
    {
      city: "Nagpur (Maharashtra)",
      country: "India",
      address: "Near Lendra Park Ramdaspeth,Nagpur-",
      zipCode: "440010",
      phone: "+91 94221 29534",
      email: "ssoverseas.contact@gmail.com",
      hours: "Mon-Fri: 9AM-6PM PST",
      isHeadquarters: true,
    },
  ];

  const faqs = [
    {
      question: "How quickly will I receive a response?",
      answer:
        "We typically respond to all inquiries within 2-4 hours during business hours. For urgent matters, please call our emergency support line.",
    },
    {
      question: "What information should I include in my inquiry?",
      answer:
        "Please include your full name, preferred contact method, and a detailed description of your question or the assistance you need.",
    },
    {
      question: "Do you offer support in multiple languages?",
      answer:
        "Yes, we provide support in English, Spanish, French, German, Mandarin, and Arabic. Select your preferred language when contacting us.",
    },
    {
      question: "Can I schedule a video consultation?",
      answer:
        "Absolutely! We offer free 30-minute video consultations. Use our calendar booking system or mention this in your inquiry.",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "#",
      color: "hover:text-blue-600",
    },
    { name: "Twitter", icon: Twitter, url: "#", color: "hover:text-blue-400" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "#",
      color: "hover:text-blue-700",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
      color: "hover:text-pink-500",
    },
    { name: "YouTube", icon: Youtube, url: "#", color: "hover:text-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className=" bg-purple-900  sm:py-20 sm:px-6 px-8  text-white py-20">
        <div className="container-padding">
          <div className="text-center max-w-4xl mx-auto">
            {/* <Badge className="mb-6 bg-yellow-400 text-black px-4 py-2">
              Get In Touch
            </Badge> */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
              We're Here to
              <br />
              <span className="text-yellow-300">Help You Succeed</span>
            </h1>
            <p className="text-sm sm:text-xl text-teal-100 mb-8 leading-relaxed">
              Have questions about our services? Need guidance on your
              educational journey? Our expert team is ready to provide
              personalized support and answers to all your inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Live Chat
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 sm:py-20 sm:px-6 px-8 bg-white">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-lg text-gray-600">
              Choose the contact method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div
                    className={`w-14 h-14 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <method.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-lg font-semibold text-primary mb-2">
                    {method.primary}
                  </p>
                  <p className="text-sm text-gray-600">{method.secondary}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-teal-200 hover:border-teal-300"
                  >
                    Contact Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-12 sm:py-20 sm:px-6 px-8">
        <div className="container-padding">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="+91 9422129534"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="admissions">University Admissions</option>
                      <option value="courses">Course Information</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-vertical"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-darkPurple py-4 text-white"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Office Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Offices</h2>
              <p className="text-lg text-gray-600 mb-8">
                Visit us at one of our offices around the world or reach out to
                our local teams.
              </p>

              <div className="space-y-6">
                {offices.map((office, index) => (
                  <Card
                    index={0}
                    key={index}
                    className={`border-0 shadow-lg ${
                      office.isHeadquarters ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {office.city}
                            {office.isHeadquarters && (
                              <Badge className="ml-2 bg-primary text-white text-xs">
                                HQ
                              </Badge>
                            )}
                          </h3>
                          <p className="text-primary font-medium">
                            {office.country}
                          </p>
                        </div>
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>
                            {office.address}
                            <br />
                            {office.zipCode}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{office.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{office.hours}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 transition-colors ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Support Banner */}
      <section className="py-12 sm:py-20 sm:px-6 px-8 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="container-padding text-center">
          <h3 className="text-2xl font-bold mb-4">
            Need Immediate Assistance?
          </h3>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            For urgent matters requiring immediate attention, our emergency
            support team is available 24/7 to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-8 py-4"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Emergency Line
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Emergency Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
