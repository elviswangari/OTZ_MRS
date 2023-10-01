const { Roc, Triage } = require('../utils/db');
const { internalError } = require('../utils/errors')
const home = (req, res) => {
  res.status(200).json({
    message: "hcw homepage"
  });
}
const getNoOfUser = async (req, res) => {
  const users = await Roc.nbusers();
  res.status(200).json({ users })
};

// const cleanUp = async (cccNumber) => {
//   try {
//     // Find the person by CCC number
//     const person = await Roc.findPersonByCCCNumber(cccNumber);

//     if (!person) {
//       throw new Error(`Person with CCC Number ${cccNumber} not found`);
//     }

//     // Reset the arrays
//     person.lab = [];
//     person.vitals = [];
//     person.pharmacy = [];
//     person.appointment = [];

//     // Save the updated person document
//     await person.save();

//     // Populate the arrays with actual documents
//     // await person.populate('lab').populate('vitals').populate('pharmacy').populate('appointment').execPopulate();
//     await person.execPopulate();
//     // Return the updated person document
//     return person;
//   } catch (error) {
//     throw error;
//   }
// }

const registerRoc = async (req, res) => {
  try {
    // Extract ROC data from the request body
    const {
      firstName,
      lastName,
      surname,
      dateOfBirth,
      residence,
      phoneNumber,
      cccNumber,
      dateEnrolledIntoCare,
      dateEnrolledIntoOTZ,
      work,
      school,
      schoolName,
      schoolLevel,
    } = req.body;

    // Create ROC record
    const rocData = {
      firstName,
      lastName,
      surname,
      dateOfBirth,
      residence,
      phoneNumber,
      cccNumber,
      dateEnrolledIntoCare,
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
    // console.log(req.body);
  } catch (error) {
    internalError(error, res);
  }
}
const updateRocRecord = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      surname,
      dateOfBirth,
      residence,
      phoneNumber,
      cccNumber,
      dateEnrolledIntoCare,
      dateEnrolledIntoOTZ,
      work,
      school,
      schoolName,
      schoolLevel,
    } = req.body;

    // Create ROC record
    const rocData = {
      firstName,
      lastName,
      surname,
      dateOfBirth,
      residence,
      phoneNumber,
      cccNumber,
      dateEnrolledIntoCare,
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
    // console.log(req.body);
  } catch (error) {
    internalError(error, res);
  }
}
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
    // console.log(req.body);
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

const getRocRecord = async (req, res) => {
  try {
    const { cccNumber } = req.body;
    const rocRecord = await Roc.findPersonByCCCNumber(cccNumber);
    if (rocRecord) {
      res.status(200).json({
        rocRecord,
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


module.exports = {
  home,
  getNoOfUser,
  registerRoc,
  updateRocRecord,
  newVitals,
  updateVitals,
  deleteVitals,
  getRocRecord,
};