const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { describe, before, beforeEach, after, it } = require('mocha');

require('dotenv').config();
const { Person, Vitals, Lab, Appointments, Pharmacy } = require('../../model');
const app = require('../../server');

chai.use(chaiHttp);
const expect = chai.expect;
describe('code snippet', () => {

  // Add a new Vitals record to a non-existent Person
  it('should not add a new Vitals record to a non-existent Person', () => {expect.hasAssertions();
    const vitalsData = {
      cccNumber: 123456,
      weight: 70,
      height: 180,
      bloodPressure: '120/80',
    };

    const vitals = new vitals(vitalsData);

    expect(vitals).toBeUndefined();
  });

  // Create a new Person with all required fields
  it('should create a new Person with all required fields', () => {expect.assertions();
    const personData = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      residence: '123 Main St',
      phoneNumber: '1234567890',
      cccNumber: 123456,
      dateEnrolledIntoCare: new Date('2020-01-01'),
      dateEnrolledIntoOTZ: new Date('2020-02-01'),
    };

    const person = new Person(personData);

    expect(person).toBeDefined();
    expect(person.firstName).toBe('John');
    expect(person.lastName).toBe('Doe');
    expect(person.dateOfBirth).toEqual(new Date('1990-01-01'));
    expect(person.residence).toBe('123 Main St');
    expect(person.phoneNumber).toBe('1234567890');
    expect(person.cccNumber).toBe(123456);
    expect(person.dateEnrolledIntoCare).toStrictEqual(new Date('2020-01-01'));
    expect(person.dateEnrolledIntoOTZ).toStrictEqual(new Date('2020-02-01'));
  });

  // Add a new Vitals record to a Person
  it('should add a new Vitals record to a Person', () => {expect.hasAssertions();
    const personData = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      residence: '123 Main St',
      phoneNumber: '1234567890',
      cccNumber: 123456,
      dateEnrolledIntoCare: new Date('2020-01-01'),
      dateEnrolledIntoOTZ: new Date('2020-02-01'),
    };

    const person = new Person(personData);

    const vitalsData = {
      cccNumber: 123456,
      weight: 70,
      height: 180,
      bloodPressure: '120/80',
    };

    const vitals = new Vitals(vitalsData);
    person.vitals.push(vitals);

    expect(person.vitals).toHaveLength(1);
    expect(person.vitals[0]).toBe(vitals);
  });

  // Add a new Lab record to a Person
  it('should add a new Lab record to a Person', () => {expect.hasAssertions();
    const personData = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      residence: '123 Main St',
      phoneNumber: '1234567890',
      cccNumber: 123456,
      dateEnrolledIntoCare: new Date('2020-01-01'),
      dateEnrolledIntoOTZ: new Date('2020-02-01'),
    };

    const person = new Person(personData);

    const labData = {
      cccNumber: 123456,
      viralLoad: { result: 'positive' },
    };

    const lab = new Lab(labData);
    person.labs.push(lab);

    expect(person.labs).toHaveLength(1);
    expect(person.labs[0]).toBe(lab);
  });
});
