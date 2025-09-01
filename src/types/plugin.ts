export interface Plugin {
  id: string;
  name: string;
  slug: string;
  version: string;
  description: string;
  author: string;
  website?: string;
  sourceCode?: string;
  categories: string[];
  tags: string[];
  downloads: number;
  rating: number;
  lastUpdated: Date;
  minecraftVersions: string[];
  serverSoftware: string[];
  dependencies: PluginDependency[];
  downloadUrl: string;
  fileSize: number;
  featured: boolean;
  verified: boolean;
  screenshots: string[];
  changelog: VersionHistory[];
}

export interface PluginDependency {
  name: string;
  required: boolean;
  minVersion?: string;
  maxVersion?: string;
}

export interface VersionHistory {
  version: string;
  releaseDate: Date;
  changes: string[];
  downloadUrl: string;
  minecraftVersions: string[];
}

export interface PluginInstallRequest {
  serverId: string;
  pluginId?: string;
  downloadUrl?: string;
  file?: File;
  installMethod: 'marketplace' | 'url' | 'upload';
}

export interface PluginInstallResult {
  success: boolean;
  message: string;
  plugin?: InstalledPlugin;
  warnings?: string[];
  errors?: string[];
}

export interface PluginCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  pluginCount: number;
}

export interface PluginSearchFilters {
  category?: string;
  minecraftVersion?: string;
  serverSoftware?: string;
  sortBy: 'downloads' | 'rating' | 'updated' | 'name';
  sortOrder: 'asc' | 'desc';
  verified?: boolean;
  featured?: boolean;
}

export interface PluginSearchResult {
  plugins: Plugin[];
  total: number;
  page: number;
  pageSize: number;
  filters: PluginSearchFilters;
}

// Re-export from server types
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