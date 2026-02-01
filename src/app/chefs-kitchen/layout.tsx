"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChefHat,
  LayoutDashboard,
  UtensilsCrossed,
  Image as ImageIcon,
  Star,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/chefs-kitchen", icon: LayoutDashboard },
  { label: "Menu Items", href: "/chefs-kitchen/menu", icon: UtensilsCrossed },
  { label: "Gallery", href: "/chefs-kitchen/gallery", icon: ImageIcon },
  { label: "Testimonials", href: "/chefs-kitchen/testimonials", icon: Star },
  { label: "Pricing", href: "/chefs-kitchen/pricing", icon: DollarSign },
  { label: "Settings", href: "/chefs-kitchen/settings", icon: Settings },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Allow login page without auth
  const isLoginPage = pathname === "/chefs-kitchen/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/chefs-kitchen/login");
    }
  }, [user, loading, router, isLoginPage]);

  // Show login page without admin layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange/30 border-t-orange rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brown/60 font-montserrat">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/chefs-kitchen/login");
  };

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-brown transform transition-transform duration-300 lg:transform-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-playfair font-bold">
                  Chef&apos;s Kitchen
                </h1>
                <p className="text-white/50 text-xs font-montserrat">
                  Admin Panel
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-montserrat text-sm transition-colors",
                    isActive
                      ? "bg-orange text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User & Sign Out */}
          <div className="p-4 border-t border-white/10">
            <div className="px-4 py-2 mb-2">
              <p className="text-white/50 text-xs font-montserrat">Signed in as</p>
              <p className="text-white text-sm font-medium truncate">
                {user.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-montserrat text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-brown hover:text-orange"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-sm text-brown/60 hover:text-orange transition-colors font-montserrat"
            >
              View Site →
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
