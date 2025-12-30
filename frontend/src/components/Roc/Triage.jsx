// import { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { TriageTable } from './Table';
// import { getRequest } from '@/Axios';
  import { useVisitData } from '@/visitData';
  import { Skeleton } from "@/components/ui/skeleton"

const RocTriage = () => {
  const { visitData, loading } = useVisitData('roc/triage');
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
              <BreadcrumbLink href="/" className="text-lg font-semibold md:text-2xl">Triage</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Only render TriageTable when visitData is available */}
      {visitData && <TriageTable data={visitData} />}
    </DashboardLayout>
  );
}

export default RocTriage;
