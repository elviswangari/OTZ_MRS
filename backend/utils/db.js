const mongoose = require('mongoose');
const {
    Vitals,
    Lab,
    Appointments,
    Pharmacy,
    Person,
    User
} = require('../model/DbModel');
const config = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../utils/redis');

mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

class PersonService {
    constructor() {
        this.Person = mongoose.model('Person', Person.schema);
    }
    async createPerson(personData) {
        const { cccNumber } = personData;

        try {
            const existingPerson = await this.Person.findOne({ cccNumber });

            if (existingPerson) {
                throw new Error(`Person with CCC Number ${cccNumber} already exists`);
            }

            const newPerson = new Person(personData);
            return await newPerson.save();
        } catch (error) {
            throw error;
        }
    }

    async findPersonByCCCNumber(cccNumber) {
        try {
            // Find the person by CCC number
            const person = await this.Person.findOne({ cccNumber })
                .populate('vitals')
                .populate('labs')
                .populate('appointments')
                .populate('pharmacy');

            if (!person) {
                throw new Error(`Person with CCC Number ${cccNumber} not found`);
            }
            return person;
        } catch (error) {
            throw error;
        }
    }

    async updatePersonByCCCNumber(cccNumber, updatedData) {
        try {
            return await Person.findOneAndUpdate({ cccNumber }, updatedData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async nbusers() {
        try {
            const usersCount = await Person.countDocuments({});
            return usersCount;
        } catch (error) {
            throw error;
        }
    }

    async deletePersonByCCCNumber(cccNumber) {
        try {
            return await Person.findOneAndDelete({ cccNumber });
        } catch (error) {
            throw error;
        }
    }
}

class VitalsService {
    constructor() {
        this.Person = mongoose.model('Person', Person.schema);
        this.Vitals = mongoose.model('Vitals', Vitals.schema);
    }
    async createVitalsForPerson(cccNumber, vitalsData) {
        try {
            const person = await Person.findOne({ cccNumber });
            if (!person) {
                throw new Error('Person not found');
            }

            const newVitals = new Vitals(vitalsData);
            person.vitals.push(newVitals);

            await newVitals.save();
            await person.save();

            return newVitals;
        } catch (error) {
            throw error;
        }
    }

    async findVitalsForPerson(cccNumber) {
        try {
            const person = await Person.findOne({ cccNumber }).populate('vitals');
            return person ? person.vitals : [];
        } catch (error) {
            throw error;
        }
    }
    async updateVitalsForPerson(cccNumber, vitalId, updatedData) {
        try {
            // Find the person by CCC number
            const person = await this.Person.findOne({ cccNumber });
            if (!person) {
                throw new Error('Person not found');
            }

            // Find the vital record with both CCC number and _id
            const updatedVitals = await this.Vitals.findOneAndUpdate(
                { cccNumber, _id: vitalId },
                updatedData,
                { new: true }
            );

            if (!updatedVitals) {
                throw new Error(`Vitals with CCC Number ${cccNumber} and ID ${vitalId} not found`);
            }

            person.populated({ path: 'vitals' });
            await person.save();

            return updatedVitals;
        } catch (error) {
            throw error;
        }
    }
    async deleteVitalsForPerson(cccNumber, vitalId) {
        try {
            const person = await this.Person.findOne({ cccNumber });
            const vitalToDelete = await this.Vitals.findByIdAndDelete(vitalId);

            if (!person || !vitalToDelete) {
                throw new Error('Person or Vitals not found');
            }

            // Remove the vital from the person's array 
            const vitalIndex = person.vitals.indexOf(vitalId);
            if (vitalIndex !== -1) {
                person.vitals.splice(vitalIndex, 1);
                await person.save();
            }

            return true;
        } catch (error) {
            throw error;
        }
    }
}

class LabService {
    constructor() {
        this.Person = mongoose.model('Person', Person.schema);
        this.Lab = mongoose.model('Lab', Lab.schema);
    }
    async createLabForPerson(cccNumber, labData) {
        try {
            const person = await Person.findOne({ cccNumber });
            if (!person) {
                throw new Error('Person not found');
            }

            const newLab = new Lab(labData);
            person.labs.push(newLab);

            await newLab.save();
            await person.save();

            return newLab;
        } catch (error) {
            throw error;
        }
    }

    async findLabsForPerson(cccNumber) {
        try {
            const person = await Person.findOne({ cccNumber }).populate('labs');
            return person ? person.labs : [];
        } catch (error) {
            throw error;
        }
    }

    async updateLabForPerson(cccNumber, labId, updatedData) {
        try {
            // Find the person by CCC number
            const person = await this.Person.findOne({ cccNumber });
            if (!person) {
                throw new Error('Person not found');
            }

            // Find the lab record with both CCC number and _id
            const updatedLabs = await this.Lab.findOneAndUpdate(
                { cccNumber, _id: labId },
                updatedData,
                { new: true }
            );

            if (!updatedLabs) {
                throw new Error(`Labs with CCC Number ${cccNumber} and ID ${labId} not found`);
            }

            person.populated({ path: 'labs' });
            await person.save();

            return updatedLabs;
        } catch (error) {
            throw error;
        }
    }

    async deleteLabForPerson(cccNumber, labId) {
        try {
            const person = await Person.findOne({ cccNumber });
            const labToDelete = await this.Lab.findByIdAndDelete(labId);

            if (!person || !labToDelete) {
                throw new Error('Person or Labs not found');
            }

            // Remove the lab from the person's array 
            const labIndex = person.labs.indexOf(labId);
            if (labIndex !== -1) {
                person.labs.splice(labIndex, 1);
                await person.save();
            }

            return true;
        } catch (error) {
            throw error;
        }
    }
}

class AppointmentsService {
    constructor() {
        this.Person = mongoose.model('Person', Person.schema);
        this.Appointments = mongoose.model('Appointments', Appointments.schema);
    }
    async createAppointmentForPerson(cccNumber, appointmentData) {
        try {
            const person = await Person.findOne({ cccNumber });
            if (!person) {
                throw new Error('Person not found');
            }

            const newAppointment = new Appointments(appointmentData);
            person.appointments.push(newAppointment);

            await newAppointment.save();
            await person.save();

            return newAppointment;
        } catch (error) {
            throw error;
        }
    }

    async findAppointmentsForPerson(cccNumber) {
        try {
            const person = await Person.findOne({ cccNumber }).populate('appointments');
            return person ? person.appointments : [];
        } catch (error) {
            throw error;
        }
    }

    async updateAppointmentForPerson(cccNumber, appointmentId, updatedData) {
        try {
            // Find the person by CCC number
            const person = await this.Person.findOne({ cccNumber });
            if (!person) {
                throw new Error('Person not found');
            }

            // Find the appointment record with both CCC number and _id
            const updatedAppointment = await this.Appointments.findOneAndUpdate(
                { cccNumber, _id: appointmentId },
                updatedData,
                { new: true }
            );

            if (!updatedAppointment) {
                throw new Error(`Appointment with CCC Number ${cccNumber} and ID ${appointmentId} not found`);
            }

            person.populate({ path: 'appointments' });
            await person.save();

            return updatedAppointment;
        } catch (error) {
            throw error;
        }
    }


    async deleteAppointmentForPerson(cccNumber, appointmentId) {
        try {
            const person = await this.Person.findOne({ cccNumber });
            const appointmentToDelete = await this.Appointments.findByIdAndDelete(appointmentId);

            if (!person || !appointmentToDelete) {
                throw new Error('Person or appointment not found');
            }

            // Remove the appointment from the person's array 
            const appointmentIndex = person.appointments.indexOf(appointmentId);
            if (appointmentIndex !== -1) {
                person.vitals.splice(appointmentIndex, 1);
                await person.save();
            }

            return true;
        } catch (error) {
            throw error;
        }
    }
}

class PharmacyService {
    constructor() {
        this.Person = mongoose.model('Person', Person.schema);
        this.Pharmacy = mongoose.model('Pharmacy', Pharmacy.schema);
    }

    async createPharmacyForPerson(cccNumber, pharmacyData) {
        try {
            const person = await this.Person.findOne({ cccNumber });
            if (!person) {
                throw new Error('Person not found');
            }

            const newPharmacy = new this.Pharmacy(pharmacyData);
            person.pharmacy.push(newPharmacy);

            await newPharmacy.save();
            await person.save();

            return newPharmacy;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findPharmaciesForPerson(cccNumber) {
        try {
            const person = await this.Person.findOne({ cccNumber }).populate('pharmacies');
            return person ? person.pharmacies : [];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updatePharmacyForPerson(cccNumber, pharmacyId, updatedData) {
        try {
            // Find the person by CCC number
            const person = await this.Person.findOne({ cccNumber });
            if (!person) {
                throw new Error('Person not found');
            }

            // Find the pharmacy record with both CCC number and _id
            const updatedPharmacy = await this.Pharmacy.findOneAndUpdate(
                { cccNumber, _id: pharmacyId },
                updatedData,
                { new: true }
            );

            if (!updatedPharmacy) {
                throw new Error(`Pharmacy with CCC Number ${cccNumber} and ID ${pharmacyId} not found`);
            }

            person.populated({ path: 'pharmacy' });
            await person.save();

            return updatedPharmacy;
        } catch (error) {
            throw error;
        }
    }

    async deletePharmacyForPerson(cccNumber, pharmacyId) {
        try {
            const person = await Person.findOne({ cccNumber });
            const pharmacyToDelete = await this.Pharmacy.findByIdAndDelete(pharmacyId);

            if (!person || !pharmacyToDelete) {
                throw new Error('Person or pharmacy not found');
            }

            // Remove the lab from the person's array 
            const pharmacyIndex = person.pharmacy.indexOf(pharmacyId);
            if (pharmacyIndex !== -1) {
                person.pharmacy.splice(pharmacyIndex, 1);
                await person.save();
            }

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

class UserService {
    constructor() {
        this.Person = mongoose.model('Person', Person.schema);
        this.User = mongoose.model('User', User.schema);
    }
    async registerUser(registrationDetails) {
        try {
            const { firstName, cccNumber, email, phoneNumber, password } = registrationDetails;

            // Check if a person with the given CCC number and first name exists
            const existingPerson = await this.Person.findOne({ cccNumber, firstName });

            if (!existingPerson) {
                throw new Error('Person with these details does not exist. Please contact the HCW.');
            }

            // Check if a user with the given CCC number exists
            const existingUser = await this.User.findOne({ cccNumber });

            if (existingUser) {
                // If user exists
                return { message: 'Account already exists. Please log in.' };
            }

            // Proceed with registration
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new this.User({ firstName, cccNumber, email, phoneNumber, password: hashedPassword });
            await newUser.save();

            // After successful registration, generate an authentication token
            const token = jwt.sign({ userId: newUser._id }, config.SECRET_KEY, { expiresIn: '1h' });

            // Store the authentication token in the cache
            redisClient.setAuthToken(token, newUser._id);

            return { message: 'User registered successfully', token };
        } catch (error) {
            throw error;
        }
    }

    async login(identifier, password) {
        try {
            // Check if a user with the given identifier exists
            const user = await this.User.findOne({
                $or: [{ email: identifier }, { phoneNumber: identifier }, { username: identifier }],
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Check if the provided password matches the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new Error('Incorrect password');
            }

            // Check if a valid token exists in the cache
            const existingToken = await redisClient.getAuthToken(user._id);

            if (existingToken) {
                return { token: existingToken, userId: user._id };
            }
            // After successful login, generate an authentication token
            const token = jwt.sign({ userId: user._id }, config.SECRET_KEY, { expiresIn: '1h' });

            // Store the authentication token in the cache
            redisClient.setAuthToken(token, user._id);

            return { token, userId: user._id };
        } catch (error) {
            throw error;
        }
    }
}
const Roc = new PersonService()
const Triage = new VitalsService()
const LabOrders = new LabService()
const AppointmentDir = new AppointmentsService()
const PharmacyDir = new PharmacyService()
const Users = new UserService();
module.exports = {
    Roc,
    Triage,
    LabOrders,
    AppointmentDir,
    PharmacyDir,
    Users,
};
