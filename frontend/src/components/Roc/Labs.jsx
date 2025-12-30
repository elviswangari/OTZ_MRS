import React from 'react';
import DashboardLayout from '../Shared/DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LabsTable } from './Table';
import { useVisitData } from '@/visitData';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Beaker } from "lucide-react";

const RocLabs = () => {
  const { visitData, loading } = useVisitData('roc/labs');

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
                <BreadcrumbLink href="/roc/labs">Labs</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Beaker className="h-8 w-8 text-primary" />
            My Lab Results
          </h2>
          <p className="text-muted-foreground">
            View your Viral Load and other laboratory test results.
          </p>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Lab History</CardTitle>
            <CardDescription>A record of your laboratory tests and results.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <LabsTable data={visitData || { details: [] }} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RocLabs;
