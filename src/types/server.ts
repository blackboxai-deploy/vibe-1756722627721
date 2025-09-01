export interface MinecraftServer {
  id: string;
  name: string;
  description?: string;
  version: string;
  software: ServerSoftware;
  status: ServerStatus;
  ip?: string;
  port: number;
  playitUrl?: string;
  maxRam: number;
  allocatedRam: number;
  maxPlayers: number;
  onlinePlayers: number;
  createdAt: Date;
  lastStarted?: Date;
  ownerId: string;
  worldName: string;
  motd: string;
  gamemode: GameMode;
  difficulty: Difficulty;
  pvp: boolean;
  onlineMode: boolean;
  backups: ServerBackup[];
  plugins: InstalledPlugin[];
  performance: ServerPerformance;
}

export interface ServerPerformance {
  cpuUsage: number;
  ramUsage: number;
  diskUsage: number;
  tps: number;
  uptime: number;
  playerCount: number;
}

export interface ServerBackup {
  id: string;
  serverId: string;
  name: string;
  size: number;
  createdAt: Date;
  type: 'manual' | 'automatic';
  worldName: string;
  filePath: string;
}

export interface InstalledPlugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  enabled: boolean;
  installedAt: Date;
  filePath: string;
  dependencies: string[];
}

export interface MinecraftVersion {
  id: string;
  version: string;
  type: 'release' | 'snapshot' | 'old_beta' | 'old_alpha';
  releaseTime: Date;
  url: string;
  javaVersion: number;
  supported: boolean;
}

export interface ServerSoftware {
  name: string;
  displayName: string;
  versions: string[];
  description: string;
  features: string[];
  downloadUrl: string;
  javaVersion: number;
}

export type ServerStatus = 
  | 'stopped' 
  | 'starting' 
  | 'running' 
  | 'stopping' 
  | 'crashed' 
  | 'maintenance';

export type GameMode = 'survival' | 'creative' | 'adventure' | 'spectator';
export type Difficulty = 'peaceful' | 'easy' | 'normal' | 'hard';

export interface ServerConfig {
  serverProperties: Record<string, string | number | boolean>;
  javaArgs: string[];
  customArgs: string[];
  autoRestart: boolean;
  maxRestarts: number;
  backupInterval: number;
  autoBackup: boolean;
}

export interface ConsoleLog {
  id: string;
  timestamp: Date;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  source: string;
}

export interface ServerStats {
  totalServers: number;
  runningServers: number;
  totalRamUsage: number;
  totalPlayers: number;
  uptime: number;
}