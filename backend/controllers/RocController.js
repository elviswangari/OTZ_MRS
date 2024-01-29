import { Roc, Triage, LabOrders, AppointmentDir, PharmacyDir } from '../utils/db.js';
import { internalError } from '../utils/errors.js'

const getTest = async (req, res) => {
    try {
        console.log('req.user:', req.user);
    } catch (error) {
        console.error('Error in home:', error);
        internalError(error, res);
    }
}
const home = async (req, res) => {
    try {
        // Get CCC number from the authenticated user's details
        const cccNumber = req.user.cccNumber;

        // Fetch details from the Persons collection based on CCC number
        const personDetails = await Roc.findPersonByCCCNumber(cccNumber);

        // Send the details back to the user
        res.status(200).json({
            message: 'Person',
            details: personDetails
        });
    } catch (error) {
        console.error('Error in home:', error);
        internalError(error, res);
    }
}
const getVitals = async (req, res) => {
    try {
        // Get CCC number from the authenticated user's details
        const cccNumber = req.user.cccNumber;
        // Fetch details from the Persons collection based on CCC number
        const personVitals = await Triage.findVitalsForPerson(cccNumber);

        // Send the details back to the user
        res.status(200).json({
            message: 'Vitals',
            details: personVitals
        });

    } catch (error) {
        console.error('Error in vitals:', error);
        internalError(error, res);
    }
}
const getLabs = async (req, res) => {
    try {
        // Get CCC number from the authenticated user's details
        const cccNumber = req.user.cccNumber;
        // Fetch details from the Persons collection based on CCC number
        const personLabs = await LabOrders.findLabsForPerson(cccNumber);

        // Send the details back to the user
        res.status(200).json({
            message: 'Labs',
            details: personLabs
        });

    } catch (error) {
        console.error('Error in Labs:', error);
        internalError(error, res);
    }
}

const getAppointments = async (req, res) => {
    try {
        // Get CCC number from the authenticated user's details
        const cccNumber = req.user.cccNumber;
        // Fetch details from the Persons collection based on CCC number
        const personAppointments = await AppointmentDir.findAppointmentsForPerson(cccNumber);

        // Send the details back to the user
        res.status(200).json({
            message: 'Appointments',
            details: personAppointments
        });

    } catch (error) {
        console.error('Error in Appointments:', error);
        internalError(error, res);
    }
}
const getPharmacy = async (req, res) => {
    try {
        // Get CCC number from the authenticated user's details
        const cccNumber = req.user.cccNumber;
        // Fetch details from the Persons collection based on CCC number
        const personPharmacy = await PharmacyDir.findPharmaciesForPerson(cccNumber);

        // Send the details back to the user
        res.status(200).json({
            message: 'Pharmacy',
            details: personPharmacy
        });

    } catch (error) {
        console.error('Error in Appointments:', error);
        internalError(error, res);
    }
}

export {
    home,
    getVitals,
    getLabs,
    getAppointments,
    getPharmacy,
    getTest,
};