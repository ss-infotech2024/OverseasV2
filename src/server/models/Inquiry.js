import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
    submissionId: { type: String, required: true, unique: true },
    submissionDate: { type: Date, default: Date.now },

    // ---- Personal ----
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    email: String,
    address: String,
    contactNumber: String,

    // ---- Education ----
    bachelorsDegree: String,
    bachelorsCompletion: String,
    bachelorsTitle: String,
    bachelorsCGPA: String,
    bachelorsSGPA: String,
    hscGrade: String,
    entranceExamScores: String,

    // ---- Language ----
    ieltsToeflScore: String,
    degreeLanguage: String,
    apsCertificate: String,

    // ---- Study plans ----
    targetIntake: String,
    targetUniversities: String,
    mastersSubject: String,
    specialization: String,
    researchTopic: String,

    // ---- Career ----
    jobPosition: String,
    jobLevel: String,
    company: String,
    jobTitle: String,

    // ---- Source ----
    source: String,
});

export default mongoose.model('Inquiry', inquirySchema);