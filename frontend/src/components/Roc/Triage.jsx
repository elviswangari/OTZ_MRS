import { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { TriageTable } from './Table';
import { getRequest } from '@/Axios';

const RocTriage = () => {
  const [visitData, setVisitData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRequest('roc/triage');
        setVisitData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

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
