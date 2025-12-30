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
  CalendarDays, 
  Activity, 
  Pill, 
  TestTubeDiagonal, 
  Heart,
  Award,
  BookOpen,
  Hand,
  ArrowRight,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useVisitData } from '@/visitData';
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const RocDashboard = () => {
  const { visitData, loading } = useVisitData('roc');

  if (loading) {
    return (
      <DashboardLayout role="roc">
        <div className="space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-10 w-[300px]" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-3xl" />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-7">
            <Skeleton className="col-span-4 h-[400px] rounded-3xl" />
            <Skeleton className="col-span-3 h-[400px] rounded-3xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!visitData || !visitData.details) {
    return (
      <DashboardLayout role="roc">
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
            <Activity className="h-10 w-10 text-muted-foreground opacity-20" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold">No Health Records Found</h3>
            <p className="text-muted-foreground max-w-xs">Your clinical data hasn't been synced yet. Please contact your healthcare provider.</p>
          </div>
          <Button variant="outline" className="rounded-full">Refresh Dashboard</Button>
        </div>
      </DashboardLayout>
    );
  }

  const { labs = [], appointments = [], pharmacy = [], firstName } = visitData.details;

  const formatDate = (date) => new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

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
    <DashboardLayout role="roc">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/roc" className="text-xs font-medium uppercase tracking-wider opacity-60">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/roc" className="text-xs font-bold uppercase tracking-wider text-primary">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-extrabold tracking-tight">Hello, {firstName}!</h2>
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center animate-bounce shadow-sm">
                <Hand className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Welcome to your OTZ health portal. Here's your journey at a glance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full border border-primary/20 shadow-sm">
              <Award className="h-6 w-6" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Status</span>
                <span className="font-bold">OTZ Champion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-none shadow-xl shadow-blue-500/10 bg-gradient-to-br from-blue-600 to-blue-700 text-white group hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <CalendarDays className="h-24 w-24" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-blue-100 uppercase tracking-widest">Next Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tighter">
                {nextAppointment ? formatDate(nextAppointment.nextVisitDay) : 'Not Scheduled'}
              </div>
              <div className="flex items-center gap-2 mt-3 text-blue-100/80 font-medium text-xs">
                <Clock className="h-3 w-3" />
                <span>Stay on track with your visits!</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-none shadow-xl shadow-green-500/10 bg-gradient-to-br from-green-600 to-green-700 text-white group hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Activity className="h-24 w-24" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-green-100 uppercase tracking-widest">Latest Viral Load</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tighter">
                {latestViralLoad ? latestViralLoad.viralLoad : 'N/A'}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="secondary" className="bg-white/20 text-white border-none font-bold text-[10px]">
                  {latestViralLoad?.viralLoad === 'LDL' ? 'TARGET ACHIEVED' : 'KEEP GOING'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-none shadow-xl shadow-purple-500/10 bg-gradient-to-br from-purple-600 to-purple-700 text-white group hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-24 w-24" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-purple-100 uppercase tracking-widest">Adherence Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tighter">98%</div>
              <div className="mt-4 space-y-1">
                <Progress value={98} className="h-2 bg-white/20" />
                <p className="text-[10px] font-bold text-purple-100/80 text-right">EXCELLENT</p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-none shadow-xl shadow-orange-500/10 bg-gradient-to-br from-orange-600 to-orange-700 text-white group hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Pill className="h-24 w-24" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-orange-100 uppercase tracking-widest">Current Regimen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black tracking-tighter truncate">
                {latestRegimen ? latestRegimen.regimen : 'N/A'}
              </div>
              <div className="flex items-center gap-2 mt-3 text-orange-100/80 font-medium text-xs">
                <CheckCircle2 className="h-3 w-3" />
                <span>Take as prescribed daily</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border-none shadow-xl shadow-muted/20 rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Health Progress
                  </CardTitle>
                  <CardDescription className="font-medium">
                    Your clinical journey over the last 6 months.
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5">
                  Full History
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-[300px] flex flex-col items-center justify-center border-2 border-dashed rounded-3xl bg-muted/10 group hover:bg-muted/20 transition-colors">
                <Activity className="h-16 w-16 text-muted-foreground mx-auto opacity-10 group-hover:scale-110 transition-transform" />
                <p className="text-muted-foreground font-bold mt-4">Clinical charts will appear here</p>
                <p className="text-xs text-muted-foreground/60">Syncing with facility records...</p>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 border-none shadow-xl shadow-muted/20 rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b px-8 py-6">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Learning Modules
              </CardTitle>
              <CardDescription className="font-medium">
                Recommended for you this week.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { title: "Understanding Viral Load", time: "5 min read", category: "Health", color: "bg-blue-500/10 text-blue-600" },
                  { title: "Nutrition & Wellness", time: "8 min read", category: "Lifestyle", color: "bg-green-500/10 text-green-600" },
                  { title: "Mental Health Support", time: "10 min read", category: "Support", color: "bg-purple-500/10 text-purple-600" }
                ].map((module, i) => (
                  <div key={i} className="group flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer">
                    <div className="space-y-1.5">
                      <Badge variant="secondary" className={`${module.color} border-none font-bold text-[9px] px-1.5 py-0`}>
                        {module.category}
                      </Badge>
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{module.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <Clock className="h-3 w-3" />
                        <span>{module.time}</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4 rounded-2xl font-bold py-6 border-primary/20 text-primary hover:bg-primary/5">
                  Explore All Modules
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RocDashboard;
