import DashboardLayout from "./DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TestTubeDiagonal, CalendarDays, Library, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { useVisitData } from '@/visitData';
import { Skeleton } from "@/components/ui/skeleton"


const RocDashboard = () => {
  const { visitData, loading } = useVisitData('roc');

  // Render skeleton if loading or visitData is not available
  if (loading || !visitData || !visitData.details) {
    return <Skeleton />;
  }
  const { labs = [], appointments = [], pharmacy = [] } = visitData.details;

  const formatDate = (date) => new Date(date).toLocaleDateString('en-GB');

  const latestViralLoad = labs.length > 0 ? labs.reduce((latest, lab) => {
    return (!latest || (lab && lab.createdAt && new Date(lab.createdAt) > new Date(latest.createdAt))) ? lab : latest;
  }, null) : null;

  const nextAppointment = appointments.length > 0 ? appointments.reduce((latest, appointment) => {
    return (!latest || (appointment && appointment.createdAt && new Date(appointment.createdAt) > new Date(latest.createdAt))) ? appointment : latest;
  }, null) : null;

  const latestRegimen = pharmacy.length > 0 ? pharmacy.reduce((latest, regimen) => {
    return (!latest || (regimen && regimen.createdAt && new Date(regimen.createdAt) > new Date(latest.createdAt))) ? regimen : latest;
  }, null) : null;

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-lg font-semibold md:text-2xl">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid gap-5">
        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <CardTitle className="text-center font-bold">Hello {visitData.details.firstName || 'Unknown'}</CardTitle>
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
              <CardTitle className="text-center font-bold">Next OTZ Date</CardTitle>
            </div>
            <CardDescription className="text-sm font-semibold">23rd November 2024</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <TestTubeDiagonal className="align-self-start" />
              <CardTitle className="text-center font-bold">Latest Viral Load</CardTitle>
            </div>
            {latestViralLoad && (
              <>
                <CardDescription className="text-sm font-semibold">Date: {formatDate(latestViralLoad.viralLoadDate)}</CardDescription>
                <CardDescription className="text-sm font-semibold">Results: {latestViralLoad.viralLoad}</CardDescription>
              </>
            )}
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <CalendarDays className="align-self-start" />
              <CardTitle className="text-center font-bold">Next Appointment Date</CardTitle>
            </div>
            {nextAppointment && (
              <CardDescription className="text-sm font-semibold">{formatDate(nextAppointment.nextVisitDay)}</CardDescription>
            )}
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <CalendarDays className="align-self-start" />
              <CardTitle className="text-center font-bold">Regimen</CardTitle>
            </div>
            {latestRegimen && (
              <CardDescription className="text-sm font-semibold">{latestRegimen.regimen}</CardDescription>
            )}
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <Library className="align-self-start" />
              <CardTitle className="text-center font-bold">Unfinished Module</CardTitle>
            </div>
            <CardDescription className="text-center font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam expedita doloribus quo.</CardDescription>
            <Button size="sm">Continue module</Button>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <Library className="align-self-start" />
              <CardTitle className="text-center font-bold">Completed Modules</CardTitle>
            </div>
            <CardDescription className="text-center font-semibold"><a href="#">Introduction</a></CardDescription>
            <CardDescription className="text-center"><a href="#">Paticipation</a></CardDescription>
          </CardHeader>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RocDashboard;
