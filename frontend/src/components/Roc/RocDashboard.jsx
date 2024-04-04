import DashboardLayout from "./DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  TestTubeDiagonal,
  CalendarDays,
  Library,
  Hand,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

const RocDashboard = () => {
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
                Hello Elvis
              </CardTitle>
              <Hand />
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
        <div>
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
            Date: 23rd March 2024
            </CardDescription>
            <CardDescription className="text-sm font-semibold">
            Results: LDL
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
              23rd June 2024
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="grid gap-1">
            <div className="flex items-center space-x-4">
              <CalendarDays className="align-self-start" />
              <CardTitle className="text-center font-bold">
                Regimen
              </CardTitle>
            </div>
            <CardDescription className="text-sm font-semibold">
              TDF/3TC/DTG
            </CardDescription>
          </CardHeader>
        </Card>
        </div>

        <Card className="flex justify-center items-center">
          <CardContent className="flex items-center justify-center flex-col lg:flex-row lg:items-start lg:justify-center">
            <div className="flex items-center">
              <CalendarDays className="h-6 w-6" />
              <div className="ml-2">
                <CardTitle className="text-center font-bold">
                  Next OTZ Date
                </CardTitle>
                <span className="text-center font-semibold">23rd Dec 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center">
            <Library className="h-6 w-6" />
            <CardTitle className="text-center">Name module</CardTitle>
            <CardDescription className="text-center">
              A short description about the module.
              <Button size="sm">Continue module</Button>
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="grid gap-1">
            <Library className="h-6 w-6" />
            <CardTitle className="text-sm font-semibold">
              Completed modules
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="grid gap-1">
            <TestTubeDiagonal className="h-6 w-6" />
            <CardTitle className="text-sm font-semibold">Viral Load</CardTitle>
            <CardDescription className="text-sm font-xs">
              Chart showing viral load over time
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="grid gap-1">
            <CardTitle className="text-sm font-semibold">Weight</CardTitle>
            <CardDescription className="text-sm font-xs">
              Chart showing weight over time
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RocDashboard;
