import DashboardLayout from './DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { useState, useEffect } from 'react';
import { getRequest } from '@/Axios';
import { PharmacyTable } from './Table';

const HcwPharmacy = () => {
  const [visitData, setVisitData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRequest('roc/appointments');
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
              <BreadcrumbLink href="/" className="text-lg font-semibold md:text-2xl">Pharmacy</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {visitData && <PharmacyTable data={visitData} />}
    </DashboardLayout>
  )
}

export default HcwPharmacy;