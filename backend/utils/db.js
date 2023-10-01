const mongoose = require('mongoose');
const {
    Vitals,
    Lab,
    Appointments,
    Pharmacy,
    Person,

} = require('../model/DbModel');
const config = require('../config');

mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

class PersonService {
    constructor() {
        this.Person = mongoose.model('Person', Person.schema);
    }
    // async createPerson(personData) {
    //     try {
    //         const newPerson = new Person(personData);
    //         return await newPerson.save();
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async findPersonByCCCNumber(cccNumber) {
    //     try {
    //         return await Person.findOne({ cccNumber }).exec();
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    // async findPersonByCCCNumber(cccNumber) {
    //     try {
    //         // Find the person by CCC number
    //         const person = await this.Person.findOne({ cccNumber }).exec();
    //         console.log(person);
    //         if (!person) {
    //             throw new Error(`Person with CCC Number ${cccNumber} not found`);
    //         }

    //         // // Reset the arrays to empty
    //         // person.lab = [];
    //         // person.vitals = [];
    //         // person.pharmacy = [];
    //         // person.appointment = [];

    //         // // Save the updated person document
    //         // await person.save();

    //         // // Populate the arrays with actual documents
    //         // await person.populate('lab').populate('vitals').populate('pharmacy').populate('appointment').execPopulate();

    //         // // Return the updated person document
    //         return person;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    async createPerson(personData) {
        const { cccNumber } = personData;

        try {
            const existingPerson = await this.Person.findOne({ cccNumber }).exec();

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
            const person = await this.Person.findOne({ cccNumber }).populate({ path: 'vitals' });

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
            return await Person.findOneAndUpdate({ cccNumber }, updatedData, { new: true }).exec();
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
            return await Person.findOneAndDelete({ cccNumber }).exec();
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
            const person = await Person.findOne({ cccNumber }).exec();
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
            const person = await Person.findOne({ cccNumber }).populate('vitals').exec();
            return person ? person.vitals : [];
        } catch (error) {
            throw error;
        }
    }

    // async updateVitalsForPerson(cccNumber, vitalId, updatedData) {
    //     try {
    //         //set the array to empty
    //         await this.Person.updateOne({ cccNumber }, { vitals: [] }).exec();
    //         // Find the vital record with both cccNumber and _id
    //         const updatedVitals = await this.Vitals.findOneAndUpdate(
    //             { cccNumber, _id: vitalId },
    //             updatedData,
    //             { new: true }
    //         ).exec();

    //         if (!updatedVitals) {
    //             throw new Error(`Vitals with CCC Number ${cccNumber} and ID ${vitalId} not found`);
    //         }

    //         // Repopulate the vitals array
    //         await this.Person.updateOne({ cccNumber }, { $push: { vitals: updatedVitals } }).exec();

    //         return updatedVitals;
    //     } catch (error) {
    //         //console.error(`Error updating vitals for CCC Number ${cccNumber}: ${error.message}`);
    //         throw error;
    //     }
    // }

    // async deleteVitalsForPerson(cccNumber, vitalId) {
    //     try {
    //         const person = await Person.findOne({ cccNumber });
    //         const vitalToDelete = await Vitals.findOne({ cccNumber, vitalId });

    //         if (!person && !vitalToDelete) {
    //             throw new Error('Person or Vitals not found');
    //         }

    //         // If you are using an array of vitals in the Person model
    //         // const vitalsIndex = person.vitals.indexOf(vitalId);
    //         // if (vitalsIndex === -1) {
    //         //     throw new Error('Vitals not found for this person');
    //         // }
    //         // person.vitals.splice(vitalsIndex, 1);
    //         // await person.save();

    //         // If you are directly deleting the vitals using findByIdAndDelete
    //         return await Vitals.findByIdAndDelete(vitalId);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async updateVitalsForPerson(cccNumber, vitalId, updatedData) {
        try {
            // Find the person by CCC number
            const person = await this.Person.findOne({ cccNumber }).exec();
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

            // // Set the vitals array to empty (assuming it's an array)
            // person.vitals = [];

            // Save the person document to clear the vitals array
            // await person.save();

            // Repopulate the vitals array
            // person.vitals.push(updatedVitals);
            // await person.save();
            person.populated({path: 'vitals'});
            await person.save();

            return updatedVitals;
        } catch (error) {
            throw error;
        }
    }
    async deleteVitalsForPerson(cccNumber, vitalId) {
        try {
            const person = await this.Person.findOne({ cccNumber }).exec();
            const vitalToDelete = await this.Vitals.findByIdAndDelete(vitalId).exec();

            if (!person || !vitalToDelete) {
                throw new Error('Person or Vitals not found');
            }

            // Remove the vital from the person's array (if applicable)
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
            const person = await Person.findOne({ cccNumber }).exec();
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
            const person = await Person.findOne({ cccNumber }).populate('labs').exec();
            return person ? person.labs : [];
        } catch (error) {
            throw error;
        }
    }

    async updateLabForPerson(labId, updatedData) {
        try {
            return await Lab.findByIdAndUpdate(labId, updatedData, { new: true }).exec();
        } catch (error) {
            throw error;
        }
    }

    async deleteLabForPerson(labId, cccNumber) {
        try {
            const person = await Person.findOne({ cccNumber }).exec();
            if (!person) {
                throw new Error('Person not found');
            }

            const labIndex = person.labs.indexOf(labId);
            if (labIndex === -1) {
                throw new Error('Lab record not found for this person');
            }

            person.labs.splice(labIndex, 1);
            await person.save();

            return await Lab.findByIdAndDelete(labId).exec();
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
            const person = await Person.findOne({ cccNumber }).exec();
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
            const person = await Person.findOne({ cccNumber }).populate('appointments').exec();
            return person ? person.appointments : [];
        } catch (error) {
            throw error;
        }
    }

    async updateAppointmentForPerson(appointmentId, updatedData) {
        try {
            return await Appointments.findByIdAndUpdate(appointmentId, updatedData, { new: true }).exec();
        } catch (error) {
            throw error;
        }
    }

    async deleteAppointmentForPerson(appointmentId, cccNumber) {
        try {
            const person = await Person.findOne({ cccNumber }).exec();
            if (!person) {
                throw new Error('Person not found');
            }

            const appointmentIndex = person.appointments.indexOf(appointmentId);
            if (appointmentIndex === -1) {
                throw new Error('Appointment record not found for this person');
            }

            person.appointments.splice(appointmentIndex, 1);
            await person.save();

            return await Appointments.findByIdAndDelete(appointmentId).exec();
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
            const person = await this.Person.findOne({ cccNumber }).exec();
            if (!person) {
                throw new Error('Person not found');
            }

            const newPharmacy = new this.Pharmacy(pharmacyData);
            person.pharmacies.push(newPharmacy);

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
            const person = await this.Person.findOne({ cccNumber }).populate('pharmacies').exec();
            return person ? person.pharmacies : [];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updatePharmacyForPerson(pharmacyId, updatedData) {
        try {
            return await this.Pharmacy.findByIdAndUpdate(pharmacyId, updatedData, { new: true }).exec();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deletePharmacyForPerson(pharmacyId, cccNumber) {
        try {
            const person = await this.Person.findOne({ cccNumber }).exec();
            if (!person) {
                throw new Error('Person not found');
            }

            const pharmacyIndex = person.pharmacies.indexOf(pharmacyId);
            if (pharmacyIndex === -1) {
                throw new Error('Pharmacy record not found for this person');
            }

            person.pharmacies.splice(pharmacyIndex, 1);
            await person.save();

            return await this.Pharmacy.findByIdAndDelete(pharmacyId).exec();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const Roc = new PersonService()
const Triage = new VitalsService()
const LabOrders = new LabService()
const AppointmentDir = new AppointmentsService()
const PharmacyDir = new PharmacyService()
module.exports = {
    Roc,
    Triage,
    LabOrders,
    AppointmentDir,
    PharmacyDir,
};
