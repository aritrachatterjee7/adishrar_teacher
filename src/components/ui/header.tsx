"use client";

import { useState } from "react";
import { Menu, Bell, Search, X } from "lucide-react";
import Link from "next/link";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform search action here
    console.log("Search Query:", searchQuery);
    setIsSearchOpen(false); // Close search after submitting
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Learning Dashboard
            </span>
          </Link>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md md:hidden"
          onClick={() => document.documentElement.classList.toggle("sidebar-open")}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Search Input (Visible when isSearchOpen is true) */}
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close search</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <button
                className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
                onClick={() => setIsSearchOpen(true)}
              >
                <span className="hidden lg:inline-flex">Search documentation...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div>
          )}

          {/* Notifications Button */}
          <nav className="flex items-center space-x-2">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}