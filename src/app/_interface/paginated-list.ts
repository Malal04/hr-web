export interface PaginatedList<T> {
    items: T[];
    totalItems: number;
    pageSize: number;
    page: number;
}

export interface ActivityLog {
  id: number;
  action: string;
  userName: string;
  timestamp: string;
}

export interface PaginatedLogs {
  total: number;
  logs: ActivityLog[];
}