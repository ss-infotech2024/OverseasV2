// File: src/components/InquiryForm.jsx
import { useState } from "react";
import * as XLSX from 'xlsx';
import {
  User,
  Mail,
  MapPin,
  Phone,
  GraduationCap,
  Calendar,
  BookOpen,
  Target,
  Briefcase,
  FileText,
  Send,
  Globe,
  CheckCircle,
  AlertCircle,
  Download,
  FileSpreadsheet,
  Home,
} from "lucide-react";

// Button Component
const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  };
  
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-12 px-8 text-lg',
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

// Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 pb-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// Badge Component
const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    outline: 'border border-gray-300 text-gray-700',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Tab Button Component
const TabButton = ({ active, onClick, icon: Icon, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
      active
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg"
    }`}
  >
    <Icon className="w-5 h-5" />
    {children}
  </button>
);

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    address: "",
    contactNumber: "",

    // Educational Background
    bachelorsDegree: "",
    bachelorsCompletion: "",
    bachelorsTitle: "",
    bachelorsCGPA: "",
    bachelorsSGPA: "",
    hscGrade: "",
    entranceExamScores: "",
    
    // Language & Certificates
    ieltsToeflScore: "",
    degreeLanguage: "",
    apsCertificate: "",
    
    // Study Plans
    targetIntake: "",
    targetUniversities: "",
    mastersSubject: "",
    specialization: "",
    researchTopic: "",
    
    // Career Goals
    jobPosition: "",
    jobLevel: "",
    company: "",
    jobTitle: "",
    
    // Source
    source: "",

    // Timestamp
    submissionDate: new Date().toISOString()
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

  const generateSubmissionId = () => {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SS${timestamp}${random}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    }

    if (step === 2) {
      if (!formData.bachelorsDegree) newErrors.bachelorsDegree = "This field is required";
      if (!formData.bachelorsTitle.trim()) newErrors.bachelorsTitle = "Degree title is required";
      if (!formData.bachelorsCGPA) newErrors.bachelorsCGPA = "CGPA is required";
      if (!formData.hscGrade) newErrors.hscGrade = "HSC grade is required";
    }

    if (step === 4) {
      if (!formData.targetIntake) newErrors.targetIntake = "Target intake is required";
      if (!formData.mastersSubject.trim()) newErrors.mastersSubject = "Master's subject is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const exportToExcel = (data) => {
    // Create worksheet data
    const worksheetData = [
      // Header
      ["SS INFOTECH COUNSELLING OVERSEAS - INQUIRY FORM DATA"],
      ["Submission ID", data.submissionId],
      ["Submission Date", new Date(data.submissionDate).toLocaleString()],
      [""], // Empty row
      
      // Personal Information
      ["PERSONAL INFORMATION"],
      ["First Name", data.firstName],
      ["Last Name", data.lastName],
      ["Date of Birth", data.dateOfBirth],
      ["Email", data.email],
      ["Address", data.address],
      ["Contact Number", data.contactNumber],
      [""], // Empty row
      
      // Educational Background
      ["EDUCATIONAL BACKGROUND"],
      ["Bachelor's Degree Status", data.bachelorsDegree],
      ["Expected Completion", data.bachelorsCompletion || "N/A"],
      ["Degree Title", data.bachelorsTitle],
      ["Bachelor's CGPA", data.bachelorsCGPA],
      ["Bachelor's SGPA", data.bachelorsSGPA || "N/A"],
      ["12th HSC Grade", data.hscGrade],
      ["Entrance Exam Scores", data.entranceExamScores || "N/A"],
      [""], // Empty row
      
      // Language & Certificates
      ["LANGUAGE & CERTIFICATES"],
      ["IELTS/TOEFL Score", data.ieltsToeflScore || "N/A"],
      ["Degree Language", data.degreeLanguage || "N/A"],
      ["APS Certificate", data.apsCertificate || "N/A"],
      [""], // Empty row
      
      // Study Plans
      ["STUDY PLANS"],
      ["Target Intake", data.targetIntake],
      ["Target Universities", data.targetUniversities || "N/A"],
      ["Master's Subject", data.mastersSubject],
      ["Specialization", data.specialization || "N/A"],
      ["Research Topic", data.researchTopic || "N/A"],
      [""], // Empty row
      
      // Career Goals
      ["CAREER GOALS IN GERMANY"],
      ["Desired Job Position", data.jobPosition || "N/A"],
      ["Job Level", data.jobLevel || "N/A"],
      ["Target Company", data.company || "N/A"],
      ["Job Title", data.jobTitle || "N/A"],
      [""], // Empty row
      
      // Source
      ["SOURCE INFORMATION"],
      ["How did you find us?", data.source || "N/A"]
    ];

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);

    // Style the worksheet
    const columnWidths = [
      { wch: 25 }, // First column width
      { wch: 50 }  // Second column width
    ];
    ws['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Inquiry Data");

    // Generate file name
    const fileName = `SS_Infotech_Inquiry_${data.submissionId}.xlsx`;

    // Export to Excel
    XLSX.writeFile(wb, fileName);
  };

  const saveToLocalStorage = (data) => {
    try {
      // Get existing inquiries or initialize empty array
      const existingInquiries = JSON.parse(localStorage.getItem('ssInfotechInquiries') || '[]');
      
      // Add new inquiry
      const updatedInquiries = [...existingInquiries, data];
      
      // Save back to localStorage
      localStorage.setItem('ssInfotechInquiries', JSON.stringify(updatedInquiries));
      
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateStep(5)) {
      setIsSubmitting(true);
      
      try {
        // Generate submission ID
        const submissionId = generateSubmissionId();
        const completeData = {
          ...formData,
          submissionId,
          submissionDate: new Date().toISOString()
        };

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Save to localStorage
        const saveSuccess = saveToLocalStorage(completeData);
        
        if (saveSuccess) {
          console.log("Form data saved:", completeData);
          setSubmissionId(submissionId);
          setIsSubmitted(true);
          
          // Auto-download Excel file
          setTimeout(() => {
            exportToExcel(completeData);
          }, 1000);
        } else {
          throw new Error('Failed to save data');
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert('There was an error submitting your form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const downloadAllInquiries = () => {
    try {
      const allInquiries = JSON.parse(localStorage.getItem('ssInfotechInquiries') || '[]');
      
      if (allInquiries.length === 0) {
        alert('No inquiries found in storage.');
        return;
      }

      // Create data for Excel
      const worksheetData = [
        // Header
        ["SS INFOTECH COUNSELLING OVERSEAS - ALL INQUIRIES"],
        ["Generated on", new Date().toLocaleString()],
        ["Total Inquiries", allInquiries.length],
        [""], // Empty row
        ["MASTER DATA"],
        [
          "Submission ID",
          "Submission Date",
          "First Name",
          "Last Name",
          "Email",
          "Contact Number",
          "Bachelor's Degree",
          "Bachelor's Title",
          "CGPA",
          "Master's Subject",
          "Target Intake",
          "Source",
          "Status"
        ],
        ...allInquiries.map(inquiry => [
          inquiry.submissionId,
          new Date(inquiry.submissionDate).toLocaleDateString(),
          inquiry.firstName,
          inquiry.lastName,
          inquiry.email,
          inquiry.contactNumber,
          inquiry.bachelorsDegree,
          inquiry.bachelorsTitle,
          inquiry.bachelorsCGPA,
          inquiry.mastersSubject,
          inquiry.targetIntake,
          inquiry.source,
          "New"
        ])
      ];

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(worksheetData);
      
      // Set column widths
      ws['!cols'] = [
        { wch: 20 }, // Submission ID
        { wch: 15 }, // Date
        { wch: 15 }, // First Name
        { wch: 15 }, // Last Name
        { wch: 25 }, // Email
        { wch: 15 }, // Contact
        { wch: 15 }, // Degree Status
        { wch: 25 }, // Degree Title
        { wch: 10 }, // CGPA
        { wch: 20 }, // Master's Subject
        { wch: 12 }, // Intake
        { wch: 15 }, // Source
        { wch: 10 }  // Status
      ];

      XLSX.utils.book_append_sheet(wb, ws, "All Inquiries");
      XLSX.writeFile(wb, `SS_Infotech_All_Inquiries_${new Date().getTime()}.xlsx`);
      
    } catch (error) {
      console.error('Error downloading all inquiries:', error);
      alert('Error generating Excel file.');
    }
  };

  const clearAllInquiries = () => {
    if (window.confirm('Are you sure you want to clear all inquiries? This action cannot be undone.')) {
      localStorage.removeItem('ssInfotechInquiries');
      alert('All inquiries have been cleared.');
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Education", icon: GraduationCap },
    { number: 3, title: "Language Certificates", icon: Globe },
    { number: 4, title: "Study Plans", icon: Target },
    { number: 5, title: "Career & Source", icon: Briefcase },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center py-12">
            <CardContent className="space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Thank You for Your Inquiry!
              </h2>
              
              <div className="bg-blue-50 rounded-xl p-6 max-w-2xl mx-auto">
                <Badge className="bg-blue-600 text-white mb-4 text-sm">
                  Submission ID: {submissionId}
                </Badge>
                <p className="text-lg text-gray-600 mb-6">
                  We have received your inquiry and our education consultant will contact you within 24 hours. 
                  Your Excel file has been downloaded automatically.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Button
                    onClick={() => exportToExcel({
                      ...formData,
                      submissionId,
                      submissionDate: new Date().toISOString()
                    })}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Excel Again
                  </Button>
                  
                  <Button
                    onClick={downloadAllInquiries}
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2 text-white"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Download All Inquiries
                  </Button>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 max-w-2xl mx-auto">
                <h3 className="font-semibold text-green-900 mb-3">What's Next?</h3>
                <ul className="text-left text-green-800 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Our expert will review your profile
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Personalized university shortlisting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Comprehensive guidance session
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Your data is securely stored
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      dateOfBirth: "",
                      email: "",
                      address: "",
                      contactNumber: "",
                      bachelorsDegree: "",
                      bachelorsCompletion: "",
                      bachelorsTitle: "",
                      bachelorsCGPA: "",
                      bachelorsSGPA: "",
                      hscGrade: "",
                      entranceExamScores: "",
                      ieltsToeflScore: "",
                      degreeLanguage: "",
                      apsCertificate: "",
                      targetIntake: "",
                      targetUniversities: "",
                      mastersSubject: "",
                      specialization: "",
                      researchTopic: "",
                      jobPosition: "",
                      jobLevel: "",
                      company: "",
                      jobTitle: "",
                      source: "",
                      submissionDate: new Date().toISOString()
                    });
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Submit Another Inquiry
                </Button>
                
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Print Confirmation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Admin Button */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SS INFOTECH COUNSELLING OVERSEAS</h1>
              <p className="text-gray-600">Study Abroad Inquiry Form</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete this form to get personalized guidance for your study abroad journey. 
            Our experts will contact you within 24 hours.
          </p>
          
          
        </div>

        {/* Progress Steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = step.number === currentStep;
                const isCompleted = step.number < currentStep;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex flex-col items-center ${index !== steps.length - 1 ? 'flex-1' : ''}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-semibold transition-all duration-300 ${
                        isActive 
                          ? 'bg-blue-600 border-blue-600 text-white scale-110' 
                          : isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                        {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <span className={`text-sm font-medium mt-2 ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index !== steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 rounded-full ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6" />
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your first name"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Of Birth (DD/MM/YYYY) *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail ID *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your complete address"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your contact number"
                      />
                    </div>
                    {errors.contactNumber && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.contactNumber}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Educational Background */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bachelor's Degree *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Completed', 'Ongoing'].map(option => (
                        <label key={option} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="bachelorsDegree"
                            value={option}
                            checked={formData.bachelorsDegree === option}
                            onChange={handleChange}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors.bachelorsDegree && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.bachelorsDegree}
                      </p>
                    )}
                  </div>

                  {formData.bachelorsDegree === 'Ongoing' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bachelor's Degree expected completion (MM/YYYY) *
                      </label>
                      <input
                        type="month"
                        name="bachelorsCompletion"
                        value={formData.bachelorsCompletion}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bachelor's Degree Title *
                    </label>
                    <input
                      type="text"
                      name="bachelorsTitle"
                      value={formData.bachelorsTitle}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.bachelorsTitle ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Bachelor of Engineering in Computer Science"
                    />
                    {errors.bachelorsTitle && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.bachelorsTitle}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bachelor's CGPA (final grade) *
                      </label>
                      <input
                        type="text"
                        name="bachelorsCGPA"
                        value={formData.bachelorsCGPA}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.bachelorsCGPA ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 8.5/10 or 3.7/4"
                      />
                      {errors.bachelorsCGPA && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.bachelorsCGPA}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bachelor's SGPA (each Semester)
                      </label>
                      <input
                        type="text"
                        name="bachelorsSGPA"
                        value={formData.bachelorsSGPA}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., Sem1: 8.0, Sem2: 8.5..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        12 HSC Grade Percentage/ Score *
                      </label>
                      <input
                        type="text"
                        name="hscGrade"
                        value={formData.hscGrade}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.hscGrade ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 85% or 9.2 CGPA"
                      />
                      {errors.hscGrade && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.hscGrade}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Entrance Exam Scores (JEE/MHTCET/NEET/GATE/etc.)
                      </label>
                      <input
                        type="text"
                        name="entranceExamScores"
                        value={formData.entranceExamScores}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., JEE: 95 percentile"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Language & Certificates */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Have you appeared for IELTS/TOEFL? If yes, score:
                    </label>
                    <input
                      type="text"
                      name="ieltsToeflScore"
                      value={formData.ieltsToeflScore}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., IELTS: 7.5 or TOEFL: 105"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bachelor's degree's language of instruction
                    </label>
                    <input
                      type="text"
                      name="degreeLanguage"
                      value={formData.degreeLanguage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., English, German, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Have you obtained APS certificate?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Yes', 'No'].map(option => (
                        <label key={option} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="apsCertificate"
                            value={option}
                            checked={formData.apsCertificate === option}
                            onChange={handleChange}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Study Plans */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target semester intake *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Summer', 'Winter'].map(option => (
                        <label key={option} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="targetIntake"
                            value={option}
                            checked={formData.targetIntake === option}
                            onChange={handleChange}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors.targetIntake && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.targetIntake}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have any target universities? If yes, which university(s)?
                    </label>
                    <textarea
                      name="targetUniversities"
                      value={formData.targetUniversities}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., Technical University of Munich, University of Stuttgart..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      In which subject do you want to pursue Master's degree? *
                    </label>
                    <input
                      type="text"
                      name="mastersSubject"
                      value={formData.mastersSubject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.mastersSubject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Computer Science, Mechanical Engineering, MBA..."
                    />
                    {errors.mastersSubject && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.mastersSubject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Have you thought about any specialization domain? If yes, which?
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., Artificial Intelligence, Renewable Energy..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have research or thesis topic in mind? If yes, topic?
                    </label>
                    <textarea
                      name="researchTopic"
                      value={formData.researchTopic}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Describe your research interests or thesis topic..."
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Career & Source */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Career Goals in Germany
                    </h3>
                    <p className="text-blue-700 text-sm mb-4">
                      Share your career aspirations to help us guide you towards relevant programs and opportunities.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          If you want to work in Germany after your studies, at which job position do you envision yourself?
                        </label>
                        <input
                          type="text"
                          name="jobPosition"
                          value={formData.jobPosition}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                          placeholder="e.g., Software Developer, Mechanical Engineer..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-2">
                            Job Position Level
                          </label>
                          <select
                            name="jobLevel"
                            value={formData.jobLevel}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                          >
                            <option value="">Select level</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                            <option value="Manager">Manager</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                            placeholder="e.g., Siemens, BMW, SAP..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          Job Title
                        </label>
                        <input
                          type="text"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                          placeholder="e.g., Senior Software Engineer, Project Manager..."
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please mention the source through which you found SS Overseas Education Consultants
                    </label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Select source</option>
                      <option value="Google Search">Google Search</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Friend Referral">Friend Referral</option>
                      <option value="Advertisement">Advertisement</option>
                      <option value="College Event">College Event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Instructions */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Important Instructions
                    </h4>
                    <ul className="text-yellow-700 text-sm space-y-2">
                      <li>• Please answer only the questions relevant to you</li>
                      <li>• Attach transcripts or scorecards wherever possible</li>
                      <li>• Ensure all details are accurate to help us guide you better</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-8 py-3 rounded-xl"
            >
              Back
            </Button>

            {currentStep < 5 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Inquiry
                  </div>
                )}
              </Button>
            )}
          </div>
        </form>

        {/* Contact Information */}
        <Card className="mt-8 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">CONTACT US</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <MapPin className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <p className="text-sm">
                  Plot.no.26 Khandwerkar Bunglow,<br />
                  Landra Park, Behind Ishita Clinic,<br />
                  Ramdaspeth, Nagpur- 440010
                </p>
              </div>
              <div>
                <Phone className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <p className="text-sm font-semibold">
                  9422129534<br />
                  8999972278
                </p>
              </div>
              <div>
                <Mail className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <p className="text-sm font-semibold">
                  ssoverseas333@gmail.com
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}