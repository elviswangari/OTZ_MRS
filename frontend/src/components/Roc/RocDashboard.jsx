import { Link } from "@/components/ui/Link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card,
  CardContent,
} from "@/components/ui/card";

export default function RocDashboard() {
   return (
    <div
      key="1"
      className="h-screen w-full max-w-7xl grid md:grid-cols-[250px_1fr] border-t"
    >
      <div className="flex flex-col border-r">
        <div className="flex items-center p-4">
          <Link className="flex items-center gap-2 text-lg font-bold" to="#">
            <span>Home</span>
          </Link>
          <Button className="ml-auto" size="icon" variant="outline">
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <div className="grid gap-px">
            <Link
              className="flex items-center gap-4 p-3 text-sm font-semibold"
              to="#"
            >
              <HomeIcon className="h-4 w-4 opacity-50 group-hover:opacity-100 transition pointer-events-none" />
              <span className="opacity-50 group-hover:opacity-100 transition-all">
                Home
              </span>
            </Link>
            <Link
              className="flex items-center gap-4 p-3 text-sm font-semibold"
              to="#"
            >
              <CalendarIcon className="h-4 w-4 opacity-50 group-hover:opacity-100 transition pointer-events-none" />
              <span className="opacity-50 group-hover:opacity-100 transition-all">
                Calendar
              </span>
            </Link>
            <Link
              className="flex items-center gap-4 p-3 text-sm font-semibold"
              to="#"
            >
              <InboxIcon className="h-4 w-4 opacity-50 group-hover:opacity-100 transition pointer-events-none" />
              <span className="opacity-50 group-hover:opacity-100 transition-all">
                Inbox
              </span>
            </Link>
            <Link
              className="flex items-center gap-4 p-3 text-sm font-semibold"
              to="#"
            >
              <BarChartIcon className="h-4 w-4 opacity-50 group-hover:opacity-100 transition pointer-events-none" />
              <span className="opacity-50 group-hover:opacity-100 transition-all">
                Analytics
              </span>
            </Link>
          </div>
        </nav>
      </div>
      <div className="flex flex-col">
        <div className="grid gap-4 p-4 border-b">
          <div className="flex items-center gap-4">
            <Button className="rounded-full" size="icon" variant="ghost">
              <img
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Hey Elvis 👋🙋‍♂️</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last login: 2 hours ago
              </p>
            </div>
            <Button className="ml-auto" size="icon" variant="ghost">
              <SettingsIcon className="h-5 w-5" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader className="grid gap-1">
                <CardTitle className="text-sm font-semibold">
                  Next OTZ: 23rd May
                </CardTitle>
                <CardDescription className="text-sm font-xs">
                  Regimen: TDF/3TC/DTG
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center">
                <UsersIcon className="h-6 w-6" />
                <CardTitle className="text-center">Users</CardTitle>
                <CardDescription className="text-center">
                  View users
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center">
                <CalendarIcon className="h-6 w-6" />
                <CardTitle className="text-center">Calendar</CardTitle>
                <CardDescription className="text-center">
                  View calendar
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center">
                <InboxIcon className="h-6 w-6" />
                <CardTitle className="text-center">Name module</CardTitle>
                <CardDescription className="text-center">
                  A short description about the module.
                  <Button size="sm">Continue module</Button>
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="grid gap-1">
                <CardTitle className="text-sm font-semibold">
                  Completed modules
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="grid gap-1">
                <CardTitle className="text-sm font-semibold">
                  Viral Load
                </CardTitle>
                <CardDescription className="text-sm font-xs">
                  Chart showing viral load over time
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="grid gap-1">
                <CardTitle className="text-sm font-semibold">Weight</CardTitle>
                <CardDescription className="text-sm font-xs">
                  Chart showing weight over time
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function InboxIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
