import React from 'react';
import DashboardLayout from '../Shared/DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { TriageTable } from './Table';
import { useVisitData } from '@/visitData';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Salad } from "lucide-react";

const RocTriage = () => {
  const { visitData, loading } = useVisitData('roc/triage');

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
                <BreadcrumbLink href="/roc/triage">Triage</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Salad className="h-8 w-8 text-primary" />
            My Vitals
          </h2>
          <p className="text-muted-foreground">
            View your recorded vitals and clinical assessments.
          </p>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Triage History</CardTitle>
            <CardDescription>A record of your vitals from previous visits.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <TriageTable data={visitData || { details: [] }} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RocTriage;
