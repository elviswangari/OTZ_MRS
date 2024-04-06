import DashboardLayout from './DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { AppointmentTable } from './Table'
import { useState, useEffect } from 'react';
import { getRequest } from '@/Axios';

  const RocAppointments = () => {
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