import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  Home,
  Library,
  Pill,
  Salad,
  TestTubeDiagonal,
  Users,
  SquareUser,
  LifeBuoy,
  Search,
  Menu,
  LogOut,
  Settings,
  User as UserIcon,
  X,
  UserCircle,
  ChevronRight,
  Command,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import mohImage from '@/assets/moh.png';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { usePatient } from '@/context/PatientContext';
import { postRequest } from '@/Axios';

const DashboardLayout = ({ children, role }) => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthUser();
  const { activePatient, setActivePatient } = usePatient();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length < 2 || role !== 'hcw') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);
    try {
      const response = await postRequest('hcw/search', { query });
      if (response.results) {
        setSearchResults(response.results);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectPatient = (patient) => {
    setActivePatient(patient);
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const clearPatient = () => {
    setActivePatient(null);
    setSearchQuery('');
  };

  const baseRoute = role === 'hcw' ? '/hcw' : '/roc';
  const roleName = role === 'hcw' ? 'Healthcare Provider' : 'Recipient of Care';

  const navItems = [
    { name: 'Overview', href: baseRoute, icon: Home },
    { name: 'Learning Modules', href: `${baseRoute}/modules`, icon: Library },
  ];

  const patientItems = [
    { name: 'Clinical Triage', href: `${baseRoute}/triage`, icon: Salad },
    { name: 'Lab Investigations', href: `${baseRoute}/labs`, icon: TestTubeDiagonal },
    { name: 'Appointments', href: `${baseRoute}/appointments`, icon: Users },
    { name: 'Pharmacy', href: `${baseRoute}/pharmacy`, icon: Pill },
  ];

  const NavLinks = ({ mobile = false }) => (
    <nav className={`grid items-start px-2 text-sm font-medium ${mobile ? 'gap-4 text-lg' : 'lg:px-4 gap-1'}`}>
      <div className="mb-2 px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
        Main Menu
      </div>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2.5 transition-all duration-200 group ${
              isActive 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-primary-foreground' : 'group-hover:text-primary'}`} />
            {item.name}
            {isActive && <ChevronRight className="ml-auto h-3 w-3 opacity-50" />}
          </Link>
        );
      })}

      {role === 'hcw' && activePatient && (
        <>
          <div className="mt-6 mb-2 px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
            Patient Management
          </div>
          <div className="mb-4 mx-2 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <UserCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-foreground truncate">
                  {activePatient.firstName} {activePatient.surname}
                </div>
                <div className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                  <Badge variant="outline" className="px-1 py-0 text-[9px] font-bold border-primary/30 text-primary">
                    CCC: {activePatient.cccNumber}
                  </Badge>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
                onClick={clearPatient}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          {patientItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 transition-all duration-200 group ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-primary-foreground' : 'group-hover:text-primary'}`} />
                {item.name}
                {isActive && <ChevronRight className="ml-auto h-3 w-3 opacity-50" />}
              </Link>
            );
          })}
        </>
      )}

      {role === 'roc' && (
        <>
          <div className="mt-6 mb-2 px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
            My Health Records
          </div>
          {patientItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 transition-all duration-200 group ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-primary-foreground' : 'group-hover:text-primary'}`} />
                {item.name}
                {isActive && <ChevronRight className="ml-auto h-3 w-3 opacity-50" />}
              </Link>
            );
          })}
        </>
      )}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-card md:block shadow-sm z-20">
        <div className="flex h-full max-h-screen flex-col gap-4">
          <div className="flex h-16 items-center border-b px-6 bg-muted/30">
            <Link to={baseRoute} className="flex items-center gap-3 font-bold text-lg tracking-tight">
              <div className="bg-primary p-1.5 rounded-lg shadow-md">
                <img src={mohImage} alt="MOH Logo" className="h-6 w-6 brightness-0 invert" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                OTZ Module
              </span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <NavLinks />
          </div>
          <div className="mt-auto p-4 border-t bg-muted/10">
            <div className="grid gap-1">
              <Link to="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
                <LifeBuoy className="h-4 w-4" />
                Support Center
              </Link>
              <Link to="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
                <SquareUser className="h-4 w-4" />
                My Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 lg:px-8 shadow-sm">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0 w-72">
              <div className="flex h-16 items-center border-b px-6 bg-muted/30">
                <Link to={baseRoute} className="flex items-center gap-3 font-bold text-lg">
                  <div className="bg-primary p-1.5 rounded-lg">
                    <img src={mohImage} alt="MOH Logo" className="h-6 w-6 brightness-0 invert" />
                  </div>
                  <span>OTZ Module</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-6">
                <NavLinks mobile />
              </div>
              <div className="mt-auto p-6 border-t bg-muted/10">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{auth?.firstName || 'User'}</p>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{roleName}</p>
                    </div>
                  </div>
                  <Button variant="destructive" className="w-full gap-2 shadow-sm" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1 max-w-2xl mx-auto" ref={searchRef}>
            {role === 'hcw' && (
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  ) : (
                    <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  )}
                </div>
                <Input
                  type="search"
                  placeholder="Search by Name, CCC, or Phone..."
                  className="w-full bg-muted/50 border-none pl-10 pr-12 h-10 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all rounded-full shadow-inner"
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                />
                <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                  <Badge variant="secondary" className="hidden sm:flex items-center gap-1 px-1.5 py-0 text-[10px] font-bold opacity-50">
                    <Command className="h-2.5 w-2.5" /> K
                  </Badge>
                  {searchQuery && (
                    <button onClick={() => { setSearchQuery(''); setSearchResults([]); }} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {showResults && (searchResults.length > 0 || isSearching) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 max-h-[400px] overflow-auto">
                      {isSearching ? (
                        <div className="p-8 text-center text-muted-foreground">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 opacity-20" />
                          <p className="text-sm font-medium">Searching database...</p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="grid gap-1">
                          <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
                            Found {searchResults.length} matches
                          </div>
                          {searchResults.map((patient) => (
                            <button
                              key={patient._id}
                              onClick={() => selectPatient(patient)}
                              className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 text-left transition-all group"
                            >
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <UserCircle className="h-6 w-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm group-hover:text-primary transition-colors">
                                  {patient.firstName} {patient.surname}
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center gap-2">
                                  <span>CCC: {patient.cccNumber}</span>
                                  <span>•</span>
                                  <span>{patient.phoneNumber || 'No Phone'}</span>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-muted-foreground">
                          <Search className="h-8 w-8 mx-auto mb-2 opacity-20" />
                          <p className="text-sm font-medium">No patients found matching "{searchQuery}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full border-2 border-background" />
            </Button>
            
            <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-3 px-2 rounded-full hover:bg-primary/5 transition-all">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground shadow-sm">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <div className="hidden lg:flex flex-col items-start text-left">
                    <span className="text-xs font-bold leading-none">{auth?.firstName || 'User'}</span>
                    <span className="text-[10px] font-medium text-muted-foreground truncate max-w-[120px]">{auth?.email}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-primary/10">
                <DropdownMenuLabel className="p-3">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">My Account</p>
                    <p className="text-xs leading-none text-muted-foreground font-medium">
                      {auth?.email || 'User'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-xl p-3 cursor-pointer focus:bg-primary/5">
                  <UserIcon className="mr-3 h-4 w-4 text-primary" />
                  <span className="font-medium">View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl p-3 cursor-pointer focus:bg-primary/5">
                  <Settings className="mr-3 h-4 w-4 text-primary" />
                  <span className="font-medium">Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="rounded-xl p-3 cursor-pointer text-destructive focus:bg-destructive/5 focus:text-destructive" 
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-bold">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8 bg-muted/20 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};


export default DashboardLayout;
