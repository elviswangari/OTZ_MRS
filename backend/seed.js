import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Roc, Users, Hcws } from './utils/db.js';
import { Person, User, Hcw, Vitals, Lab, Appointments, Pharmacy, Module } from './model/DBModel.js';

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        console.log('Clearing existing data...');
        await mongoose.connection.dropDatabase();
        console.log('Database cleared.');

        // 1. Create a Healthcare Worker (HCW)
        console.log('Seeding Healthcare Worker...');
        const hcwData = {
            firstName: 'Jane',
            lastName: 'Smith',
            username: 'janesmith',
            gender: 'Female',
            email: 'jane@example.com',
            phoneNumber: '0712345678',
            roles: 'admin',
            password: 'password123',
            confirmPassword: 'password123'
        };
        await Hcws.registerHcw(hcwData);
        console.log('HCW seeded successfully.');

        // 2. Create a Recipient of Care (ROC) - Person record
        console.log('Seeding Recipient of Care (Person)...');
        const personData = {
            firstName: 'John',
            lastName: 'Doe',
            surname: 'Junior',
            dateOfBirth: new Date('2005-05-15'),
            gender: 'Male',
            residence: 'Nairobi',
            phoneNumber: '0787654321',
            cccNumber: 1234567890,
            OTZNumber: '123456',
            dateEnrolledIntoCare: new Date('2020-01-10'),
            dateStartedArt: new Date('2020-01-15'),
            dateEnrolledIntoOTZ: new Date('2021-03-20'),
            work: 'Student',
            school: 'Yes',
            schoolName: 'Nairobi High',
            schoolLevel: 'Secondary'
        };
        await Roc.createPerson(personData);
        console.log('ROC Person seeded successfully.');

        // 3. Create a Recipient of Care (ROC) - User account
        console.log('Seeding Recipient of Care (User)...');
        const userData = {
            firstName: 'John',
            cccNumber: 1234567890,
            email: 'john@example.com',
            phoneNumber: '0787654321',
            password: 'password123'
        };
        await Users.registerUser(userData);
        console.log('ROC User seeded successfully.');

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
