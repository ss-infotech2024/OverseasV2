import { useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import {
  User, Mail, MapPin, Phone, GraduationCap, Calendar,
  Target, Briefcase, FileText, Send, Globe, CheckCircle, AlertCircle,
  Download,
} from "lucide-react";

// === Reusable UI Components ===
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  };
  const sizes = { default: 'h-10 py-2 px-4', sm: 'h-8 px-3 text-sm', lg: 'h-12 px-8 text-lg' };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = '' }) => <div className={`p-6 pb-4 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = '' }) => <h3
  className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
const CardContent = ({ children, className = '' }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

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

// === MAIN COMPONENT ===
export default function InquiryForm() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", dateOfBirth: "", email: "", address: "", contactNumber: "",
    bachelorsDegree: "", bachelorsCompletion: "", bachelorsTitle: "", bachelorsCGPA: "", bachelorsSGPA: "", hscGrade: "", entranceExamScores: "",
    ieltsToeflScore: "", degreeLanguage: "", apsCertificate: "",
    targetIntake: "", targetUniversities: "", mastersSubject: "", specialization: "", researchTopic: "",
    jobPosition: "", jobLevel: "", company: "", jobTitle: "",
    source: "",
    submissionDate: new Date().toISOString()
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

  const generateSubmissionId = () => {
    const ts = Date.now();
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SS${ts}${rand}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  // === VALIDATE EACH STEP ===
  const validateStep = (step) => {
    const err = {};

    if (step === 1) {
      if (!formData.firstName.trim()) err.firstName = "First name required";
      if (!formData.lastName.trim()) err.lastName = "Last name  name required";
      if (!formData.dateOfBirth) err.dateOfBirth = "Date of birth required";
      if (!formData.email.trim()) err.email = "Email required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = "Invalid email";
      if (!formData.address.trim()) err.address = "Address required";
      if (!formData.contactNumber.trim()) err.contactNumber = "Contact required";
    }

    if (step === 2) {
      if (!formData.bachelorsDegree) err.bachelorsDegree = "Required";
      if (!formData.bachelorsTitle.trim()) err.bachelorsTitle = "Degree title required";
      if (!formData.bachelorsCGPA) err.bachelorsCGPA = "CGPA required";
      if (!formData.hscGrade) err.hscGrade = "HSC grade required";
    }

    if (step === 4) {
      if (!formData.targetIntake) err.targetIntake = "Intake required";
      if (!formData.mastersSubject.trim()) err.mastersSubject = "Master's subject required";
    }

    if (step === 5) {
      if (!formData.source) err.source = "Please select how you found us";
    }

    setErrors(prev => ({ ...prev, ...err }));
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(p => Math.min(p + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep(p => Math.max(p - 1, 1));
    setErrors({});
  };

  // === PDF GENERATOR ===
  const generateApplicationLetter = (data) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('SS OVERSEAS – Study Abroad Consultants', 15, 15);
    doc.text('Plot No. 26, Khandwekar Bungalow, Landewadi, Nagpur - 440010', 15, 20);
    doc.text('Phone: 9422129534 | 8999972278 | Email: ssoverseas333@gmail.com', 15, 25);

    // Logo placeholder
    doc.setDrawColor(200);
    doc.roundedRect(170, 10, 25, 25, 3, 3, 'S');
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('LOGO', 178, 22, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.setDrawColor(59, 130, 246);
    doc.line(15, 30, pageWidth - 15, 30);

    // Title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Study Abroad Application Form', pageWidth / 2, 42, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Submission ID: ${data.submissionId}`, pageWidth / 2, 50, { align: 'center' });
    doc.text(`Date: ${new Date(data.submissionDate).toLocaleString()}`, pageWidth / 2, 56, { align: 'center' });

    let y = 70;

    const addSection = (title, items) => {
      if (y > 250) { doc.addPage(); y = 40; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(59, 130, 246);
      doc.text(title, 15, y);
      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(0);
      items.forEach(([label, value]) => {
        const val = String(value || '—');
        doc.text(`${label}:`, 20, y);
        const lines = doc.splitTextToSize(val, pageWidth - 65);
        doc.text(lines, 55, y);
        y += lines.length * 5 + 3;
      });
      y += 5;
    };

    addSection('PERSONAL INFORMATION', [
      ['First Name', data.firstName],
      ['Last Name', data.lastName],
      ['Date of Birth', data.dateOfBirth],
      ['Email', data.email],
      ['Address', data.address],
      ['Contact', data.contactNumberData.contactNumber],
    ]);

    addSection('EDUCATIONAL BACKGROUND', [
      ['Bachelor’s Degree', data.bachelorsDegree],
      ['Expected Completion', data.bachelorsCompletion || 'N/A'],
      ['Degree Title', data.bachelorsTitle],
      ['CGPA', data.bachelorsCGPA],
      ['SGPA', data.bachelorsSGPA || 'N/A'],
      ['12th HSC Grade', data.hscGrade],
      ['Entrance Exams', data.entranceExamScores || 'N/A'],
    ]);

    addSection('LANGUAGE & CERTIFICATES', [
      ['IELTS/TOEFL', data.ieltsToeflScore || 'N/A'],
      ['Degree Language', data.degreeLanguage || 'N/A'],
      ['APS Certificate', data.apsCertificate || 'N/A'],
    ]);

    addSection('STUDY PLANS', [
      ['Target Intake', data.targetIntake],
      ['Target Universities', data.targetUniversities || 'N/A'],
      ['Master’s Subject', data.mastersSubject],
      ['Specialization', data.specialization || 'N/A'],
      ['Research Topic', data.researchTopic || 'N/A'],
    ]);

    addSection('CAREER GOALS IN GERMANY', [
      ['Job Position', data.jobPosition || 'N/A'],
      ['Job Level', data.jobLevel || 'N/A'],
      ['Target Company', data.company || 'N/A'],
      ['Job Title', data.jobTitle || 'N/A'],
    ]);

    addSection('SOURCE INFORMATION', [
      ['How did you find us?', data.source || 'N/A'],
    ]);

    // Footer
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(0.5);
    doc.line(15, pageHeight - 40, pageWidth - 15, pageHeight - 40);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Applicant Signature: ___________________________', 20, pageHeight - 30);
    doc.text('Date: _________________', 20, pageHeight - 23);

    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text('Generated by SS OVERSEAS – Confidential Document', pageWidth / 2, pageHeight - 15, { align: 'center' });

    doc.save(`SS_Application_${data.submissionId}.pdf`);
  };

  // === SUBMIT WITH FULL VALIDATION ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate ALL steps
    for (let step = 1; step <= 5; step++) {
      if (!validateStep(step)) {
        setCurrentStep(step);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const id = generateSubmissionId();
      const payload = { ...formData, submissionId: id, submissionDate: new Date().toISOString() };

      const { data } = await axios.post('/api/inquiries', payload);
      if (data.status !== 'success') throw new Error('Server rejected');

      setSubmissionId(id);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Education", icon: GraduationCap },
    { number: 3, title: "Language Certificates", icon: Globe },
    { number: 4, title: "Study Plans", icon: Target },
    { number: 5, title: "Career & Source", icon: Briefcase },
  ];

  // === SUCCESS SCREEN ===
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center py-12">
            <CardContent className="space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 classThe="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>

              <div className="bg-blue-50 rounded-xl p-6 max-w-2xl mx-auto">
                <Badge className="bg-blue-600 text-white mb-4 text-sm">
                  Submission ID: {submissionId}
                </Badge>
                <p className="text-lg text-gray-600 mb-6">
                  Your inquiry has been saved successfully. Use this ID to download your application anytime.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => generateApplicationLetter({ ...formData, submissionId, submissionDate: new Date().toISOString() })}
                    variant="default"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Download className="w-4 h-4" /> Download Application (PDF)
                  </Button>

                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                      setFormData({
                        firstName: "", lastName: "", dateOfBirth: "", email: "", address: "", contactNumber: "",
                        bachelorsDegree: "", bachelorsCompletion: "", bachelorsTitle: "", bachelorsCGPA: "", bachelorsSGPA: "", hscGrade: "", entranceExamScores: "",
                        ieltsToeflScore: "", degreeLanguage: "", apsCertificate: "",
                        targetIntake: "", targetUniversities: "", mastersSubject: "", specialization: "", researchTopic: "",
                        jobPosition: "", jobLevel: "", company: "", jobTitle: "", source: "",
                        submissionDate: new Date().toISOString()
                      });
                      setErrors({});
                    }}
                    variant="outline"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // === MAIN FORM ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SS OVERSEAS</h1>
              <p className="text-gray-600">Study Abroad Inquiry Form</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between overflow-x-auto">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const active = s.number === currentStep;
                const done = s.number < currentStep;
                return (
                  <div key={s.number} className="flex items-center">
                    <div className={`flex flex-col items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-semibold transition-all ${
                        active ? 'bg-blue-600 border-blue-600 text-white scale-110' :
                        done ? 'bg-green-500 border-green-500 text-white' :
                        'bg-white border-gray-300 text-gray-400'
                      }`}>
                        {done ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <span className={`text-sm font-medium mt-2 hidden sm:block ${
                        active ? 'text-blue-600' : done ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {s.title}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 rounded-full ${done ? 'bg-green-500' : 'bg-gray-200'}`} />
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
              {/* STEP 1 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter first name" />
                      </div>
                      {errors.firstName && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter last name" />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`} />
                    </div>
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.dateOfBirth}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="example@domain.com" />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea name="address" value={formData.address} onChange={handleChange} rows={3}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Full address" />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange}
                        className={`w-full pl-10 pr-4 py- SEA-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="+91 9876543210" />
                    </div>
                    {errors.contactNumber && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.contactNumber}</p>}
                  </div>
                </div>
              )}

              {/* STEP 2 – FIXED TYPO */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bachelor's Degree *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Completed', 'Ongoing'].map(o => (
                        <label key={o} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 cursor-pointer">
                          <input
                            type="radio"
                            name="bachelorsDegree"
                            value={o}
                            checked={formData.bachelorsDegree === o}  
                            onChange={handleChange}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span>{o}</span>
                        </label>
                      ))}
                    </div>
                    {errors.bachelorsDegree && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.bachelorsDegree}</p>}
                  </div>

                  {formData.bachelorsDegree === 'Ongoing' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expected Completion (MM/YYYY)</label>
                      <input type="month" name="bachelorsCompletion" value={formData.bachelorsCompletion} onChange={handleChange}
                        className="w-full px-4 py-3 border border600 rounded-xl focus:ring-2 focus:ring-blue-500" />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree Title *</label>
                    <input type="text" name="bachelorsTitle" value={formData.bachelorsTitle} onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${errors.bachelorsTitle ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="e.g. B.Tech Computer Science" />
                    {errors.bachelorsTitle && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.bachelorsTitle}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CGPA (final) *</label>
                      <input type="text" name="bachelorsCGPA" value={formData.bachelorsCGPA} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${errors.bachelorsCGPA ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="8.5/10" />
                      {errors.bachelorsCGPA && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.bachelorsCGPA}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SGPA (per semester)</label>
                      <input type="text" name="bachelorsSGPA" value={formData.bachelorsSGPA} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        placeholder="Sem1: 8.0, ..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">12th HSC Grade *</label>
                      <input type="text" name="hscGrade" value={formData.hscGrade} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${errors.hscGrade ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="85%" />
                      {errors.hscGrade && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.hscGrade}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Entrance Exams</label>
                      <input type="text" name="entranceExamScores" value={formData.entranceExamScores} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        placeholder="JEE: 95 percentile" />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">IELTS/TOEFL Score</label>
                    <input type="text" name="ieltsToeflScore" value={formData.ieltsToeflScore} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="IELTS: 7.5" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree Language</label>
                    <input type="text" name="degreeLanguage" value={formData.degreeLanguage} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="English" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">APS Certificate?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Yes', 'No'].map(o => (
                        <label key={o} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 cursor-pointer">
                          <input type="radio" name="apsCertificate" value={o} checked={formData.apsCertificate === o} onChange={handleChange}
                            className="text-blue-600 focus:ring-blue-500" />
                          <span>{o}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Intake *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Summer', 'Winter'].map(o => (
                        <label key={o} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 cursor-pointer">
                          <input type="radio" name="targetIntake" value={o} checked={formData.targetIntake === o} onChange={handleChange}
                            className="text-blue-600 focus:ring-blue-500" />
                          <span>{o}</span>
                        </label>
                      ))}
                    </div>
                    {errors.targetIntake && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.targetIntake}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Universities</label>
                    <textarea name="targetUniversities" value={formData.targetUniversities} onChange={handleChange} rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="TU Munich, ..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Master's Subject *</label>
                    <input type="text" name="mastersSubject" value={formData.mastersSubject} onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${errors.mastersSubject ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Computer Science" />
                    {errors.mastersSubject && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.mastersSubject}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                    <input type="text" name="specialization" value={formData.specialization} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="AI, Renewable Energy..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Research Topic</label>
                    <textarea name="researchTopic" value={formData.researchTopic} onChange={handleChange} rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe..." />
                  </div>
                </div>
              )}

              {/* STEP 5 – REQUIRED */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <Briefcase className="w-5 h-5" /> Career Goals in Germany
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">Desired Job Position</label>
                        <input type="text" name="jobPosition" value={formData.jobPosition} onChange={handleChange}
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                          placeholder="Software Engineer..." />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-2">Job Level</label>
                          <select name="jobLevel" value={formData.jobLevel} onChange={handleChange}
                            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white">
                            <option value="">Select</option>
                            <option>Junior</option><option>Senior</option><option>Manager</option><option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-2">Target Company</label>
                          <input type="text" name="company" value={formData.company} onChange={handleChange}
                            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                            placeholder="Siemens, BMW..." />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">Job Title</label>
                        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange}
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                          placeholder="Senior Software Engineer..." />
                      </div>
                    </div>
                  </div>

                  {/* REQUIRED SOURCE */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">How did you find us? *</label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                        errors.source ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select source</option>
                      <option>Google Search</option>
                      <option>Social Media</option>
                      <option>Friend Referral</option>
                      <option>Advertisement</option>
                      <option>College Event</option>
                      <option>Other</option>
                    </select>
                    {errors.source && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.source}
                      </p>
                    )}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" /> Important
                    </h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Answer only relevant fields</li>
                      <li>• Attach transcripts if possible</li>
                      <li>• Accurate info helps us serve you better</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1} className="px-8 py-3 rounded-xl">
              Back
            </Button>

            {currentStep < 5 ? (
              <Button type="button" onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl">
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}
                className="bg-gradient +#+ from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl disabled:opacity-50">
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" /> Submit Inquiry
                  </div>
                )}
              </Button>
            )}
          </div>
        </form>

        {/* Footer Contact */}
        <Card className="mt-8 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">CONTACT US</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <MapPin className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <p className="text-sm">Plot.no.26 Khandwerkar Bunglow, Landra Park, Nagpur-440010</p>
              </div>
              <div>
                <Phone className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <p className="text-sm font-semibold">9422129534<br />8999972278</p>
              </div>
              <div>
                <Mail className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <p className="text-sm font-semibold">ssoverseas333@gmail.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}