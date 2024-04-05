/* eslint-disable react/prop-types */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


const TriageTable = ({ data }) => {
    return (
        <Table>
            <TableHead>
                <TableHeader>Visit Date</TableHeader>
            </TableHead>
            <TableHead >
                <TableHeader>Vitals</TableHeader>
            </TableHead>
            <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.visitDate}</TableCell>
                        <TableCell>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Weight</TableCell>
                                        <TableCell>{item.weight} Kgs</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Height</TableCell>
                                        <TableCell>{item.height} cms</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Weight</TableCell>
                                        <TableCell>{item.weight} Kgs</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Blood pressuer</TableCell>
                                        <TableCell>{item.bloodPressure} cms</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

const AppointmentTable = ({ data }) => {
    return (
        <Table>
            <TableHead>
                <TableHeader>Visit Day</TableHeader>
            </TableHead>
            <TableHead >
                <TableHeader>Next Appointment</TableHeader>
            </TableHead>
            <TableBody>
                {data.filter(item => item.visitDate || item.nextappointment).map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.visitDate}</TableCell>
                        <TableCell>{item.nextappointment}</TableCell>
                    </TableRow>
                ))}
            </TableBody >
        </Table >
    );
}

const LabsTable = ({ data }) => {
    return (
        <Table>
            <TableHead>
                <TableHeader>Vl Date</TableHeader>
            </TableHead>
            <TableHead >
                <TableHeader>VL Results</TableHeader>
            </TableHead>
            <TableBody>
                {data.filter(item => item.vldate || item.vlresults).map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.vldate}</TableCell>
                        <TableCell>{item.vlresults}</TableCell>
                    </TableRow>
                ))}
            </TableBody >
        </Table >
    );
}

const PhamacyTable = ({ data }) => {
    return (
        <Table>
            <TableHead>
                <TableHeader>Regimen</TableHeader>
            </TableHead>
            <TableHead >
                <TableHeader>Start Date</TableHeader>
            </TableHead>
            <TableBody>
                {data.filter(item => item.regimen || item.regimenstartdate).map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.regimen}</TableCell>
                        <TableCell>{item.regimenstartdate}</TableCell>
                    </TableRow>
                ))}
            </TableBody >
        </Table >
    );
}
export { TriageTable, LabsTable, AppointmentTable, PhamacyTable };