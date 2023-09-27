const mongoose = require('mongoose');

// Schema for Vitals
const vitalsSchema = new mongoose.Schema({
  cccNumber: {
    type: Number,
    required: true,
    min: 1e9,
    max: 1e10 - 1,
  },
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

// Schema for Lab
const labSchema = new mongoose.Schema({
  cccNumber: {
    type: Number,
    required: true,
  },
  viralLoad: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

// Schema for Appointments
const appointmentsSchema = new mongoose.Schema({
  cccNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Schema for Pharmacy
const pharmacySchema = new mongoose.Schema({
  cccNumber: {
    type: Number,
    required: true,
    min: 1e9,
    max: 1e10 - 1,
  },
  regimen: {
    type: String,
    required: true,
  },
  dateStarted: {
    type: Date,
    required: true,
  },
});

// Schema for Person
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
    unique: true,
    min: 1e9,
    max: 1e10 - 1,
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
  vitals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vitals',
  }],
  labs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',
  }],
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointments',
  }],
  pharmacy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pharmacy',
  }],
});

// Export the models
const Vitals = mongoose.model('Vital', vitalsSchema);
const Lab = mongoose.model('Lab', labSchema);
const Appointments = mongoose.model('Appointment', appointmentsSchema);
const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);
const Person = mongoose.model('Person', personSchema);

module.exports = {
  Vitals,
  Lab,
  Appointments,
  Pharmacy,
  Person,
};
