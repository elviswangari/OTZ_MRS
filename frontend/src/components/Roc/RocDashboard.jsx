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
              <CardTitle className="text-center font-bold">Regimen</CardTitle>
            </div>
            <CardDescription className="text-sm font-semibold">
              TDF/3TC/DTG
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
