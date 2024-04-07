import DashboardLayout from './DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { AppointmentTable } from './Table'
import { useVisitData } from '@/visitData';
import { Skeleton } from "@/components/ui/skeleton"

const RocAppointments = () => {
  const { visitData, loading } = useVisitData('roc/appointments');
  // Render skeleton if loading or visitData is not available
  if (loading || !visitData || !visitData.details) {
    return <Skeleton />;
  }
  return (
    <DashboardLayout>
      <div className="flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-lg font-semibold md:text-2xl">Appointments</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {visitData && <AppointmentTable data={visitData} />}
    </DashboardLayout>
  )
}

export default RocAppointments;