import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, Search } from "lucide-react";
import { getUser } from "@/lib/auth";
import SidebarNavigation from "./sidebar-navigation";
import SignOutButton from "./sign-out-button";

function getGreeting() {
  const hour = new Date().getHours();
  const greetings = [
    { maxHour: 12, text: "Selamat pagi" },
    { maxHour: 13, text: "Selamat siang" },
    { maxHour: 18, text: "Selamat sore" },
    { maxHour: 24, text: "Selamat malam" },
  ];

  const greeting = greetings.find((item) => hour < item.maxHour)?.text || "Halo";
  return `${greeting}`;
}

export default async function Header() {
  const { user } = await getUser();
  const greeting = getGreeting();

  return (
    <header className="sticky top-0 z-30 backdrop-blur flex h-14 items-center gap-4 border-b bg-muted/30 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SidebarNavigation viewMode="mobile" />
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari produk..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <div className="flex flex-row items-center space-x-2">
          <div className="flex flex-col items-end flex-1">
            <div className="text-xs text-muted-foreground">{greeting}</div>
            <div className="font-bold">{user?.name}</div>
          </div>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <CircleUser className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Pengaturan</DropdownMenuItem>
          <DropdownMenuItem>Bantuan</DropdownMenuItem>
          <DropdownMenuSeparator />
          <SignOutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
