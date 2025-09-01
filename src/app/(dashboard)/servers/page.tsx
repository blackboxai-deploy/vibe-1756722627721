'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data - will be replaced with real data
const mockServers = [
  {
    id: 'srv_1',
    name: 'Survival Server',
    description: 'Main survival world with plugins',
    status: 'running' as const,
    version: '1.21.4',
    software: 'Paper',
    players: { current: 8, max: 20 },
    uptime: '2d 14h 32m',
    ram: { used: 3200, allocated: 4096 },
    cpu: 45,
    playitUrl: 'survival.playit.gg',
    lastStarted: new Date('2024-01-15T10:30:00'),
    worldName: 'SurvivalWorld',
    port: 25565
  },
  {
    id: 'srv_2', 
    name: 'Creative Hub',
    description: 'Creative building server',
    status: 'stopped' as const,
    version: '1.21.3',
    software: 'Spigot',
    players: { current: 0, max: 50 },
    uptime: '0m',
    ram: { used: 0, allocated: 6144 },
    cpu: 0,
    playitUrl: 'creative.playit.gg',
    lastStarted: new Date('2024-01-14T15:45:00'),
    worldName: 'CreativeHub',
    port: 25566
  },
  {
    id: 'srv_3',
    name: 'Modded Adventure',
    description: 'Modded server with Forge',
    status: 'starting' as const,
    version: '1.20.1',
    software: 'Forge',
    players: { current: 0, max: 15 },
    uptime: '0m',
    ram: { used: 1800, allocated: 8192 },
    cpu: 25,
    playitUrl: 'modded.playit.gg',
    lastStarted: new Date('2024-01-15T16:20:00'),
    worldName: 'ModdedWorld',
    port: 25567
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'running': return 'bg-green-500';
    case 'stopped': return 'bg-gray-500';
    case 'starting': return 'bg-yellow-500';
    case 'stopping': return 'bg-orange-500';
    case 'crashed': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'running': return 'border-green-400 text-green-400';
    case 'stopped': return 'border-gray-400 text-gray-400';
    case 'starting': return 'border-yellow-400 text-yellow-400';
    case 'stopping': return 'border-orange-400 text-orange-400';
    case 'crashed': return 'border-red-400 text-red-400';
    default: return 'border-gray-400 text-gray-400';
  }
};

export default function ServersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSoftware, setFilterSoftware] = useState('all');

  const filteredServers = mockServers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || server.status === filterStatus;
    const matchesSoftware = filterSoftware === 'all' || server.software === filterSoftware;
    
    return matchesSearch && matchesStatus && matchesSoftware;
  });

  const totalRAM = mockServers.reduce((acc, server) => acc + server.ram.allocated, 0);
  const usedRAM = mockServers.reduce((acc, server) => acc + server.ram.used, 0);
  const runningServers = mockServers.filter(s => s.status === 'running').length;
  const totalPlayers = mockServers.reduce((acc, server) => acc + server.players.current, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Server Management</h1>
          <p className="text-purple-200 mt-1">
            Manage your Minecraft servers with Lightning AI Studio
          </p>
        </div>
        <Link href="/servers/create">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            + Create Server
          </Button>
        </Link>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-purple-900/20 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-200">Total Servers</CardTitle>
            <span className="text-2xl">🎮</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{mockServers.length}</div>
            <p className="text-xs text-purple-300">
              {runningServers} running
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-200">Players Online</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalPlayers}</div>
            <p className="text-xs text-purple-300">
              Across all servers
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-200">RAM Usage</CardTitle>
            <span className="text-2xl">💾</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{(usedRAM / 1024).toFixed(1)}GB</div>
            <Progress value={(usedRAM / (16 * 1024)) * 100} className="w-full h-1 mt-2" />
            <p className="text-xs text-purple-300 mt-1">
              {(usedRAM / 1024).toFixed(1)}GB / 16GB allocated
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-200">Network Status</CardTitle>
            <span className="text-2xl">🌐</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">Online</div>
            <p className="text-xs text-purple-300">
              Playit.gg tunnels active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-purple-900/20 border-purple-500/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search servers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-purple-800/20 border-purple-500/30 text-white placeholder-purple-300"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px] bg-purple-800/20 border-purple-500/30 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="stopped">Stopped</SelectItem>
                <SelectItem value="starting">Starting</SelectItem>
                <SelectItem value="crashed">Crashed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSoftware} onValueChange={setFilterSoftware}>
              <SelectTrigger className="w-full sm:w-[180px] bg-purple-800/20 border-purple-500/30 text-white">
                <SelectValue placeholder="Filter by software" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Software</SelectItem>
                <SelectItem value="Paper">Paper</SelectItem>
                <SelectItem value="Spigot">Spigot</SelectItem>
                <SelectItem value="Forge">Forge</SelectItem>
                <SelectItem value="Fabric">Fabric</SelectItem>
                <SelectItem value="Vanilla">Vanilla</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Servers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServers.map((server) => (
          <Card key={server.id} className="bg-purple-900/20 border-purple-500/20 hover:border-purple-400/40 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(server.status)} animate-pulse`}></div>
                  <CardTitle className="text-lg text-white">{server.name}</CardTitle>
                </div>
                <Badge variant="outline" className={getStatusBadgeColor(server.status)}>
                  {server.status}
                </Badge>
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
                  <p className="text-white font-medium">{server.version}</p>
                </div>
                <div>
                  <span className="text-purple-300">Software:</span>
                  <p className="text-white font-medium">{server.software}</p>
                </div>
                <div>
                  <span className="text-purple-300">Players:</span>
                  <p className="text-white font-medium">{server.players.current}/{server.players.max}</p>
                </div>
                <div>
                  <span className="text-purple-300">Uptime:</span>
                  <p className="text-white font-medium">{server.uptime}</p>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">RAM Usage</span>
                    <span className="text-white">{Math.round(server.ram.used)} / {server.ram.allocated}MB</span>
                  </div>
                  <Progress value={(server.ram.used / server.ram.allocated) * 100} className="w-full h-2 mt-1" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">CPU Usage</span>
                    <span className="text-white">{server.cpu}%</span>
                  </div>
                  <Progress value={server.cpu} className="w-full h-2 mt-1" />
                </div>
              </div>

              {/* Playit URL */}
              {server.playitUrl && (
                <div className="p-2 bg-purple-800/20 rounded border border-purple-500/30">
                  <span className="text-purple-300 text-xs">Playit.gg URL:</span>
                  <p className="text-white font-mono text-sm">{server.playitUrl}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                {server.status === 'running' ? (
                  <Button size="sm" variant="outline" className="flex-1 border-red-500 text-red-400 hover:bg-red-500/10">
                    Stop
                  </Button>
                ) : (
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                    Start
                  </Button>
                )}
                <Link href={`/servers/${server.id}`} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full border-purple-400 text-purple-200 hover:bg-purple-600/20">
                    Manage
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServers.length === 0 && (
        <Card className="bg-purple-900/20 border-purple-500/20">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-white mb-2">No servers found</h3>
            <p className="text-purple-300 mb-6">
              {searchTerm || filterStatus !== 'all' || filterSoftware !== 'all'
                ? 'Try adjusting your search criteria'
                : 'Create your first Minecraft server to get started'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && filterSoftware === 'all' && (
              <Link href="/servers/create">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Create Your First Server
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}