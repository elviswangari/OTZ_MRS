import DashboardLayout from './DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { PharmacyTable } from './Table'
import { useVisitData } from '@/visitData';
import { Skeleton } from "@/components/ui/skeleton"

const RocPharmacy = () => {
  const { visitData, loading } = useVisitData('roc/pharmacy');
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
              <BreadcrumbLink href="/" className="text-lg font-semibold md:text-2xl">Pharmacy</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <PharmacyTable data={visitData} />
    </DashboardLayout>
  )
}

export default RocPharmacy;