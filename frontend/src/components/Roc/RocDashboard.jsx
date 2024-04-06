import DashboardLayout from "./DashboardLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TestTubeDiagonal, CalendarDays, Library, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
// import Charts from './Charts';
import { useState, useEffect } from 'react';
import { getRequest } from '@/Axios';

const RocDashboard = () => {
  const [personData, setPersonData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRequest('roc');
        setPersonData(data.details);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Check if personData is not null to avoid errors
  if (!personData) {
    return <div>Loading...</div>;
  }

  // Destructure the required data from personData
  const { labs, appointments, pharmacy } = personData;

  // Find the latest viral load
  const latestViralLoad = labs.length > 0 ? labs.reduce((latest, lab) => {
    return new Date(lab.createdAt) > new Date(latest.createdAt) ? lab : latest;
  }) : null;

  // Find the next appointment
  const nextAppointment = appointments.length > 0 ? appointments.reduce((latest, appointment) => {
    return new Date(appointment.createdAt) > new Date(latest.createdAt) ? appointment : latest;
  }) : null;

  // Find the latest regimen
  const latestRegimen = pharmacy.length > 0 ? pharmacy.reduce((latest, regimen) => {
    return new Date(regimen.createdAt) > new Date(latest.createdAt) ? regimen : latest;
  }) : null;
  return (
    <DashboardLayout>
      <div className="flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-lg font-semibold md:text-2xl"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid gap-5">
        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <CardTitle className="text-center font-bold">
                Hello {personData.firstName}
              </CardTitle>
              <Hand />
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <CalendarDays className="align-self-start" />
              <CardTitle className="text-center font-bold">
                Next OTZ Date
              </CardTitle>
            </div>
            <CardDescription className="text-sm font-semibold">
              23rd November 2024
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <TestTubeDiagonal className="align-self-start" />
              <CardTitle className="text-center font-bold">
                Latest Viral Load
              </CardTitle>
            </div>
            <CardDescription className="text-sm font-semibold">
              Date: {new Date(latestViralLoad.viralLoadDate).toLocaleDateString('en-GB')}
            </CardDescription>
            <CardDescription className="text-sm font-semibold">
              Results: {latestViralLoad.viralLoad}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <CalendarDays className="align-self-start" />
              <CardTitle className="text-center font-bold">
                Next Appointment Date
              </CardTitle>
            </div>
            <CardDescription className="text-sm font-semibold">
              {new Date(nextAppointment.nextVisitDay).toLocaleDateString('en-GB')}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <CalendarDays className="align-self-start" />
              <CardTitle className="text-center font-bold">Regimen</CardTitle>
            </div>
            <CardDescription className="text-sm font-semibold">
              {latestRegimen.regimen}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <Library className="align-self-start" />
              <CardTitle className="text-center font-bold">
                Unfinished Module
              </CardTitle>
            </div>
            <CardDescription className="text-center font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              expedita doloribus quo.
            </CardDescription>
            <Button size="sm">Continue module</Button>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <Library className="align-self-start" />
              <CardTitle className="text-center font-bold">
                Completed Modules
              </CardTitle>
            </div>
            <CardDescription className="text-center font-semibold">
              <a href="#">Introduction</a>
            </CardDescription>
            <CardDescription className="text-center">
              <a href="#">Paticipation</a>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* <Charts /> */}
      </div>
    </DashboardLayout>
  );
};

export default RocDashboard;
