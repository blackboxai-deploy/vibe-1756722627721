export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
  role: UserRole;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  consoleSettings: ConsoleSettings;
}

export interface NotificationSettings {
  serverStart: boolean;
  serverStop: boolean;
  serverCrash: boolean;
  playerJoin: boolean;
  playerLeave: boolean;
  backupComplete: boolean;
  lowDiskSpace: boolean;
  highCpuUsage: boolean;
  email: boolean;
  browser: boolean;
}

export interface ConsoleSettings {
  autoScroll: boolean;
  maxLines: number;
  fontSize: number;
  theme: 'dark' | 'light';
  timestampFormat: string;
  logLevels: LogLevel[];
}

export interface UserStats {
  serversCreated: number;
  totalUptime: number;
  commandsExecuted: number;
  filesUploaded: number;
  pluginsInstalled: number;
  backupsCreated: number;
}

export type UserRole = 'admin' | 'user' | 'moderator';
export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

export interface ServerPermission {
  serverId: string;
  userId: string;
  role: ServerRole;
  permissions: Permission[];
  grantedAt: Date;
  grantedBy: string;
}

export type ServerRole = 'owner' | 'admin' | 'editor' | 'viewer';

export interface Permission {
  action: PermissionAction;
  resource: PermissionResource;
  allowed: boolean;
}

export type PermissionAction = 
  | 'read' 
  | 'write' 
  | 'delete' 
  | 'execute' 
  | 'start' 
  | 'stop' 
  | 'restart' 
  | 'backup' 
  | 'restore';

export type PermissionResource = 
  | 'server' 
  | 'files' 
  | 'console' 
  | 'plugins' 
  | 'settings' 
  | 'users' 
  | 'backups';

export interface AuthSession {
  id: string;
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
  active: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
  errors?: string[];
}