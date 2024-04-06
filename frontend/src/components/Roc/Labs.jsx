import DashboardLayout from './DashboardLayout';
import { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { LabsTable } from './Table'
// import { visitData } from '@/visitData';
import { getRequest } from '@/Axios';

const RocLabs = () => {
  const [visitData, setVisitData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRequest('roc/labs');
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