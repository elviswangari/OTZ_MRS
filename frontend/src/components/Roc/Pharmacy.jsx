import DashboardLayout from './DashboardLayout';  
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";

  const Pharmacy = () => {
    return (
      <DashboardLayout>
        <div className="flex items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-lg font-semibold md:text-2xl">Pharmacy</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
      </DashboardLayout>
    )
  }
  
  export default Pharmacy;