import { useState } from 'react';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm';
import { SignupForm } from '@/components/SignupForm';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import { ModeToggle } from '@/components/Theme/ModeToggle';
import RocDashboard from '@/components/Roc/RocDashboard';
import RocTriage from '@/components/Roc/Triage';
import RocAppointments from '@/components/Roc/Appointments';
import RocLabs from '@/components/Roc/Labs';
import RocModules from '@/components/Roc/Modules';
import RocPharmacy from '@/components/Roc/Pharmacy';

import HcwDashboard from '@/components/Hcw/HcwDashboard';
import HcwTriage from '@/components/Hcw/Triage';
import HcwAppointments from '@/components/Hcw/Appointments';
import HcwLabs from '@/components/Hcw/Labs';
import HcwModules from '@/components/Hcw/Modules';
import HcwPharmacy from '@/components/Hcw/Pharmacy';

function App() {
  const [userRole, setUserRole] = useState('hcw');

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <ModeToggle />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          {/* ROC Routes */}
          {userRole === 'roc' && (
            <>
              <Route path="/" element={<RocDashboard />} />
              <Route path="/triage" element={<RocTriage />} />
              <Route path="/appointments" element={<RocAppointments />} />
              <Route path="/labs" element={<RocLabs />} />
              <Route path="/modules" element={<RocModules />} />
              <Route path="/pharmacy" element={<RocPharmacy />} />
            </>
          )}
          {/* HCW Routes */}
          {userRole === 'hcw' && (
            <>
              <Route path="/" element={<HcwDashboard />} />
              <Route path="/triage" element={<HcwTriage />} />
              <Route path="/appointments" element={<HcwAppointments />} />
              <Route path="/labs" element={<HcwLabs />} />
              <Route path="/modules" element={<HcwModules />} />
              <Route path="/pharmacy" element={<HcwPharmacy />} />
            </>
          )}
          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;