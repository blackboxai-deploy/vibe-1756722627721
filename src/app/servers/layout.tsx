'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
}

export default function ServersLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [servers, setServers] = useState<any[]>([]);
  const [systemStats, setSystemStats] = useState<any>(null);

  useEffect(() => {
    // Mock user data - in real app, fetch from API
    setUser({
      id: 'user_1',
      username: 'admin',
      displayName: 'Administrator',
      email: 'admin@minecrafthost.com'
    });

    // Mock servers data
    setServers([
      {
        id: 'server_1',
        name: 'Survival World',
        status: 'running',
        version: '1.21.4',
        software: { displayName: 'Paper' },
        onlinePlayers: 5,
        maxPlayers: 20
      },
      {
        id: 'server_2', 
        name: 'Creative Build',
        status: 'stopped',
        version: '1.21.1',
        software: { displayName: 'Fabric' },
        onlinePlayers: 0,
        maxPlayers: 10
      }
    ]);

    // Mock system stats
    setSystemStats({
      totalServers: 2,
      runningServers: 1,
      totalRamUsage: 4096,
      systemRamUsage: 8192,
      cpuUsage: 45,
      diskUsage: 25
    });
  }, []);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'starting': return 'bg-yellow-500';
      case 'stopping': return 'bg-orange-500';
      case 'stopped': return 'bg-gray-500';
      case 'crashed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return 'Online';
      case 'starting': return 'Starting';
      case 'stopping': return 'Stopping';
      case 'stopped': return 'Offline';
      case 'crashed': return 'Crashed';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MinecraftHost
              </h1>
            </Link>
            <Separator orientation="vertical" className="h-6 bg-purple-500/30" />
            <nav className="flex items-center space-x-6">
              <Link 
                href="/servers" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/servers') ? 'text-white' : 'text-purple-300 hover:text-white'
                }`}
              >
                Servers
              </Link>
              <Link 
                href="/plugins" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/plugins') ? 'text-white' : 'text-purple-300 hover:text-white'
                }`}
              >
                Plugins
              </Link>
              <Link 
                href="/files" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/files') ? 'text-white' : 'text-purple-300 hover:text-white'
                }`}
              >
                File Manager
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* System Stats */}
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-purple-200">{systemStats?.runningServers || 0}/{systemStats?.totalServers || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-purple-300">RAM:</span>
                <span className="text-purple-200">{(systemStats?.totalRamUsage || 0) / 1024}GB</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-purple-300">CPU:</span>
                <span className="text-purple-200">{systemStats?.cpuUsage || 0}%</span>
              </div>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-purple-600 text-white">
                      {user?.displayName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-purple-900/90 border-purple-500/20" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-purple-600 text-white">
                      {user?.displayName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-white">{user?.displayName}</p>
                    <p className="text-xs text-purple-300">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-purple-500/20" />
                <DropdownMenuItem className="text-purple-200 hover:bg-purple-600/20">
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-purple-200 hover:bg-purple-600/20">
                  API Keys
                </DropdownMenuItem>
                <DropdownMenuItem className="text-purple-200 hover:bg-purple-600/20">
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-purple-500/20" />
                <DropdownMenuItem className="text-red-400 hover:bg-red-600/20">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-80 bg-black/20 border-r border-purple-500/20 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Your Servers</h2>
            <Link href="/servers/create">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                + New Server
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {servers.map((server) => (
              <Link key={server.id} href={`/servers/${server.id}`}>
                <Card className={`cursor-pointer transition-all hover:bg-purple-800/20 border-purple-500/20 ${
                  isActive(`/servers/${server.id}`) ? 'bg-purple-800/30 border-purple-400/40' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white truncate">{server.name}</h3>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(server.status)}`}></div>
                        <span className="text-xs text-purple-300">{getStatusText(server.status)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-purple-600/20 text-purple-200 text-xs">
                          {server.software.displayName}
                        </Badge>
                        <span className="text-purple-300">{server.version}</span>
                      </div>
                      <span className="text-purple-300">
                        {server.onlinePlayers}/{server.maxPlayers}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {servers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-purple-400 mb-4">No servers yet</div>
                <Link href="/servers/create">
                  <Button variant="outline" className="border-purple-500 text-purple-200 hover:bg-purple-600/20">
                    Create Your First Server
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 pt-6 border-t border-purple-500/20">
            <h3 className="text-sm font-medium text-purple-200 mb-4">System Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-purple-300">Total RAM</span>
                <span className="text-white">{(systemStats?.systemRamUsage || 0) / 1024}GB / 16GB</span>
              </div>
              <div className="w-full bg-purple-800/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  style={{ width: `${((systemStats?.systemRamUsage || 0) / 16384) * 100}%` } as React.CSSProperties}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-300">CPU Usage</span>
                <span className="text-white">{systemStats?.cpuUsage || 0}%</span>
              </div>
              <div className="w-full bg-purple-800/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full"
                  style={{ width: `${systemStats?.cpuUsage || 0}%` } as React.CSSProperties}
                ></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}