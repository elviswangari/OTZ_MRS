import React from 'react';
import DashboardLayout from '../Shared/DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutGrid, BookOpen, Heart, MessageCircle } from "lucide-react";

const RocModules = () => {
  const modules = [
    {
      title: "Health Education",
      description: "Learn more about managing your health and wellness.",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      title: "Support Groups",
      description: "Connect with others in the OTZ community.",
      icon: Heart,
      color: "text-red-500",
    },
    {
      title: "Counseling",
      description: "Access mental health and adherence support.",
      icon: MessageCircle,
      color: "text-purple-500",
    }
  ];

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
                <BreadcrumbLink href="/roc/modules">Modules</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LayoutGrid className="h-8 w-8 text-primary" />
            Learning & Support
          </h2>
          <p className="text-muted-foreground">
            Explore resources designed to help you on your journey.
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

export default RocModules;
