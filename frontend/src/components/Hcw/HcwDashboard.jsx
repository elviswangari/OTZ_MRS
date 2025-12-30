import React from 'react';
import DashboardLayout from "../Shared/DashboardLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { 
  Users, 
  CalendarDays, 
  Activity, 
  TrendingUp, 
  UserPlus, 
  FileText,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";

const HcwDashboard = () => {
  const stats = [
    { 
      title: "Total Patients", 
      value: "1,284", 
      icon: Users, 
      description: "+12% from last month", 
      trend: "up",
      color: "bg-blue-500/10 text-blue-600",
      gradient: "from-blue-500 to-blue-600"
    },
    { 
      title: "Active in OTZ", 
      value: "942", 
      icon: Activity, 
      description: "73% enrollment rate", 
      trend: "up",
      color: "bg-green-500/10 text-green-600",
      gradient: "from-green-500 to-green-600"
    },
    { 
      title: "Pending Labs", 
      value: "24", 
      icon: FileText, 
      description: "8 urgent results", 
      trend: "down",
      color: "bg-orange-500/10 text-orange-600",
      gradient: "from-orange-500 to-orange-600"
    },
    { 
      title: "Appointments Today", 
      value: "18", 
      icon: CalendarDays, 
      description: "12 completed", 
      trend: "up",
      color: "bg-purple-500/10 text-purple-600",
      gradient: "from-purple-500 to-purple-600"
    },
  ];

  return (
    <DashboardLayout role="hcw">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/hcw" className="text-xs font-medium uppercase tracking-wider opacity-60">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/hcw" className="text-xs font-bold uppercase tracking-wider text-primary">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
              Healthcare Dashboard
            </h2>
            <p className="text-muted-foreground text-lg">
              Welcome back! Here's an overview of your facility's OTZ performance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 rounded-full px-6 shadow-sm">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
            <Button className="gap-2 rounded-full px-6 shadow-lg shadow-primary/20">
              <UserPlus className="h-4 w-4" />
              Register Patient
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="relative overflow-hidden border-none shadow-xl shadow-muted/20 group hover:scale-[1.02] transition-all duration-300">
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${stat.gradient}`} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-xl ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500" />
                    )}
                    <p className="text-xs font-medium text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border-none shadow-xl shadow-muted/20 rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
                  <CardDescription className="font-medium">
                    Latest updates from your patients across all modules.
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  { type: 'Triage', patient: 'John Doe', id: '15305-00001', time: '12 mins ago', status: 'Completed' },
                  { type: 'Lab', patient: 'Jane Smith', id: '15305-00042', time: '45 mins ago', status: 'Pending' },
                  { type: 'Pharmacy', patient: 'Alice Brown', id: '15305-00123', time: '2 hours ago', status: 'Completed' },
                  { type: 'Appointment', patient: 'Bob Wilson', id: '15305-00089', time: '3 hours ago', status: 'Missed' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-6 px-8 py-5 hover:bg-muted/20 transition-colors group">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-foreground">
                          {activity.type} Record
                        </p>
                        <Badge variant="outline" className="text-[10px] font-bold px-1.5 py-0 border-primary/20 text-primary">
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium truncate">
                        Patient: {activity.patient} ({activity.id})
                      </p>
                    </div>
                    <div className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 border-none shadow-xl shadow-muted/20 rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b px-8 py-6">
              <CardTitle className="text-xl font-bold">Alerts & Notifications</CardTitle>
              <CardDescription className="font-medium">
                Items requiring your immediate attention.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-destructive/5 border border-destructive/10 group hover:bg-destructive/10 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-destructive">High Viral Load Detected</p>
                    <p className="text-xs font-medium text-muted-foreground">Patient #15305-00004 requires an urgent EAC session.</p>
                    <Button variant="link" className="h-auto p-0 text-xs font-bold text-destructive hover:no-underline">
                      Take Action →
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 group hover:bg-primary/10 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-primary">Upcoming Support Group</p>
                    <p className="text-xs font-medium text-muted-foreground">Scheduled for Friday, 2:00 PM in Room 4. 12 patients confirmed.</p>
                    <Button variant="link" className="h-auto p-0 text-xs font-bold text-primary hover:no-underline">
                      View Details →
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-green-500/5 border border-green-500/10 group hover:bg-green-500/10 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-green-700">Monthly Report Ready</p>
                    <p className="text-xs font-medium text-muted-foreground">The OTZ performance report for October is now available.</p>
                    <Button variant="link" className="h-auto p-0 text-xs font-bold text-green-600 hover:no-underline">
                      Download PDF →
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HcwDashboard;
