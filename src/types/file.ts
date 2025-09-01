export interface ServerFile {
  name: string;
  path: string;
  fullPath: string;
  type: 'file' | 'directory';
  size: number;
  lastModified: Date;
  permissions: FilePermissions;
  isEditable: boolean;
  mimeType?: string;
  extension?: string;
}

export interface FilePermissions {
  read: boolean;
  write: boolean;
  execute: boolean;
}

export interface FileUploadRequest {
  serverId: string;
  targetPath: string;
  files: File[];
  overwrite?: boolean;
}

export interface FileUploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

export interface FileDownloadRequest {
  serverId: string;
  filePaths: string[];
  compress?: boolean;
}

export interface WorldDownloadRequest {
  serverId: string;
  worldName: string;
  includePlayerdata?: boolean;
  compress?: boolean;
}

export interface WorldUploadRequest {
  serverId: string;
  worldFile: File;
  worldName?: string;
  replaceExisting?: boolean;
  backup?: boolean;
}

export interface FileOperation {
  id: string;
  type: 'copy' | 'move' | 'delete' | 'compress' | 'extract';
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  source: string[];
  destination?: string;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface FTPConnection {
  id: string;
  serverId: string;
  host: string;
  port: number;
  username: string;
  connected: boolean;
  lastConnected?: Date;
}

export interface FileSearchRequest {
  serverId: string;
  query: string;
  path?: string;
  fileTypes?: string[];
  recursive?: boolean;
  caseSensitive?: boolean;
  regex?: boolean;
}

export interface FileSearchResult {
  file: ServerFile;
  matches: FileMatch[];
  score: number;
}

export interface FileMatch {
  lineNumber: number;
  line: string;
  match: string;
  startIndex: number;
  endIndex: number;
}

export interface TextFileContent {
  content: string;
  encoding: string;
  lineCount: number;
  size: number;
  readonly: boolean;
}

export interface BinaryFileInfo {
  name: string;
  size: number;
  type: string;
  downloadUrl: string;
  previewAvailable: boolean;
}

export interface DirectoryListing {
  path: string;
  files: ServerFile[];
  totalFiles: number;
  totalSize: number;
  breadcrumbs: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  name: string;
  path: string;
  isLast: boolean;
}