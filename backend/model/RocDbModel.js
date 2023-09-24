const mongoose = require('mongoose');

// Schema for person
const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  residence: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  cccNumber: {
    type: Number,
    required: true,
  },
  dateEnrolledIntoCare: {
    type: Date,
    required: true,
  },
  dateEnrolledIntoOTZ: {
    type: Date,
    required: true,
  },
  work: {
    type: String,
  },
  school: {
    type: String,
  },
  schoolName: {
    type: String,
  },
  schoolLevel: {
    type: String,
  },
});

// Schema for vitals
const vitalsSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  bloodPressure: {
    type: String,
  },
});

// Schema for lab
const labSchema = new mongoose.Schema({
  viralLoad: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

// Schema for appointments
const appointmentsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
});

// Schema for pharmacy
const pharmacySchema = new mongoose.Schema({
  regimen: {
    type: String,
    required: true,
  },
  dateStarted: {
    type: Date,
    required: true,
  },
});

// Export the models
const Person = mongoose.model('Person', personSchema);
const Vitals = mongoose.model('Vitals', vitalsSchema);
const Lab = mongoose.model('Lab', labSchema);
const Appointments = mongoose.model('Appointments', appointmentsSchema);
const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = {
  Person,
  Vitals,
  Lab,
  Appointments,
  Pharmacy,
};
