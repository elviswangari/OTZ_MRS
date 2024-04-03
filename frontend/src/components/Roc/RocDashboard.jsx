import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  LifeBuoy,
  SquareUser,
  Salad,
  Pill,
  CalendarDays,
  Library,
  TestTubeDiagonal
} from "lucide-react"
import mohImage from '../../assets/moh.png';

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


export function RocDashboard() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
            <img src={mohImage} alt="Image" className="h-9 w-9"/>
              <span className="">OTZ Module</span>
            </a>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <a
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all bg-muted hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </a>
              <a
                href="/triage"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Salad className="h-4 w-4" />
                Triage
              </a>
              <a
                href="/labs"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <TestTubeDiagonal className="h-4 w-4" />
                Labs
              </a>
              <a
                href="/appointments"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Appointments
              </a>
              <a
                href="/modules"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Library className="h-4 w-4" />
                Modules
              </a>
              <a
                href="/pharmacy"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Pill className="h-4 w-4" />
                Pharmacy
              </a>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LifeBuoy className="size-5" />
                Help
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
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
                <Input
                  type="search"
                  placeholder="Search ..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {/* <CircleUser className="h-5 w-5" /> */}
                <img src={mohImage} alt="Image" className="h-6 w-6"/>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
          <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/" className="text-lg font-semibold md:text-2xl">Home</BreadcrumbLink>
    </BreadcrumbItem>
    </BreadcrumbList>
</Breadcrumb>

          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
          <Card>
              <CardContent className="flex flex-col items-center">
                <Users className="h-6 w-6" />
                <CardTitle className="text-center">Users</CardTitle>
                <CardDescription className="text-center">View users</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="grid gap-1">
                <CardTitle className="text-sm font-bold">Next OTZ: 23rd May</CardTitle>
                <CardDescription className="text-sm font-semibold">Regimen: TDF/3TC/DTG</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center">
                <Users className="h-6 w-6" />
                <CardTitle className="text-center">Users</CardTitle>
                <CardDescription className="text-center">View users</CardDescription>
              </CardContent>
            </Card>
            <Card className="flex justify-center items-center">
            <CardContent className="flex items-center justify-center flex-col lg:flex-row lg:items-start lg:justify-center">
  <div className="flex items-center">
    <CalendarDays className="h-6 w-6" />
    <div className="ml-2">
      <CardTitle className="text-center font-bold">Next OTZ Date</CardTitle>
      <span className="text-center font-semibold">23rd Dec 2024</span>
    </div>
  </div>
</CardContent>

            </Card>
            <Card>
              <CardContent className="flex flex-col items-center">
                <Library className="h-6 w-6" />
                <CardTitle className="text-center">Name module</CardTitle>
                <CardDescription className="text-center">
                  A short description about the module.
                  <Button size="sm">Continue module</Button>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="grid gap-1">
              <Library className="h-6 w-6" />
                <CardTitle className="text-sm font-semibold">Completed modules</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="grid gap-1">
              <TestTubeDiagonal className="h-6 w-6"  />
                <CardTitle className="text-sm font-semibold">Viral Load</CardTitle>
                <CardDescription className="text-sm font-xs">Chart showing viral load over time</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="grid gap-1">
                <CardTitle className="text-sm font-semibold">Weight</CardTitle>
                <CardDescription className="text-sm font-xs">Chart showing weight over time</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
