import { MinecraftServer, ServerBackup, User, ServerPermission, ConsoleLog } from '@/types/server';
import { Plugin } from '@/types/plugin';
import { AuthSession } from '@/types/user';

// Simple in-memory database for demo purposes
// In production, you would use a real database like SQLite, PostgreSQL, etc.

class Database {
  private servers: Map<string, MinecraftServer> = new Map();
  private users: Map<string, User> = new Map();
  private plugins: Map<string, Plugin> = new Map();
  private sessions: Map<string, AuthSession> = new Map();
  private backups: Map<string, ServerBackup> = new Map();
  private permissions: Map<string, ServerPermission[]> = new Map();
  private consoleLogs: Map<string, ConsoleLog[]> = new Map();

  // Server operations
  async getServers(userId?: string): Promise<MinecraftServer[]> {
    const allServers = Array.from(this.servers.values());
    if (!userId) return allServers;
    return allServers.filter(server => server.ownerId === userId);
  }

  async getServer(id: string): Promise<MinecraftServer | null> {
    return this.servers.get(id) || null;
  }

  async createServer(server: MinecraftServer): Promise<MinecraftServer> {
    this.servers.set(server.id, server);
    return server;
  }

  async updateServer(id: string, updates: Partial<MinecraftServer>): Promise<MinecraftServer | null> {
    const server = this.servers.get(id);
    if (!server) return null;
    
    const updatedServer = { ...server, ...updates };
    this.servers.set(id, updatedServer);
    return updatedServer;
  }

  async deleteServer(id: string): Promise<boolean> {
    return this.servers.delete(id);
  }

  // User operations
  async getUser(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.username === username) return user;
    }
    return null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return null;
  }

  async createUser(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Plugin operations
  async getPlugins(filters?: any): Promise<Plugin[]> {
    let plugins = Array.from(this.plugins.values());
    
    if (filters?.category) {
      plugins = plugins.filter(p => p.categories.includes(filters.category));
    }
    
    if (filters?.minecraftVersion) {
      plugins = plugins.filter(p => p.minecraftVersions.includes(filters.minecraftVersion));
    }
    
    if (filters?.serverSoftware) {
      plugins = plugins.filter(p => p.serverSoftware.includes(filters.serverSoftware));
    }

    if (filters?.verified !== undefined) {
      plugins = plugins.filter(p => p.verified === filters.verified);
    }

    if (filters?.featured !== undefined) {
      plugins = plugins.filter(p => p.featured === filters.featured);
    }

    // Sort
    const sortBy = filters?.sortBy || 'downloads';
    const sortOrder = filters?.sortOrder || 'desc';
    
    plugins.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'downloads':
          comparison = a.downloads - b.downloads;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'updated':
          comparison = a.lastUpdated.getTime() - b.lastUpdated.getTime();
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return plugins;
  }

  async getPlugin(id: string): Promise<Plugin | null> {
    return this.plugins.get(id) || null;
  }

  async createPlugin(plugin: Plugin): Promise<Plugin> {
    this.plugins.set(plugin.id, plugin);
    return plugin;
  }

  // Session operations
  async createSession(session: AuthSession): Promise<AuthSession> {
    this.sessions.set(session.id, session);
    return session;
  }

  async getSession(token: string): Promise<AuthSession | null> {
    for (const session of this.sessions.values()) {
      if (session.token === token && session.active && session.expiresAt > new Date()) {
        return session;
      }
    }
    return null;
  }

  async invalidateSession(token: string): Promise<boolean> {
    for (const [id, session] of this.sessions.entries()) {
      if (session.token === token) {
        session.active = false;
        this.sessions.set(id, session);
        return true;
      }
    }
    return false;
  }

  // Backup operations
  async getBackups(serverId: string): Promise<ServerBackup[]> {
    return Array.from(this.backups.values()).filter(backup => backup.serverId === serverId);
  }

  async createBackup(backup: ServerBackup): Promise<ServerBackup> {
    this.backups.set(backup.id, backup);
    return backup;
  }

  async deleteBackup(id: string): Promise<boolean> {
    return this.backups.delete(id);
  }

  // Console logs
  async getConsoleLogs(serverId: string, limit?: number): Promise<ConsoleLog[]> {
    const logs = this.consoleLogs.get(serverId) || [];
    return limit ? logs.slice(-limit) : logs;
  }

  async addConsoleLog(serverId: string, log: ConsoleLog): Promise<void> {
    const logs = this.consoleLogs.get(serverId) || [];
    logs.push(log);
    
    // Keep only last 1000 logs
    if (logs.length > 1000) {
      logs.splice(0, logs.length - 1000);
    }
    
    this.consoleLogs.set(serverId, logs);
  }

  // Permissions
  async getServerPermissions(serverId: string): Promise<ServerPermission[]> {
    return this.permissions.get(serverId) || [];
  }

  async addServerPermission(serverId: string, permission: ServerPermission): Promise<void> {
    const perms = this.permissions.get(serverId) || [];
    perms.push(permission);
    this.permissions.set(serverId, perms);
  }

  // Initialize with sample data
  async initializeSampleData(): Promise<void> {
    // Add sample plugins
    const samplePlugins: Plugin[] = [
      {
        id: 'essentials',
        name: 'EssentialsX',
        slug: 'essentials',
        version: '2.20.1',
        description: 'The essential plugin suite for Minecraft servers',
        author: 'EssentialsX Team',
        website: 'https://essentialsx.net',
        categories: ['Admin Tools', 'Economy'],
        tags: ['teleport', 'economy', 'homes', 'warps'],
        downloads: 50000000,
        rating: 4.8,
        lastUpdated: new Date('2024-01-15'),
        minecraftVersions: ['1.21', '1.20.6', '1.20.4', '1.20.1'],
        serverSoftware: ['Paper', 'Spigot', 'Bukkit'],
        dependencies: [{ name: 'Vault', required: false }],
        downloadUrl: 'https://github.com/EssentialsX/Essentials/releases/latest/download/EssentialsX.jar',
        fileSize: 1024000,
        featured: true,
        verified: true,
        screenshots: ['https://placehold.co/800x600?text=EssentialsX+Plugin+Overview'],
        changelog: []
      },
      {
        id: 'worldedit',
        name: 'WorldEdit',
        slug: 'worldedit',
        version: '7.3.0',
        description: 'A powerful in-game world editor for Minecraft',
        author: 'sk89q',
        website: 'https://worldedit.enginehub.org',
        categories: ['World Management', 'Building Tools'],
        tags: ['worldedit', 'building', 'selection', 'creative'],
        downloads: 40000000,
        rating: 4.9,
        lastUpdated: new Date('2024-01-10'),
        minecraftVersions: ['1.21', '1.20.6', '1.20.4'],
        serverSoftware: ['Paper', 'Spigot', 'Bukkit', 'Fabric', 'Forge'],
        dependencies: [],
        downloadUrl: 'https://dev.bukkit.org/projects/worldedit/files/latest',
        fileSize: 2048000,
        featured: true,
        verified: true,
        screenshots: ['https://placehold.co/800x600?text=WorldEdit+Building+Interface'],
        changelog: []
      }
    ];

    for (const plugin of samplePlugins) {
      await this.createPlugin(plugin);
    }
  }
}

export const db = new Database();

// Initialize sample data
db.initializeSampleData();