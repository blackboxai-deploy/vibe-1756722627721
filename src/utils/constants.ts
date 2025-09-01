export const MINECRAFT_VERSIONS = [
  // Latest releases
  { version: '1.21.4', type: 'release', javaVersion: 21, featured: true },
  { version: '1.21.3', type: 'release', javaVersion: 21, featured: false },
  { version: '1.21.1', type: 'release', javaVersion: 21, featured: false },
  { version: '1.21', type: 'release', javaVersion: 21, featured: true },
  
  // Popular versions
  { version: '1.20.6', type: 'release', javaVersion: 21, featured: true },
  { version: '1.20.4', type: 'release', javaVersion: 17, featured: true },
  { version: '1.20.1', type: 'release', javaVersion: 17, featured: false },
  { version: '1.19.4', type: 'release', javaVersion: 17, featured: false },
  { version: '1.18.2', type: 'release', javaVersion: 17, featured: false },
  { version: '1.17.1', type: 'release', javaVersion: 16, featured: false },
  { version: '1.16.5', type: 'release', javaVersion: 8, featured: false },
  { version: '1.12.2', type: 'release', javaVersion: 8, featured: false },
  { version: '1.8.9', type: 'release', javaVersion: 8, featured: false },
] as const;

export const SERVER_SOFTWARE = [
  {
    name: 'vanilla',
    displayName: 'Vanilla',
    description: 'Official Minecraft server software from Mojang',
    features: ['Official', 'Stable', 'No modifications'],
    javaVersion: 21,
    supportsPlugins: false,
    supportsMods: false
  },
  {
    name: 'paper',
    displayName: 'Paper',
    description: 'High performance Spigot fork with additional features',
    features: ['High Performance', 'Plugin Support', 'Advanced Configuration'],
    javaVersion: 21,
    supportsPlugins: true,
    supportsMods: false
  },
  {
    name: 'spigot',
    displayName: 'Spigot',
    description: 'High performance Minecraft server implementation',
    features: ['Plugin Support', 'Performance Optimizations', 'API for Developers'],
    javaVersion: 21,
    supportsPlugins: true,
    supportsMods: false
  },
  {
    name: 'bukkit',
    displayName: 'CraftBukkit',
    description: 'The original modded Minecraft server software',
    features: ['Plugin Support', 'Stable', 'Wide Compatibility'],
    javaVersion: 17,
    supportsPlugins: true,
    supportsMods: false
  },
  {
    name: 'fabric',
    displayName: 'Fabric',
    description: 'Lightweight modding platform for Minecraft',
    features: ['Lightweight', 'Fast Updates', 'Mod Support'],
    javaVersion: 21,
    supportsPlugins: false,
    supportsMods: true
  },
  {
    name: 'forge',
    displayName: 'Forge',
    description: 'The most popular Minecraft modding platform',
    features: ['Extensive Mod Support', 'Large Community', 'Mature Platform'],
    javaVersion: 17,
    supportsPlugins: false,
    supportsMods: true
  },
  {
    name: 'quilt',
    displayName: 'Quilt',
    description: 'Fork of Fabric with additional features',
    features: ['Fabric Compatible', 'Additional Features', 'Active Development'],
    javaVersion: 17,
    supportsPlugins: false,
    supportsMods: true
  }
] as const;

export const PLUGIN_CATEGORIES = [
  { id: 'admin-tools', name: 'Admin Tools', description: 'Server administration and management tools' },
  { id: 'chat', name: 'Chat & Communication', description: 'Chat formatting, channels, and communication' },
  { id: 'economy', name: 'Economy', description: 'Economy systems, shops, and currency' },
  { id: 'fun', name: 'Fun & Entertainment', description: 'Mini-games, entertainment, and fun features' },
  { id: 'gameplay', name: 'Gameplay', description: 'Core gameplay modifications and enhancements' },
  { id: 'protection', name: 'Protection & Security', description: 'Anti-griefing and security tools' },
  { id: 'teleportation', name: 'Teleportation', description: 'Teleportation, homes, and warps' },
  { id: 'world-management', name: 'World Management', description: 'World editing, generation, and management' },
  { id: 'pvp', name: 'PvP & Combat', description: 'Player vs Player and combat enhancements' },
  { id: 'roleplay', name: 'Roleplay', description: 'Roleplay features and immersion tools' }
] as const;

export const DEFAULT_SERVER_CONFIG = {
  maxPlayers: 20,
  allocatedRam: 2048, // MB
  maxRam: 16384, // MB
  port: 25565,
  gamemode: 'survival',
  difficulty: 'normal',
  pvp: true,
  onlineMode: true,
  motd: 'A Minecraft Server',
  worldName: 'world',
  autoRestart: true,
  maxRestarts: 5,
  backupInterval: 24, // hours
  autoBackup: true
} as const;

export const JAVA_VERSIONS = [
  { version: 8, displayName: 'Java 8', recommended: false },
  { version: 11, displayName: 'Java 11', recommended: false },
  { version: 17, displayName: 'Java 17 LTS', recommended: true },
  { version: 21, displayName: 'Java 21 LTS', recommended: true }
] as const;

export const FILE_TYPES = {
  EDITABLE: ['.txt', '.yml', '.yaml', '.json', '.properties', '.cfg', '.conf', '.ini', '.log'],
  ARCHIVE: ['.zip', '.rar', '.tar', '.gz', '.7z'],
  IMAGE: ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'],
  WORLD: ['.mca', '.dat', '.dat_old'],
  EXECUTABLE: ['.jar', '.exe', '.sh', '.bat', '.cmd']
} as const;

export const MAX_FILE_SIZE = {
  UPLOAD: 100 * 1024 * 1024, // 100MB
  WORLD: 500 * 1024 * 1024, // 500MB
  PLUGIN: 50 * 1024 * 1024, // 50MB
  CONFIG: 1024 * 1024 // 1MB
} as const;

export const CONSOLE_COLORS = {
  INFO: '#22c55e',
  WARN: '#f59e0b',
  ERROR: '#ef4444',
  DEBUG: '#6366f1',
  SUCCESS: '#10b981',
  SERVER: '#8b5cf6'
} as const;

export const WS_EVENTS = {
  SERVER_STATUS: 'server:status',
  SERVER_STATS: 'server:stats',
  CONSOLE_LOG: 'console:log',
  FILE_UPLOAD: 'file:upload',
  BACKUP_PROGRESS: 'backup:progress'
} as const;

export const API_ENDPOINTS = {
  MINECRAFT_VERSIONS: 'https://launchermeta.mojang.com/mc/game/version_manifest.json',
  PAPER_VERSIONS: 'https://api.papermc.io/v2/projects/paper',
  SPIGOT_RESOURCES: 'https://api.spiget.org/v2/resources',
  BUKKIT_PLUGINS: 'https://servermods.forgesvc.net/servermods'
} as const;

export const PLAYIT_CONFIG = {
  DEFAULT_REGION: 'auto',
  SUPPORTED_PROTOCOLS: ['tcp', 'udp'],
  DEFAULT_PROTOCOL: 'tcp',
  MAX_TUNNELS: 5
} as const;

export const SYSTEM_LIMITS = {
  MAX_SERVERS_PER_USER: 10,
  MAX_BACKUPS_PER_SERVER: 50,
  MAX_PLUGINS_PER_SERVER: 100,
  MAX_CONSOLE_LOGS: 1000,
  MAX_FILE_OPERATIONS: 10
} as const;