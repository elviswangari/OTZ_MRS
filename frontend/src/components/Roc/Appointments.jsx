import React from 'react';
import DashboardLayout from '../Shared/DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AppointmentTable } from './Table';
import { useVisitData } from '@/visitData';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const RocAppointments = () => {
  const { visitData, loading } = useVisitData('roc/appointments');

  return (
    <DashboardLayout role="roc">
      <div className="flex flex-col gap-6">
        <div className="space-y-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/roc">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/roc/appointments">Appointments</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-8 w-8 text-primary" />
            My Appointments
          </h2>
          <p className="text-muted-foreground">
            Keep track of your upcoming clinic visits.
          </p>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Appointment History</CardTitle>
            <CardDescription>A list of your past and upcoming appointments.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <AppointmentTable data={visitData || { details: [] }} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RocAppointments;
