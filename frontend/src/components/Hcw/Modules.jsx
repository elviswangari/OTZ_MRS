import React from 'react';
import DashboardLayout from '../Shared/DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutGrid, BookOpen, Users, Settings } from "lucide-react";

const HcwModules = () => {
  const modules = [
    {
      title: "Clinical Modules",
      description: "Access clinical guidelines and treatment protocols.",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      title: "Patient Support",
      description: "Resources for patient education and support groups.",
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "System Settings",
      description: "Configure facility settings and user permissions.",
      icon: Settings,
      color: "text-gray-500",
    }
  ];

  return (
    <DashboardLayout role="hcw">
      <div className="flex flex-col gap-6">
        <div className="space-y-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/hcw">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/hcw/modules">Modules</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LayoutGrid className="h-8 w-8 text-primary" />
            System Modules
          </h2>
          <p className="text-muted-foreground">
            Explore additional tools and resources available in the OTZ MRS.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <Card key={index} className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader>
                <module.icon className={`h-8 w-8 ${module.color} mb-2`} />
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HcwModules;
