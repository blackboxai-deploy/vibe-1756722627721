'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ServersPage() {
  const [servers, setServers] = useState<any[]>([]);
  const [systemStats, setSystemStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setTimeout(() => {
      setServers([
        {
          id: 'server_1',
          name: 'Survival World',
          description: 'Main survival server with economy and towns',
          status: 'running',
          version: '1.21.4',
          software: { name: 'paper', displayName: 'Paper' },
          onlinePlayers: 8,
          maxPlayers: 50,
          allocatedRam: 4096,
          maxRam: 16384,
          uptime: 1234567890,
          motd: 'Welcome to Survival World!',
          ip: 'survival.playit.gg',
          port: 25565,
          playitUrl: 'survival.playit.gg',
          performance: {
            cpuUsage: 45,
            ramUsage: 2048,
            tps: 19.8,
            diskUsage: 12.5
          }
        },
        {
          id: 'server_2',
          name: 'Creative Build Server',
          description: 'Creative server for building projects',
          status: 'stopped',
          version: '1.21.1',
          software: { name: 'fabric', displayName: 'Fabric' },
          onlinePlayers: 0,
          maxPlayers: 20,
          allocatedRam: 2048,
          maxRam: 16384,
          uptime: 0,
          motd: 'Creative Building Server',
          performance: {
            cpuUsage: 0,
            ramUsage: 0,
            tps: 0,
            diskUsage: 8.3
          }
        },
        {
          id: 'server_3',
          name: 'Modded Adventure',
          description: 'Modded server with exploration mods',
          status: 'starting',
          version: '1.20.6',
          software: { name: 'forge', displayName: 'Forge' },
          onlinePlayers: 0,
          maxPlayers: 30,
          allocatedRam: 6144,
          maxRam: 16384,
          uptime: 0,
          motd: 'Adventure Awaits!',
          performance: {
            cpuUsage: 25,
            ramUsage: 1024,
            tps: 0,
            diskUsage: 15.7
          }
        }
      ]);

      setSystemStats({
        totalServers: 3,
        runningServers: 1,
        stoppedServers: 2,
        totalPlayers: 8,
        totalRamAllocated: 12288,
        totalRamUsed: 3072,
        maxRam: 16384,
        avgCpuUsage: 23,
        totalDiskUsage: 36.5,
        maxDiskSpace: 500
      });

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'starting': return 'bg-yellow-500 animate-pulse';
      case 'stopping': return 'bg-orange-500 animate-pulse';
      case 'stopped': return 'bg-gray-500';
      case 'crashed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return 'Online';
      case 'starting': return 'Starting...';
      case 'stopping': return 'Stopping...';
      case 'stopped': return 'Offline';
      case 'crashed': return 'Crashed';
      default: return 'Unknown';
    }
  };

  const formatUptime = (uptime: number) => {
    if (uptime === 0) return 'Not running';
    const hours = Math.floor(uptime / 3600000);
    const minutes = Math.floor((uptime % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="text-purple-200">Loading servers...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Server Dashboard</h1>
          <p className="text-purple-300 mt-2">Manage your Minecraft servers</p>
        </div>
        <Link href="/servers/create">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            + Create Server
          </Button>
        </Link>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-purple-900/20 border-purple-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-200 text-sm">Active Servers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">
                {systemStats.runningServers}
              </span>
              <div className="text-sm text-purple-300">
                of {systemStats.totalServers}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-200 text-sm">Total Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">
                {systemStats.totalPlayers}
              </span>
              <div className="text-sm text-purple-300">
                online
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-200 text-sm">Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-white">
                  {(systemStats.totalRamUsed / 1024).toFixed(1)}GB
                </span>
                <span className="text-sm text-purple-300">
                  of {systemStats.maxRam / 1024}GB
                </span>
              </div>
              <Progress 
                value={(systemStats.totalRamUsed / systemStats.maxRam) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-200 text-sm">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-white">
                  {systemStats.avgCpuUsage}%
                </span>
                <span className="text-sm text-purple-300">
                  average
                </span>
              </div>
              <Progress 
                value={systemStats.avgCpuUsage}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Servers Grid */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-purple-900/20 border border-purple-500/20">
          <TabsTrigger value="all">All Servers ({systemStats.totalServers})</TabsTrigger>
          <TabsTrigger value="running">Running ({systemStats.runningServers})</TabsTrigger>
          <TabsTrigger value="stopped">Stopped ({systemStats.stoppedServers})</TabsTrigger>
          <TabsTrigger value="manage">Quick Actions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {servers.map((server) => (
              <Card key={server.id} className="bg-purple-900/20 border-purple-500/20 hover:bg-purple-800/30 transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{server.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(server.status)}`}></div>
                      <Badge variant="outline" className={`text-xs border-purple-400 ${
                        server.status === 'running' ? 'text-green-400' : 
                        server.status === 'stopped' ? 'text-gray-400' :
                        'text-yellow-400'
                      }`}>
                        {getStatusText(server.status)}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-purple-300">
                    {server.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Server Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-300">Version:</span>
                      <div className="font-medium text-white">{server.version}</div>
                    </div>
                    <div>
                      <span className="text-purple-300">Software:</span>
                      <div className="font-medium text-white">{server.software.displayName}</div>
                    </div>
                    <div>
                      <span className="text-purple-300">Players:</span>
                      <div className="font-medium text-white">{server.onlinePlayers}/{server.maxPlayers}</div>
                    </div>
                    <div>
                      <span className="text-purple-300">RAM:</span>
                      <div className="font-medium text-white">{server.allocatedRam / 1024}GB</div>
                    </div>
                  </div>

                  {/* Connection Info */}
                  {server.status === 'running' && server.playitUrl && (
                    <div className="bg-purple-800/30 p-3 rounded-lg">
                      <div className="text-xs text-purple-300 mb-1">Server Address:</div>
                      <div className="font-mono text-sm text-white break-all">
                        {server.playitUrl}:{server.port}
                      </div>
                    </div>
                  )}

                  {/* Performance Metrics for Running Servers */}
                  {server.status === 'running' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-300">TPS:</span>
                        <span className={`font-medium ${
                          server.performance.tps >= 19 ? 'text-green-400' :
                          server.performance.tps >= 15 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {server.performance.tps.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-300">CPU:</span>
                        <span className="text-white">{server.performance.cpuUsage}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-300">Uptime:</span>
                        <span className="text-white">{formatUptime(server.uptime)}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Link href={`/servers/${server.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full border-purple-500 text-purple-200 hover:bg-purple-600/20">
                        Manage
                      </Button>
                    </Link>
                    <Link href={`/servers/${server.id}/console`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full border-purple-500 text-purple-200 hover:bg-purple-600/20">
                        Console
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="running">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {servers.filter(s => s.status === 'running').map((server) => (
              <Card key={server.id} className="bg-purple-900/20 border-purple-500/20">
                {/* Same server card content as above */}
                <CardHeader>
                  <CardTitle className="text-white">{server.name}</CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 w-fit">Online</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-purple-300">
                    {server.onlinePlayers} players online
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="stopped">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {servers.filter(s => s.status === 'stopped').map((server) => (
              <Card key={server.id} className="bg-purple-900/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">{server.name}</CardTitle>
                  <Badge variant="secondary" className="bg-gray-500/20 text-gray-400 w-fit">Offline</Badge>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Start Server
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="manage">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">Start All Servers</Button>
                <Button className="w-full" variant="outline">Stop All Servers</Button>
                <Button className="w-full" variant="outline">Backup All Worlds</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}