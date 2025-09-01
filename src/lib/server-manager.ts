import { MinecraftServer, ServerStatus, ServerPerformance } from '@/types/server';
import { db } from './database';
import { DEFAULT_SERVER_CONFIG } from '@/utils/constants';

export class ServerManager {
  private runningServers: Map<string, any> = new Map();
  private serverStats: Map<string, ServerPerformance> = new Map();

  async createServer(config: {
    name: string;
    description?: string;
    version: string;
    software: string;
    ownerId: string;
    allocatedRam?: number;
    maxPlayers?: number;
    motd?: string;
    gamemode?: string;
    difficulty?: string;
    pvp?: boolean;
  }): Promise<MinecraftServer> {
    const serverId = `server_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const server: MinecraftServer = {
      id: serverId,
      name: config.name,
      description: config.description,
      version: config.version,
      software: {
        name: config.software,
        displayName: config.software,
        versions: [config.version],
        description: '',
        features: [],
        downloadUrl: '',
        javaVersion: 21
      },
      status: 'stopped',
      port: DEFAULT_SERVER_CONFIG.port,
      allocatedRam: config.allocatedRam || DEFAULT_SERVER_CONFIG.allocatedRam,
      maxRam: DEFAULT_SERVER_CONFIG.maxRam,
      maxPlayers: config.maxPlayers || DEFAULT_SERVER_CONFIG.maxPlayers,
      onlinePlayers: 0,
      createdAt: new Date(),
      ownerId: config.ownerId,
      worldName: DEFAULT_SERVER_CONFIG.worldName,
      motd: config.motd || DEFAULT_SERVER_CONFIG.motd,
      gamemode: (config.gamemode as any) || DEFAULT_SERVER_CONFIG.gamemode,
      difficulty: (config.difficulty as any) || DEFAULT_SERVER_CONFIG.difficulty,
      pvp: config.pvp !== undefined ? config.pvp : DEFAULT_SERVER_CONFIG.pvp,
      onlineMode: DEFAULT_SERVER_CONFIG.onlineMode,
      backups: [],
      plugins: [],
      performance: {
        cpuUsage: 0,
        ramUsage: 0,
        diskUsage: 0,
        tps: 20,
        uptime: 0,
        playerCount: 0
      }
    };

    return await db.createServer(server);
  }

  async startServer(serverId: string): Promise<boolean> {
    try {
      const server = await db.getServer(serverId);
      if (!server) throw new Error('Server not found');

      // Update status to starting
      await db.updateServer(serverId, { 
        status: 'starting',
        lastStarted: new Date()
      });

      // Simulate server startup
      setTimeout(async () => {
        await db.updateServer(serverId, { status: 'running' });
        
        // Start performance monitoring
        this.startPerformanceMonitoring(serverId);
        
        // Set up Playit.gg tunnel
        await this.setupPlayitTunnel(serverId);
      }, 3000);

      return true;
    } catch (error) {
      await db.updateServer(serverId, { status: 'crashed' });
      return false;
    }
  }

  async stopServer(serverId: string): Promise<boolean> {
    try {
      const server = await db.getServer(serverId);
      if (!server) throw new Error('Server not found');

      // Update status to stopping
      await db.updateServer(serverId, { status: 'stopping' });

      // Simulate server shutdown
      setTimeout(async () => {
        await db.updateServer(serverId, { 
          status: 'stopped',
          onlinePlayers: 0
        });
        
        // Stop performance monitoring
        this.stopPerformanceMonitoring(serverId);
        
        // Remove Playit tunnel
        await this.removePlayitTunnel(serverId);
      }, 2000);

      return true;
    } catch (error) {
      return false;
    }
  }

  async restartServer(serverId: string): Promise<boolean> {
    const stopped = await this.stopServer(serverId);
    if (!stopped) return false;

    // Wait for stop to complete
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return await this.startServer(serverId);
  }

  async getServerStatus(serverId: string): Promise<ServerStatus> {
    const server = await db.getServer(serverId);
    return server?.status || 'stopped';
  }

  async getServerPerformance(serverId: string): Promise<ServerPerformance | null> {
    return this.serverStats.get(serverId) || null;
  }

  private startPerformanceMonitoring(serverId: string): void {
    const interval = setInterval(async () => {
      // Simulate performance metrics
      const performance: ServerPerformance = {
        cpuUsage: Math.random() * 80 + 20, // 20-100%
        ramUsage: Math.random() * 1024 + 512, // 512-1536 MB
        diskUsage: Math.random() * 10 + 5, // 5-15 GB
        tps: Math.random() * 5 + 18, // 18-23 TPS
        uptime: Date.now() - (await db.getServer(serverId))?.lastStarted?.getTime() || 0,
        playerCount: Math.floor(Math.random() * 10) // 0-9 players
      };

      this.serverStats.set(serverId, performance);
      
      // Update server with player count
      await db.updateServer(serverId, { 
        onlinePlayers: performance.playerCount 
      });
    }, 5000);

    this.runningServers.set(serverId, interval);
  }

  private stopPerformanceMonitoring(serverId: string): void {
    const interval = this.runningServers.get(serverId);
    if (interval) {
      clearInterval(interval);
      this.runningServers.delete(serverId);
      this.serverStats.delete(serverId);
    }
  }

  private async setupPlayitTunnel(serverId: string): Promise<void> {
    // Simulate Playit.gg tunnel setup
    const tunnelUrl = `${serverId.slice(-8)}.playit.gg`;
    await db.updateServer(serverId, { 
      playitUrl: tunnelUrl,
      ip: tunnelUrl
    });
  }

  private async removePlayitTunnel(serverId: string): Promise<void> {
    await db.updateServer(serverId, { 
      playitUrl: undefined,
      ip: undefined
    });
  }

  async executeCommand(serverId: string, command: string): Promise<{ success: boolean; output: string }> {
    const server = await db.getServer(serverId);
    if (!server || server.status !== 'running') {
      return { success: false, output: 'Server is not running' };
    }

    // Simulate command execution
    const timestamp = new Date();
    let output = '';

    switch (command.toLowerCase()) {
      case 'list':
        output = `There are ${server.onlinePlayers} of a max of ${server.maxPlayers} players online:`;
        break;
      case 'tps':
        const tps = this.serverStats.get(serverId)?.tps || 20;
        output = `Current TPS: ${tps.toFixed(2)}`;
        break;
      case 'help':
        output = 'Available commands: list, tps, stop, restart, say <message>, tp <player> <target>';
        break;
      case 'stop':
        output = 'Stopping the server...';
        setTimeout(() => this.stopServer(serverId), 1000);
        break;
      default:
        if (command.startsWith('say ')) {
          const message = command.substring(4);
          output = `[Server] ${message}`;
        } else {
          output = `Unknown command. Type "help" for help.`;
        }
    }

    // Add to console logs
    await db.addConsoleLog(serverId, {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp,
      level: 'INFO',
      message: `> ${command}`,
      source: 'CONSOLE'
    });

    await db.addConsoleLog(serverId, {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(timestamp.getTime() + 100),
      level: 'INFO',
      message: output,
      source: 'SERVER'
    });

    return { success: true, output };
  }

  async getServerLogs(serverId: string, limit?: number): Promise<any[]> {
    return await db.getConsoleLogs(serverId, limit);
  }

  async updateServerConfig(serverId: string, config: any): Promise<MinecraftServer | null> {
    return await db.updateServer(serverId, config);
  }

  async deleteServer(serverId: string): Promise<boolean> {
    // Stop server if running
    const server = await db.getServer(serverId);
    if (server?.status === 'running') {
      await this.stopServer(serverId);
      // Wait for stop to complete
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    return await db.deleteServer(serverId);
  }

  async getAllServers(userId?: string): Promise<MinecraftServer[]> {
    return await db.getServers(userId);
  }

  // Simulate resource usage for dashboard
  async getSystemStats(): Promise<any> {
    const servers = await db.getServers();
    const runningServers = servers.filter(s => s.status === 'running');
    
    return {
      totalServers: servers.length,
      runningServers: runningServers.length,
      totalRamUsage: runningServers.reduce((sum, s) => sum + s.allocatedRam, 0),
      totalPlayers: runningServers.reduce((sum, s) => sum + s.onlinePlayers, 0),
      cpuUsage: runningServers.length > 0 ? Math.random() * 60 + 20 : 0,
      systemRamUsage: Math.random() * 8192 + 2048, // 2-10GB
      diskUsage: Math.random() * 50 + 20 // 20-70GB
    };
  }
}

export const serverManager = new ServerManager();