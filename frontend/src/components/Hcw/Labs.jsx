import React, { useMemo } from 'react';
import DashboardLayout from '../Shared/DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LabsTable } from './Table';
import { useVisitData } from '@/visitData';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Beaker, Plus, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePatient } from '@/context/PatientContext';

const HcwLabs = () => {
  const { visitData, loading } = useVisitData('hcw/labs');
  const { activePatient } = usePatient();

  const filteredData = useMemo(() => {
    if (!visitData) return [];
    if (!activePatient) return visitData;
    return visitData.filter(item => item.cccNumber === activePatient.cccNumber);
  }, [visitData, activePatient]);

  return (
    <DashboardLayout role="hcw">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/hcw">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/hcw/labs">Labs</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Beaker className="h-8 w-8 text-primary" />
              Laboratory Results
            </h2>
            <p className="text-muted-foreground">
              {activePatient 
                ? `Viewing lab results for ${activePatient.firstName} ${activePatient.surname}`
                : "Monitor Viral Load and other clinical laboratory tests."}
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Lab Result
          </Button>
        </div>

        {activePatient && (
          <Card className="bg-primary/5 border-primary/10 shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{activePatient.firstName} {activePatient.surname}</h3>
                  <p className="text-sm text-muted-foreground">CCC Number: {activePatient.cccNumber} | Gender: {activePatient.gender}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>{activePatient ? 'Patient Lab History' : 'Recent Lab Results'}</CardTitle>
            <CardDescription>
              {activePatient 
                ? `Showing all lab results for CCC: ${activePatient.cccNumber}`
                : "A history of laboratory tests and results."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <LabsTable data={filteredData} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};


export default HcwLabs;
