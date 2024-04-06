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
    if (!data || !Array.isArray(data.details)) {
        return <div>Loading...</div>;
      }
    
      // Sort the data based on createdAt field
      const sortedData = data.details.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
      return (
        <Table>
          <TableHead>
            <TableHeader>Visit Date</TableHeader>
          </TableHead>
          <TableHead>
            <TableHeader>Vitals</TableHeader>
          </TableHead>
          <TableBody>
            {sortedData.map((item, index) => {
              if (Object.values(item).some(value => value === null)) {
                return null;
              }
    
              return (
                <TableRow key={index}>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString('en-GB')}</TableCell>
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
                          <TableCell>Blood Pressure</TableCell>
                          <TableCell>{item.bloodPressure}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
};

const AppointmentTable = ({ data }) => {
    if (!data || !Array.isArray(data.details)) {
        return <div>Loading...</div>;
    }

    // Sort the data based on createdAt field
    const sortedData = data.details.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <Table>
            <TableHead>
                <TableHeader>Visit Day</TableHeader>
            </TableHead>
            <TableHead>
                <TableHeader>Next Appointment</TableHeader>
            </TableHead>
            <TableBody>
                {sortedData.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{new Date(item.createdAt).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell>{new Date(item.nextVisitDay).toLocaleDateString('en-GB')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

const LabsTable = ({ data }) => {
    if (!data || !Array.isArray(data.details)) {
        return <div>Loading...</div>;
    }

    // Sort the data based on viralLoadDate field
    const sortedData = data.details.sort((a, b) => new Date(b.viralLoadDate) - new Date(a.viralLoadDate));

    return (
        <Table>
            <TableHead>
                <TableHeader>Vl Date</TableHeader>
            </TableHead>
            <TableHead>
                <TableHeader>VL Results</TableHeader>
            </TableHead>
            <TableBody>
                {sortedData.map((item, index) => (
                    <TableRow key={index}>
                        {/* Format the date as DD/MM/YYYY */}
                        <TableCell>{new Date(item.viralLoadDate).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell>{item.viralLoad}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

const PharmacyTable = ({ data }) => {
    if (!data || !Array.isArray(data.details)) {
        return <div>Loading...</div>;
    }

    // Sort the data based on dateStartedRegimen field
    const sortedData = data.details.sort((a, b) => new Date(b.dateStartedRegimen) - new Date(a.dateStartedRegimen));

    return (
        <Table>
            <TableHead>
                <TableHeader>Regimen</TableHeader>
            </TableHead>
            <TableHead>
                <TableHeader>Start Date</TableHeader>
            </TableHead>
            <TableHead>
                <TableHeader>Regimen Line</TableHeader>
            </TableHead>
            <TableBody>
                {sortedData.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.regimen}</TableCell>
                        {/* Format the date as DD/MM/YYYY */}
                        <TableCell>{new Date(item.dateStartedRegimen).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell>{item.regimenLine}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
export { TriageTable, LabsTable, AppointmentTable, PharmacyTable };