import './App.css';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm';
import { SignupForm } from '@/components/SignupForm';
import RocDashboard  from '@/components/Roc/RocDashboard';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import { ModeToggle } from '@/components/Theme/ModeToggle';
import Triage  from '@/components/Roc/Triage';
import Appointments  from '@/components/Roc/Appointments';
import Labs from '@/components/Roc/Labs';
import Modules  from '@/components/Roc/Modules';
import Pharmacy  from '@/components/Roc/Pharmacy';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <ModeToggle />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<RocDashboard />} />
          <Route path="/triage" element={<Triage />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
