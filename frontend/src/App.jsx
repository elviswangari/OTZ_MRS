import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import RequireAuth from '@auth-kit/react-router/RequireAuth';
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
  return (
    <ThemeProvider>
      <Router>
        <ModeToggle />
        <Routes>
          {/* Authenticated routes */}
          <Route path="/roc" element={<RequireAuth fallbackPath="/"><RocDashboard /></RequireAuth>} />
          <Route path="/roc/triage" element={<RequireAuth fallbackPath="/"><RocTriage /></RequireAuth>} />
          <Route path="/roc/appointments" element={<RequireAuth fallbackPath="/"><RocAppointments /></RequireAuth>} />
          <Route path="/roc/labs" element={<RequireAuth fallbackPath="/"><RocLabs /></RequireAuth>} />
          <Route path="/roc/modules" element={<RequireAuth fallbackPath="/"><RocModules /></RequireAuth>} />
          <Route path="/roc/pharmacy" element={<RequireAuth fallbackPath="/"><RocPharmacy /></RequireAuth>} />

          <Route path="/hcw" element={<RequireAuth fallbackPath="/"><HcwDashboard /></RequireAuth>} />
          <Route path="/hcw/triage" element={<RequireAuth fallbackPath="/"><HcwTriage /></RequireAuth>} />
          <Route path="/hcw/appointments" element={<RequireAuth fallbackPath="/"><HcwAppointments /></RequireAuth>} />
          <Route path="/hcw/labs" element={<RequireAuth fallbackPath="/"><HcwLabs /></RequireAuth>} />
          <Route path="/hcw/modules" element={<RequireAuth fallbackPath="/"><HcwModules /></RequireAuth>} />
          <Route path="/hcw/pharmacy" element={<RequireAuth fallbackPath="/"><HcwPharmacy /></RequireAuth>} />

          {/* Public routes */}
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
