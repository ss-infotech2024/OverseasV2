import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  FileText,
  DollarSign,
  Award,
  ArrowRight,
  CheckCircle,
  MessageCircle
} from 'lucide-react';

const StepsSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [hoveredStep, setHoveredStep] = useState(null);

  const WHATSAPP_NUMBER = "918999972278";
  const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

  const openWhatsApp = (stepTitle, message) => {
    const text = `*Inquiry:* ${stepTitle}\n${message}`;
    const encoded = encodeURIComponent(text);
    window.open(`${WHATSAPP_BASE}?text=${encoded}`, "_blank");
  };

  const steps = [
    {
      number: 1,
      title: "Education Counseling",
      description: "One-on-one counseling with our country specialists. Shortlist your ideal destination, institution, and program with expert guidance tailored to your aspirations.",
      shortDescription: "Personalized guidance for your study abroad journey",
      buttonText: "Get Free Counseling",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      gradient: "bg-purple-600",
      icon: Users,
      textColor: "text-purple-700",
      features: ["Country Selection", "University Shortlisting", "Course Guidance", "Career Planning"]
    },
    {
      number: 2,
      title: "University Applications",
      description: "Streamlined application process with our expert team. We handle everything from document preparation to submission, maximizing your admission chances.",
      shortDescription: "Seamless application process for top universities",
      buttonText: "Start Application",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      gradient: "bg-blue-600",
      icon: FileText,
      textColor: "text-blue-700",
      features: ["SOP & LOR Support", "Document Preparation", "Application Tracking", "Admission Support"]
    },
    {
      number: 3,
      title: "Loans & Scholarships",
      description: "Unlock financial opportunities with our dedicated support. Access exclusive scholarships and education loans to make your dream education affordable.",
      shortDescription: "Financial support for your education dreams",
      buttonText: "Explore Funding",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      gradient: "bg-green-600",
      icon: DollarSign,
      textColor: "text-green-700",
      features: ["Scholarship Guidance", "Loan Assistance", "Financial Planning", "Document Support"]
    },
    {
      number: 4,
      title: "Visa Processing",
      description: "Expert visa guidance with a proven success rate. Our comprehensive support ensures your visa application stands the best chance of approval.",
      shortDescription: "Expert visa assistance with high success rate",
      buttonText: "Get Visa Help",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      gradient: "bg-orange-600",
      icon: Award,
      textColor: "text-orange-700",
      features: ["Document Checklist", "Mock Interviews", "Application Review", "99% Success Rate"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % steps.length) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: { width: `${(activeStep / steps.length) * 100}%`, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6"
          >
            <MessageCircle className="w-4 h-4" />
            Your Journey Starts Here
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Your Path to 
            <span className="block text-blue-600">Global Education</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Follow our proven 4-step process to turn your study abroad dreams into reality with expert guidance at every stage.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.number;

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={`relative rounded-2xl p-8 border-2 transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? `${step.bgColor} ${step.borderColor} shadow-xl ring-2 ring-${step.gradient.split('-')[1]}-500 ring-opacity-30` 
                    : 'bg-white border-gray-200 shadow-lg'
                }`}
                onMouseEnter={() => setHoveredStep(step.number)}
                onMouseLeave={() => setHoveredStep(null)}
                onClick={() => setActiveStep(step.number)}
              >
                {/* Step Number Badge */}
                <motion.div
                  className={`absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg ${step.gradient}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive ? step.number : <Icon className="w-6 h-6" />}
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className={`text-2xl font-bold ${isActive ? step.textColor : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  
                  <p className={`text-gray-600 leading-relaxed ${isActive ? 'h-auto' : 'h-14'}`}>
                    {isActive ? step.description : step.shortDescription}
                  </p>

                  {/* Features List */}
                  {isActive && (
                    <motion.div 
                      className="grid grid-cols-2 gap-2 mt-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.4 }}
                    >
                      {step.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* CTA Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      openWhatsApp(
                        step.title,
                        `Hi, I'm interested in *${step.title}*. Can you help me get started?`
                      );
                    }}
                    className={`w-full mt-6 px-6 py-3 rounded-xl font-semibold text-white ${step.gradient} shadow-lg flex items-center justify-center gap-2`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {step.buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Progress Bar */}
        <motion.div className="text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between mb-4 text-sm font-medium text-gray-600">
              <span>Start</span>
              <span>Step {activeStep} of {steps.length}</span>
              <span>Ready!</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-blue-600 rounded-full"
                variants={progressVariants}
                initial="initial"
                animate="animate"
              />
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mb-8">
              {steps.map((step) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(step.number)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeStep === step.number ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Global CTA */}
            <motion.button
              onClick={() => openWhatsApp("Complete Study Abroad Journey", "Hi, I want to start my full study abroad process. Please guide me!")}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StepsSection;