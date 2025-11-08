import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
} from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
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

  const WHATSAPP_NUMBER = "918999972278";
  const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

  const openWhatsApp = (text = "") => {
    const encoded = encodeURIComponent(text);
    window.open(`${WHATSAPP_BASE}?text=${encoded}`, "_blank");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const waMsg = `*New Inquiry*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone || "— "}\n` +
      `*Type:* ${formData.inquiryType}\n` +
      `*Subject:* ${formData.subject}\n` +
      `*Message:*\n${formData.message}`;

    openWhatsApp(waMsg);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "general",
    });

    alert("Message sent via WhatsApp!");
  };

  const contactMethods = [
    {
      title: "General Inquiries",
      icon: Mail,
      primary: "ssoverseasmanisha@gmail.com",
      secondary: "Get answers to general questions",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Phone Support",
      icon: Phone,
      primary: "+91 89999 72278",
      secondary: "Mon-Fri, 9AM-6PM IST",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Live Chat",
      icon: MessageSquare,
      primary: "Start Chat",
      secondary: "Available 24/7",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Emergency Support",
      icon: Phone,
      primary: "+91 89999 72278",
      secondary: "24/7 emergency",
      color: "bg-red-100 text-red-700",
    },
  ];

  const offices = [
    {
      city: "Nagpur (Maharashtra)",
      country: "India",
      address: "Plot No.26, Khandwekar Bunglow\n2nd Floor, Near Lendra Park\nRamdaspeth",
      zipCode: "440010",
      phone: "+91 89999 72278",
      email: "ssoverseasmanisha@gmail.com",
      hours: "Mon-Fri: 9AM-6PM IST",
      isHeadquarters: true,
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: `${WHATSAPP_BASE}?text=Hi%20from%20Facebook`, color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, url: `${WHATSAPP_BASE}?text=Hi%20from%20Twitter`, color: "hover:text-blue-400" },
    { name: "LinkedIn", icon: Linkedin, url: `${WHATSAPP_BASE}?text=Hi%20from%20LinkedIn`, color: "hover:text-blue-700" },
    { name: "Instagram", icon: Instagram, url: `${WHATSAPP_BASE}?text=Hi%20from%20Instagram`, color: "hover:text-pink-500" },
    { name: "YouTube", icon: Youtube, url: `${WHATSAPP_BASE}?text=Hi%20from%20YouTube`, color: "hover:text-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-purple-900 sm:py-20 sm:px-6 px-8 text-white py-20">
        <div className="container-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
              We're Here to
              <br />
              <span className="text-yellow-300">Help You Succeed</span>
            </h1>
            <p className="text-sm sm:text-xl text-teal-100 mb-8 leading-relaxed">
              Have questions? Need guidance? Contact us instantly via WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => openWhatsApp("Hi, I want to start a live chat.")}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Live Chat
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
              Reach Us Instantly
            </h2>
            <p className="text-lg text-gray-600">
              Tap any option to message on WhatsApp
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
                Fill the form and send directly to WhatsApp
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="+91 89999 72278"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Brief subject"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-vertical"
                    placeholder="Your message..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 py-4 text-white font-bold"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send via WhatsApp
                </Button>
              </form>
            </div>

            {/* Office Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Office</h2>
              <p className="text-lg text-gray-600 mb-8">
                Visit us or message directly
              </p>

              <div className="space-y-6">
                {offices.map((office, index) => (
                  <Card
                    key={index}
                    className={`border-0 shadow-lg ${office.isHeadquarters ? "ring-2 ring-green-600" : ""}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {office.city}
                            {office.isHeadquarters && (
                              <Badge className="ml-2 bg-green-600 text-white text-xs">
                                HQ
                              </Badge>
                            )}
                          </h3>
                          <p className="text-green-600 font-medium">
                            {office.country}
                          </p>
                        </div>
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-green-600" />
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                          <span className="whitespace-pre-line">
                            {office.address}
                            <br />
                            Nagpur - {office.zipCode}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a
                            href={`${WHATSAPP_BASE}?text=Hi,%20I%20saw%20your%20office%20contact.`}
                            className="text-green-600 hover:underline font-medium"
                          >
                            {office.phone}
                          </a>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a
                            href="mailto:ssoverseasmanisha@gmail.com"
                            className="text-green-600 hover:underline"
                          >
                            ssoverseasmanisha@gmail.com
                          </a>
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

            
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}