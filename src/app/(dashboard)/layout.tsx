'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: '🏠'
  },
  {
    title: 'Servers',
    href: '/servers', 
    icon: '🎮'
  },
  {
    title: 'Files',
    href: '/files',
    icon: '📁'
  },
  {
    title: 'Plugins',
    href: '/plugins',
    icon: '🔧'
  },
  {
    title: 'Backups',
    href: '/backups',
    icon: '💾'
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: '⚙️'
  }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Navigation */}
      <nav className="border-b border-purple-500/20 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-md text-purple-200 hover:bg-purple-600/20"
              >
                <span className="sr-only">Open sidebar</span>
                ☰
              </button>
              <Link href="/" className="flex-shrink-0 ml-4 md:ml-0">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  MinecraftHost
                </h1>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Server Status Indicators */}
              <div className="hidden sm:flex items-center space-x-2">
                <Badge variant="outline" className="border-green-400 text-green-400">
                  2 Running
                </Badge>
                <Badge variant="outline" className="border-gray-400 text-gray-400">
                  1 Stopped
                </Badge>
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-purple-600 text-white">U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">Server Admin</p>
                    <p className="text-xs text-muted-foreground">admin@example.com</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Support
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-40 w-64 bg-black/40 backdrop-blur-sm border-r border-purple-500/20 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}>
          <div className="flex flex-col h-full pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h2 className="text-lg font-medium text-purple-200">Server Control</h2>
            </div>
            <Separator className="my-4 bg-purple-500/20" />
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'bg-purple-600/20 text-white border-r-2 border-purple-400'
                        : 'text-purple-200 hover:bg-purple-600/10 hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="px-4 mt-6">
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                <h3 className="text-sm font-medium text-purple-200 mb-2">Resource Usage</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-purple-300">
                    <span>RAM</span>
                    <span>8.2GB / 16GB</span>
                  </div>
                  <div className="w-full bg-purple-800/30 rounded-full h-1.5">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{width: '51%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-purple-300">
                    <span>Storage</span>
                    <span>124GB / 500GB</span>
                  </div>
                  <div className="w-full bg-purple-800/30 rounded-full h-1.5">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-0">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}