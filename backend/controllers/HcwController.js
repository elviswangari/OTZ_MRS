import { Roc, Triage, LabOrders, PharmacyDir, AppointmentDir, Hcws, Modules } from '../utils/db.js';
import { internalError } from '../utils/errors.js';
// import { redisClient } from '../utils/redis.js';
import Excel from 'exceljs';

const capitalizeFirstLetter = (str)  =>  {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

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
            firstName: capitalizeFirstLetter(firstName.toUpperCase()),
            lastName: capitalizeFirstLetter(lastName.toUpperCase()),
            surname: capitalizeFirstLetter(surname.toUpperCase()),
            dateOfBirth,
            gender,
            residence,
            phoneNumber,
            cccNumber,
            OTZNumber,
            dateEnrolledIntoCare,
            dateStartedArt,
            dateEnrolledIntoOTZ,
            work: work.toUpperCase(),
            school: school.toUpperCase(),
            schoolName: schoolName.toUpperCase(),
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
            firstName: capitalizeFirstLetter(firstName.toUpperCase()),
            lastName: capitalizeFirstLetter(lastName.toUpperCase()),
            surname: capitalizeFirstLetter(surname.toUpperCase()),
            dateOfBirth,
            gender,
            residence,
            phoneNumber,
            cccNumber,
            OTZNumber,
            dateEnrolledIntoCare,
            dateStartedArt,
            dateEnrolledIntoOTZ,
            work: work.toUpperCase(),
            school: school.toUpperCase(),
            schoolName: schoolName.toUpperCase(),
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
    const { moduleId } = req.body;

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

const allReports = async (req, res) => {
    try {
        res.status(200).json({
            otzMonthly: "<a href='http://localhost:3001/hcw/report/otzMonthly'>otzMounthly Report</a>",
            stf: "<a href='http://localhost:3001/hcw/report/stf'>STF Report</a>",
        });
    } catch (error) {
        internalError(error, res)
    }
}

const otzMonthly = async (req, res) => {
    try {
        let workbook = new Excel.Workbook();

        // Create a single worksheet for all tables
        let worksheet = workbook.addWorksheet('OTZ Monthly Report');

        // Define header information
        const headerInfo = [
            ['OTZ MONTHLY REPORTING TOOL'],
            ['Facility: ______NTRH______'],
            ['MONTH: JAN YEAR: 2024']
        ];

        // Merge cells and center-align text for header information
        headerInfo.forEach(info => {
            const row = worksheet.addRow(info);
            row.getCell(1).alignment = { horizontal: 'center' };
            worksheet.mergeCells(row.number, 1, row.number, 3);
        });

        // Add an empty row after the header information
        worksheet.addRow([]);

        // Define columns for each table
        const tableData = [
            {
                title: '',
                headers: ['Baseline Information', 'Male 10-19yrs', 'Female 10-19yrs'],
                rows: [
                    ['Adolescent currently on ART', '59', '70'],
                    ['Adolescent Active in OTZ', '59', '69'],
                    ['Newly enrolled in OTZ within the month', '2', '2'],
                    ['ALHIV in OTZ with baseline VL results (VL within the last 12 months)', '1', '2'],
                    ['ALHIV\'s enrolled in OTZ with VL> 1000 at baseline', '0', '0'],
                    ['ALHIV\'s enrolled in OTZ with VL< 1000 at baseline', '1', '0'],
                    ['ALHIV\'s enrolled in OTZ with VL = LDL at baseline', '0', '2']
                ]
            },
            {
                title: '',
                headers: ['Routine VL monitoring', 'Male 10-19yrs', 'Female 10-19yrs'],
                rows: [
                    ['Total ALHIV who were eligible for routine viral load testing during the reporting', '3', '18'],
                    ['Total ALHIV who were eligible for routine viral load testing from previous months', '20', '23'],
                    ['# of ALHIV whose samples were taken for routine viral load testing', '0', '3'],
                    ['# of ALHIV with routine follow up VL results at the end of the reporting month', '0', '0'],
                    ['# with follow up VL > 1000 copies/ml', '0', '0'],
                    ['#with routine follow up VL < 1000 copies/ml', '0', '0'],
                    ['# with routine VL results reported as LDL', '0', '0']
                ]
            },
            {
                title: '',
                headers: ['Additional monitoring', 'Male 10-19yrs', 'Female 10-19yrs'],
                rows: [
                    ['# of adolescents in OTZ who were booked for appointments in the month', '3', '18'],
                    ['#  of adolescents in OTZ who kept their clinic appointments', '20', '23'],
                    ['# of adolescents in OTZ with adherence >95% adherence', '0', '3'],
                    ['# No of OTZ who attended support group and received motivational messages', '0', '0'],
                ]
            },
            {
                title: '',
                headers: ['Tracking those with suspected treatment failure (6 month cohort report: Refer to guidance for month to review)', 'Male 10-19yrs', 'Female 10-19yrs'],
                rows: [
                    ['Total number of ALHIV with VL>1000 copies/ml from the 6 months earlier', '3', '18'],
                    ['Total ALHIV for the month of review who had repeat VL test results', '20', '23'],
                    ['# with repeat VL < 1000 copies/ml ', '0', '3'],
                    ['# with repeat VL > 1000 copies/ml ', '0', '0'],
                    ['# with follow up VL > 1000 copies/ml', '0', '0'],
                    ['# switched to second line ART', '0', '0'],
                    ['# switched to third line ART ', '0', '0']
                ]
            },
            {
                title: '',
                headers: ['Tracking attritions', 'Male 10-19yrs', 'Female 10-19yrs'],
                rows: [
                    ['Number transferred out this month', '3', '18'],
                    ['Number Lost to follow up this month', '20', '23'],
                    ['No. transitioned to young adults (Age 20+) this month', '0', '3'],
                    ['No. reported as dead this month', '0', '0'],
                ]
            },
            {
                title: '',
                headers: ['Continuing Services', 'Male 20-24yrs', 'Female 20-24yrs'],
                rows: [
                    ['Number of adolescents graduating from OTZ and still in the program', '3', '18'],
                    ['Total number eligible for routine VL testing this month', '20', '23'],
                    ['Number whose samples were collected ', '0', '3'],
                    ['Number with VL results', '0', '0'],
                    ['Number with VL results <1000 copies/ml', '0', '0'],
                    ['Number with VL results >1000 copies/ml', '0', '0'],
                    ['Number exited from Post OTZ group this month', '0', '0']
                ]
            },
        ];

        // Add each table to the worksheet
        tableData.forEach(table => {
            // Add title row and merge cells
            const titleRow = worksheet.addRow([table.title]);
            titleRow.getCell(1).alignment = { horizontal: 'center' };
            worksheet.mergeCells(titleRow.number, 1, titleRow.number, 3);

            // Add headers row
            const headerRow = worksheet.addRow(table.headers);
            headerRow.font = { bold: true }; // Make header row bold
            headerRow.eachCell((cell, index) => {
                cell.alignment = { horizontal: index === 1 ? 'left' : 'center' };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }; // Add border to cells
            });

            // Add rows
            table.rows.forEach(rowData => {
                const row = worksheet.addRow(rowData);
                row.eachCell((cell, index) => {
                    cell.alignment = { horizontal: index === 1 ? 'left' : 'center', vertical: 'middle' };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    }; // Add border to cells
                });
            });

            // Add empty row after each table
            // worksheet.addRow([]);
        });

        // Set the headers to prompt download with the dynamic filename including date and time
        const dateTime = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString().replace(/:/g, '-').replace('T', '_').split('.')[0];
        const filename = `otzMonthlyReport_${dateTime}.xlsx`;
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        internalError(error, res);
    }
};

const stf = async (req, res) => {
    try {
        let workbook = new Excel.Workbook();

        // Create a single worksheet for all tables
        let worksheet = workbook.addWorksheet('STF');

        // Define header information
        const headerInfo = [
            ['STF REPORT'],
            ['FACILITY: NTRH'],

        ];

        // Merge cells and center-align text for header information
        headerInfo.forEach(info => {
            const row = worksheet.addRow(info);
            row.getCell(1).alignment = { horizontal: 'center' };
            worksheet.mergeCells(row.number, 1, row.number, 3);
        });

        // Add an empty row after the header information
        worksheet.addRow([]);
        // Define columns for each table
        const tableData = [
            {
                title: '',
                headers: ['STF', 'Male 10-19yrs', 'Female 10-19yrs'],
                rows: [
                    ['Viral Load Copies > 200', '2', '1'],
                    ['Viral Load Copies > 400', '1', '1'],
                    ['Viral Load Copies > 1000', '2', '2'],
                    ['Number EAC done', '1', '2'],
                    ['Number of Home visit done', '0', '0'],
                ]
            },
        ];

        // Add each table to the worksheet
        tableData.forEach(table => {
            // Add title row and merge cells
            const titleRow = worksheet.addRow([table.title]);
            titleRow.getCell(1).alignment = { horizontal: 'center' };
            worksheet.mergeCells(titleRow.number, 1, titleRow.number, 3);

            // Add headers row
            const headerRow = worksheet.addRow(table.headers);
            headerRow.font = { bold: true }; // Make header row bold
            headerRow.eachCell((cell, index) => {
                cell.alignment = { horizontal: index === 1 ? 'left' : 'center' };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });

            // Add rows
            table.rows.forEach(rowData => {
                const row = worksheet.addRow(rowData);
                row.eachCell((cell, index) => {
                    cell.alignment = { horizontal: index === 1 ? 'left' : 'center', vertical: 'middle' };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            });

            // Add empty row after each table
            // worksheet.addRow([]);
        });

        // Set the headers to prompt download with the dynamic filename including date and time
        const dateTime = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString().replace(/:/g, '-').replace('T', '_').split('.')[0];
        const filename = `STFReport_${dateTime}.xlsx`;
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        internalError(error, res);
    }
}

const viralLoad = async (req, res) => {
    try {
        let workbook = new Excel.Workbook();

        // Create a single worksheet for all tables
        let worksheet = workbook.addWorksheet('STF');

        worksheet.columns = [
            { header: 'CCC Number', key: 'cccnumber', width: 15 },
            { header: 'Age', key: 'age', width: 15 },
            { header: 'Date Enrolled', key: 'enrolmentdate', width: 15 },
            { header: 'ART Start Date', key: 'datestartedart', width: 15 },
            { header: 'Viral Load results', key: 'vlresults', width: 17 },
            { header: 'Viral Load Date', key: 'vldate', width: 15 },
            { header: 'Current regimen', key: 'currentregimen', width: 15 },
            { header: 'Date started Current regimen', key: 'datestartcurrentregimen', width: 20 }, // New header
        ];

        worksheet.addRow({
            cccnumber: 1530500001,
            age: 23,
            enrolmentdate: new Date('2023-01-15'),
            datestartedart: new Date('2023-02-10'),
            vlresults: 'LDL',
            vldate: new Date('2023-03-20'),
            currentregimen: 'TDF/3TC/DTG',
            datestartcurrentregimen: new Date('2023-02-20') // New date
        });

        // Set the headers to prompt download with the dynamic filename including date and time
        const dateTime = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString().replace(/:/g, '-').replace('T', '_').split('.')[0];
        const filename = `viralLoad_${dateTime}.xlsx`;
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        internalError(error, res);
    }
};

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
    allReports,
    otzMonthly,
    stf,
    viralLoad,


};
