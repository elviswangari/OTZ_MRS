import { Roc, Triage, LabOrders, PharmacyDir, AppointmentDir, Hcws, Modules } from '../utils/db.js';
import { internalError } from '../utils/errors.js';
// import { redisClient } from '../utils/redis.js';

const home = async (req, res) => {
    try {
        const people = await Roc.findAllPersons();
        const allCCCNumbers = people.map(person => ({
            cccNumber: person.cccNumber,
            gender: person.gender,
            dob: person.dateOfBirth,
            labs: person.labs
        }));
        const labs = await LabOrders.findAllLabs()

        res.status(200).json({
            message: "hcw homepage",
            allCCCNumbers,
            labs
        });
    } catch (error) {
        internalError(error, res);
    }
};
const getNoOfUser = async (req, res) => {
    const users = await Roc.nbusers();
    res.status(200).json({ users })
};

// register new person
const registerRoc = async (req, res) => {
    try {
        // Extract ROC data from the request body
        const {
            firstName,
            lastName,
            surname,
            dateOfBirth,
            gender,
            residence,
            phoneNumber,
            cccNumber,
            OTZNumber,
            dateEnrolledIntoCare,
            dateEnrolledIntoOTZ,
            work,
            school,
            schoolName,
            schoolLevel,
            dateStartedArt,
        } = req.body;

        // Create ROC record
        const rocData = {
            firstName,
            lastName,
            surname,
            dateOfBirth,
            gender,
            residence,
            phoneNumber,
            cccNumber,
            OTZNumber,
            dateEnrolledIntoCare,
            dateStartedArt,
            dateEnrolledIntoOTZ,
            work,
            school,
            schoolName,
            schoolLevel,
        };

        const newRoc = await Roc.createPerson(rocData);

        res.status(201).json({
            message: 'ROC registered successfully',
            roc: newRoc,
        });
    } catch (error) {
        internalError(error, res);
    }
}
// update persons record
const updateRocRecord = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            surname,
            dateOfBirth,
            gender,
            residence,
            phoneNumber,
            cccNumber,
            OTZNumber,
            dateEnrolledIntoCare,
            dateEnrolledIntoOTZ,
            work,
            school,
            schoolName,
            schoolLevel,
            dateStartedArt,
        } = req.body;

        // Create ROC record
        const rocData = {
            firstName,
            lastName,
            surname,
            dateOfBirth,
            gender,
            residence,
            phoneNumber,
            cccNumber,
            OTZNumber,
            dateEnrolledIntoCare,
            dateStartedArt,
            dateEnrolledIntoOTZ,
            work,
            school,
            schoolName,
            schoolLevel,
        };

        const rocUpdate = await Roc.updatePersonByCCCNumber(cccNumber, rocData);

        res.status(201).json({
            message: 'ROC records updated successfully',
            rocUpdate,
        });
    } catch (error) {
        internalError(error, res);
    }
}
// create new vitals
const newVitals = async (req, res) => {
    try {
        // Extract ROC data from the request body
        const {
            weight,
            height,
            bloodPressure,
            cccNumber,
        } = req.body;

        // Create ROC vital record
        const vitalsData = {
            weight,
            height,
            bloodPressure,
            cccNumber,
        };

        const newVital = await Triage.createVitalsForPerson(cccNumber, vitalsData);

        res.status(201).json({
            message: 'ROC record saved successfully',
            newVital,
        });
    } catch (error) {
        internalError(error, res);
    }
}

// update vitals
const updateVitals = async (req, res) => {
    try {
        // Extract ROC data from the request body
        const {
            weight,
            height,
            bloodPressure,
            cccNumber,
            vitalId,
        } = req.body;

        // Create ROC vital record
        const updatedVitals = {
            weight,
            height,
            bloodPressure,
            cccNumber,
        };

        const newVital = await Triage.updateVitalsForPerson(cccNumber, vitalId, updatedVitals);
        if (newVital) {
            res.status(200).json({
                message: 'Vital record updated successfully',
                newVital,
            });
        } else {
            res.status(404).json({
                message: 'Vital record not found',
            });
        }
    } catch (error) {
        internalError(error, res);
    }
}

//delete vital
const deleteVitals = async (req, res) => {
    const { cccNumber, vitalId } = req.body;
    try {
        const vitalDeleted = await Triage.deleteVitalsForPerson(cccNumber, vitalId);
        if (vitalDeleted) {
            res.status(204).json({
                message: 'Vital record deleted successfully',
            });
        } else {
            res.status(404).json({
                message: 'Vital record not found',
            });
        }
    } catch (error) {
        internalError(error, res);
    }
}

//find persons records
const getRocRecord = async (req, res) => {
    try {
        const { cccNumber } = req.body;
        const rocRecord = await Roc.findPersonByCCCNumber(cccNumber);
        // const redisRec = await redisClient.getAuthToken(req.headers.authorization);
        if (rocRecord) {
            res.status(200).json({
                rocRecord,
                // redisRec,
            });
        } else {
            res.status(404).json({
                message: 'ROC record not found',
            });
        }
    } catch (error) {
        internalError(error, res);
    }
}

//lab orders
const newLabOrder = async (req, res) => {
    try {
        // Extract ROC data from the request body
        const {
            viralLoad,
            viralLoadDate,
            cccNumber,
        } = req.body;

        // Create ROC vital record
        const labData = {
            viralLoad,
            viralLoadDate,
            cccNumber,
        };

        const newLab = await LabOrders.createLabForPerson(cccNumber, labData);

        res.status(201).json({
            message: 'Lab record saved successfully',
            newLab,
        });
    } catch (error) {
        internalError(error, res);
    }
}

// update lab order
const updateLabOrder = async (req, res) => {
    try {
        // Extract ROC data from the request body
        const {
            viralLoad,
            viralLoadDate,
            cccNumber,
            labId,
        } = req.body;

        // Create ROC vital record
        const updatedLabs = {
            viralLoad,
            viralLoadDate,
            cccNumber,
            labId,
        };

        const newLab = await LabOrders.updateLabForPerson(cccNumber, labId, updatedLabs);
        if (newLab) {
            res.status(200).json({
                message: 'Lab record updated successfully',
                newLab,
            });
        } else {
            res.status(404).json({
                message: 'Lab record not found',
            });
        }
    } catch (error) {
        internalError(error, res);
    }
}

//delete laborder
const deleteLabOrder = async (req, res) => {
    const { cccNumber, labId } = req.body;
    try {
        const deletedLab = await LabOrders.deleteLabForPerson(cccNumber, labId);
        if (deletedLab) {
            res.status(204).json({
                message: 'Lab record deleted successfully',
            });
        } else {
            res.status(404).json({
                message: 'Lab record not found',
            });
        }
    } catch (error) {
        internalError(error, res);
    }
}

//phamacy
//phamacy orders
const newPharmacyOrder = async (req, res) => {
    try {
        // Extract ROC data from the request body
        const {
            cccNumber,
            regimen,
            dateStartedRegimen,
            regimenLine,
        } = req.body;

        // Create ROC vital record
        const pharmacyData = {
            cccNumber,
            regimen,
            dateStartedRegimen,
            regimenLine,
        };

        const newPharmacy = await PharmacyDir.createPharmacyForPerson(cccNumber, pharmacyData);

        res.status(201).json({
            message: 'Pharmacy record saved successfully',
            newPharmacy,
        });
    } catch (error) {
        internalError(error, res);
    }
}

// update phamacy order
const updatePharmacyOrder = async (req, res) => {
    try {
        // Extract ROC data from the request body
        const {
            cccNumber,
            regimen,
            dateStartedRegimen,
            regimenLine,
            pharmacyId,
        } = req.body;

        // Create ROC vital record
        const updatedPharmacy = {
            cccNumber,
            regimen,
            dateStartedRegimen,
            regimenLine,
            pharmacyId,
        };

        const newPharmacy = await PharmacyDir.updatePharmacyForPerson(cccNumber, pharmacyId, updatedPharmacy);
        if (newPharmacy) {
            res.status(200).json({
                message: 'Pharmacy record updated successfully',
                newPharmacy,
            });
        } else {
            res.status(404).json({
                message: 'Pharmacy record not found',
            });
        }
    } catch (error) {
        internalError(error, res);
    }
}

//delete phamacy order
const deletePharmacyOrder = async (req, res) => {
    const { cccNumber, pharmacyId } = req.body;
    try {
        const deletedPharmacy = await PharmacyDir.deletePharmacyForPerson(cccNumber, pharmacyId);
        if (deletedPharmacy) {
            res.status(204).json({
                message: 'Pharmacy record deleted successfully',
            });
        } else {
            res.status(404).json({
                message: 'Lab record not found',
            });
        }
    } catch (error) {
        internalError(error, res);
    }
}

//appointments
//appointments
const newAppointment = async (req, res) => {
    try {
        // Extract ROC data from the request body
        const {
            cccNumber,
            nextVisitDay,
        } = req.body;

        // Create ROC vital record
        const appointmentData = {
            cccNumber,
            nextVisitDay,
        };

        const newAppointment = await AppointmentDir.createAppointmentForPerson(cccNumber, appointmentData);

        res.status(201).json({
            message: 'Appointment record saved successfully',
            newAppointment,
        });
    } catch (error) {
        internalError(error, res);
    }
}

// update appoinment
const updateAppointment = async (req, res) => {
    try {
        // Extract ROC data from the request body
        const {
            cccNumber,
            nextVisitDay,
            appointmentId,
        } = req.body;

        // Create ROC vital record
        const updatedAppointment = {
            cccNumber,
            nextVisitDay,
            appointmentId,
        };

        const newAppointment = await AppointmentDir.updateAppointmentForPerson(cccNumber, appointmentId, updatedAppointment);
        if (newAppointment) {
            res.status(200).json({
                message: 'Appointment record updated successfully',
                newAppointment,
            });
        } else {
            res.status(404).json({
                message: 'Appointment record not found',
            });
        }
    } catch (error) {
        internalError(error, res);
    }
}

//delete appointment order
const deleteAppointment = async (req, res) => {
    const { cccNumber, appointmentId } = req.body;
    try {
        const deletedAppointment = await AppointmentDir.deleteAppointmentForPerson(cccNumber, appointmentId);
        if (deletedAppointment) {
            res.status(204).json({
                message: 'Appointment record deleted successfully',
            });
        } else {
            res.status(404).json({
                message: 'Appointment record not found',
            });
        }
    } catch (error) {
        internalError(error, res);
    }
}

const newHcwAccount = async (req, res) => {
    const { firstName, lastName, username, gender, email, phoneNumber, roles, password, confirmPassword } = req.body;
    try {
        const hcwDetails = { firstName, lastName, username, gender, email, phoneNumber, roles, password, confirmPassword };
        const newAccount = await Hcws.registerHcw(hcwDetails);
        // console.log(newAccount)
        res.status(200).json({
            message: newAccount.message,
            token: newAccount.token,
            userId: newAccount.userId,
        });

    } catch (error) {
        internalError(error, res);
    }
}

const updateHcwAccount = async (req, res) => {
    const { firstName, lastName, username, gender, email, phoneNumber, roles, password, confirmPassword, hcwId } = req.body;
    try {
        const hcwDetails = { firstName, lastName, username, gender, email, phoneNumber, roles, password, confirmPassword };
        const updateAccount = await Hcws.updateHcw(hcwId, hcwDetails);
        // console.log(updateAccount)
        res.status(200).json({
            message: updateAccount.message,
            userId: updateAccount.userId,
        });

    } catch (error) {
        internalError(error, res);
    }
}

const newModule = async (req, res) => {
    const { title, category, body } = req.body;

    try {
        const newModule = { title, category, body };
        const mod = await Modules.createModule(newModule);

        console.log(mod);

        res.status(200).json({
            title: mod.title,
            userId: mod._id,
        });
    } catch (error) {
        internalError(error, res)
    }
}
const updateModule = async (req, res) => {
    const { title, category, body, moduleId } = req.body;

    try {
        const newModule = { title, category, body };
        const mod = await Modules.updateModule(moduleId, newModule);


        res.status(200).json({
            title: mod.title,
            userId: mod._id,
        });
    } catch (error) {
        internalError(error, res)
    }
}

const deleteModule = async (req, res) => {
    const {moduleId} = req.body;

    try {
        const mod = await Modules.deleteModule(moduleId);

        if (mod) {
            res.status(204).json({
                message: 'Module record deleted successfully',
            });
        } else {
            res.status(404).json({
                message: 'Module record not found',
            });
        }
    } catch (error) {
        internalError(error, res)
    }
}

export {
    home,
    getNoOfUser,
    registerRoc,
    updateRocRecord,
    newVitals,
    updateVitals,
    deleteVitals,
    getRocRecord,
    newLabOrder,
    updateLabOrder,
    deleteLabOrder,
    newPharmacyOrder,
    updatePharmacyOrder,
    deletePharmacyOrder,
    newAppointment,
    updateAppointment,
    deleteAppointment,
    newHcwAccount,
    updateHcwAccount,
    newModule,
    updateModule,
    deleteModule,

};
