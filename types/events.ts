export interface AuditSummaryResponse {
  success: boolean;
  message: string;
  data: {
    data : AuditSummaryData
  };
  errors: null | string;
  pagination: null | Pagination;
}

export interface AuditSummaryData {
  totalLogs: number;
  byActionType: ByActionType[];
  byTargetType: ByTargetType[];
  byUser: ByUser[];
  recentActivity: Events[];
}

export interface ByActionType {
  action: string;
  count: number;
}

export interface ByTargetType {
  target: string;
  count: number;
}

export interface ByUser {
  userId: string;
  userName: string;
  count: number;
}


export interface Pagination {
  page?: number;
  pageSize?: number;
  total?: number;
  pageCount?: number;
}


// Events
export interface Events {
  id: string;
  logDate: string;        
  userId: string;
  userName: string;
  userEmail: string;
  targetId: string;
  targetType: string;
  actionType: string;
  description: string;
  changes: null | any;     
}
