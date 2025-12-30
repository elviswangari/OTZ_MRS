import DashboardLayout from './DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { LabsTable } from './Table'
import { useVisitData } from '@/visitData';
import { Skeleton } from "@/components/ui/skeleton"

const RocLabs = () => {
  const { visitData, loading } = useVisitData('roc/labs');
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
              <BreadcrumbLink href="/" className="text-lg font-semibold md:text-2xl">Labs</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {visitData && <LabsTable data={visitData} />}
    </DashboardLayout>
  )
}

export default RocLabs;