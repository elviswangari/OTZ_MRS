import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import RoleGate from '@/components/Shared/RoleGate';
import { LoginForm } from '@/components/LoginForm';
import { SignupForm } from '@/components/SignupForm';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import { ModeToggle } from '@/components/Theme/ModeToggle';
import { PatientProvider } from '@/context/PatientContext';
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
      <PatientProvider>
        <Router>
          <div className="fixed bottom-4 right-4 z-50">
            <ModeToggle />
          </div>
          <Routes>
          {/* Recipient of Care (ROC) Routes */}
          <Route path="/roc" element={
            <RequireAuth fallbackPath="/">
              <RoleGate allowedRoles={['roc']}>
                <RocDashboard />
              </RoleGate>
            </RequireAuth>
          } />
          <Route path="/roc/triage" element={
            <RequireAuth fallbackPath="/">
              <RoleGate allowedRoles={['roc']}>
                <RocTriage />
              </RoleGate>
            </RequireAuth>
          } />
          <Route path="/roc/appointments" element={
            <RequireAuth fallbackPath="/">
              <RoleGate allowedRoles={['roc']}>
                <RocAppointments />
              </RoleGate>
            </RequireAuth>
          } />
          <Route path="/roc/labs" element={
            <RequireAuth fallbackPath="/">
              <RoleGate allowedRoles={['roc']}>
                <RocLabs />
              </RoleGate>
            </RequireAuth>
          } />
          <Route path="/roc/modules" element={
            <RequireAuth fallbackPath="/">
              <RoleGate allowedRoles={['roc']}>
                <RocModules />
              </RoleGate>
            </RequireAuth>
          } />
          <Route path="/roc/pharmacy" element={
            <RequireAuth fallbackPath="/">
              <RoleGate allowedRoles={['roc']}>
                <RocPharmacy />
              </RoleGate>
            </RequireAuth>
          } />

          {/* Healthcare Worker (HCW) Routes */}
          <Route path="/hcw" element={
            <RequireAuth fallbackPath="/">
              <RoleGate allowedRoles={['hcw']}>
                <HcwDashboard />
              </RoleGate>
            </RequireAuth>
          } />
          <Route path="/hcw/triage" element={
            <RequireAuth fallbackPath="/">
              <RoleGate allowedRoles={['hcw']}>
                <HcwTriage />
              </RoleGate>
            </RequireAuth>
          } />
          <Route path="/hcw/appointments" element={
            <RequireAuth fallbackPath="/">
              <RoleGate allowedRoles={['hcw']}>
                <HcwAppointments />
              </RoleGate>
            </RequireAuth>
          } />
          <Route path="/hcw/labs" element={
            <RequireAuth fallbackPath="/">
              <RoleGate allowedRoles={['hcw']}>
                <HcwLabs />
              </RoleGate>
            </RequireAuth>
          } />
          <Route path="/hcw/modules" element={
            <RequireAuth fallbackPath="/">
              <RoleGate allowedRoles={['hcw']}>
                <HcwModules />
              </RoleGate>
            </RequireAuth>
          } />
          <Route path="/hcw/pharmacy" element={
            <RequireAuth fallbackPath="/">
              <RoleGate allowedRoles={['hcw']}>
                <HcwPharmacy />
              </RoleGate>
            </RequireAuth>
          } />

          {/* Public routes */}
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Router>
      </PatientProvider>
    </ThemeProvider>
  );
}

export default App;
