import DashboardLayout from './DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
// import { visitData } from '@/visitData';
import { AppointmentTable } from './Table'

const HcwAppointments = () => {
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
      <AppointmentTable data={visitData} />
    </DashboardLayout>
  )
}

export default HcwAppointments;