/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Bell, Home, Library, Pill, Salad, TestTubeDiagonal, Users, SquareUser, LifeBuoy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import mohImage from '../../assets/moh.png';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

const route = "/hcw"

const DashboardLayout = ({ children }) => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

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
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <a href={`${route}`} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all bg-muted hover:text-primary">
                <Home className="h-4 w-4" />
                Dashboard
              </a>
              <a href={`${route}/triage`} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Salad className="h-4 w-4" />
                Triage
              </a>
              <a href={`${route}/labs`} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <TestTubeDiagonal className="h-4 w-4" />
                Labs
              </a>
              <a href={`${route}/appointments`} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Users className="h-4 w-4" />
                Appointments
              </a>
              <a href={`${route}/modules`} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Library className="h-4 w-4" />
                Modules
              </a>
              <a href={`${route}/pharmacy`} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Pill className="h-4 w-4" />
                Pharmacy
              </a>
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
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search ..." className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3" />
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
