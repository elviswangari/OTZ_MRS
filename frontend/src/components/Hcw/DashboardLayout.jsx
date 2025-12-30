/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Bell, Home, Library, Pill, Salad, TestTubeDiagonal, Users, SquareUser, LifeBuoy, Search, X, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import mohImage from '../../assets/moh.png';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate, useLocation } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { usePatient } from '@/context/PatientContext';
import { postRequest } from '@/Axios';

const route = "/hcw"

const DashboardLayout = ({ children }) => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  const { activePatient, setActivePatient } = usePatient();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await postRequest('hcw/search', { cccNumber: searchQuery });
      if (response.rocRecord) {
        setActivePatient(response.rocRecord);
      } else {
        alert('Patient not found');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching for patient');
    } finally {
      setLoading(false);
    }
  };

  const clearPatient = () => {
    setActivePatient(null);
    setSearchQuery('');
  };

  const navItems = [
    { name: 'Dashboard', href: route, icon: Home },
    { name: 'Modules', href: `${route}/modules`, icon: Library },
  ];

  const patientItems = [
    { name: 'Triage', href: `${route}/triage`, icon: Salad },
    { name: 'Labs', href: `${route}/labs`, icon: TestTubeDiagonal },
    { name: 'Appointments', href: `${route}/appointments`, icon: Users },
    { name: 'Pharmacy', href: `${route}/pharmacy`, icon: Pill },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href={`${route}`} className="flex items-center gap-2 font-semibold">
              <img src={mohImage} alt="Image" className="h-9 w-9" />
              <span className="">OTZ Module</span>
            </a>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    location.pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </a>
              ))}

              {activePatient && (
                <>
                  <div className="mt-4 mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Patient Actions
                  </div>
                  <div className="mb-4 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-2 text-primary font-medium truncate">
                      <UserCircle className="h-4 w-4" />
                      {activePatient.firstName} {activePatient.surname}
                    </div>
                    <div className="text-[10px] text-muted-foreground ml-6">
                      CCC: {activePatient.cccNumber}
                    </div>
                  </div>
                  {patientItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                        location.pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </a>
                  ))}
                </>
              )}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <LifeBuoy className="size-5" />
              Help
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <SquareUser className="size-5" />
              Account
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search CCC Number..."
                  className="w-full appearance-none bg-background pl-8 pr-10 shadow-none md:w-2/3 lg:w-1/3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={loading}
                />
                {activePatient && (
                  <button
                    type="button"
                    onClick={clearPatient}
                    className="absolute right-[34%] lg:right-[67.5%] top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <img src={mohImage} alt="Image" className="h-6 w-6" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;


export default DashboardLayout;
