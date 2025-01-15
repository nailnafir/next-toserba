import "../../../admin-globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "./_components/header";
import SidebarNavigation from "./_components/sidebar-navigation";
import BreadcrumbPath from "./_components/breadcrumb-path";
import ToggleTheme from "./_components/toggle-theme";
import ThemeProvider from "@/components/provider/theme-provider";
import { Bell, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { getCustomers } from "./customers/lib/data";
import { getOrders } from "./orders/lib/data";

export const metadata: Metadata = {
  title: "Ringkasan",
  description: "Tampilan Data",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orders = await getOrders();
  const customers = await getCustomers();

  const data = {
    orders: orders.length,
    customers: customers.length,
  };

  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          storageKey="theme"
          enableSystem
        >
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
              <div className="sticky top-0 z-30 flex h-full max-h-screen flex-col gap-2">
                <div className="backdrop-blur flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 font-semibold "
                  >
                    <ShoppingBasket className="h-6 w-6" />
                    <span>Toserba</span>
                  </Link>
                  <div className="ml-auto space-x-2">
                    <ToggleTheme />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Bell className="h-4 w-4" />
                      <span className="sr-only">Toggle notifications</span>
                    </Button>
                  </div>
                </div>
                <div className="flex-1">
                  <SidebarNavigation viewMode="website" badgeValue={data} />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <Header />
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <BreadcrumbPath />
                <div className="flex flex-1 items-start justify-center rounded-lg border border-dashed shadow-sm">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
