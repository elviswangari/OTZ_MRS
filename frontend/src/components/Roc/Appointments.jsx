import DashboardLayout from './DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";

  const Appointments = () => {
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
      </DashboardLayout>
    )
  }
  
  export default Appointments;