import { Job } from "./jobs";


export interface DashboardStatisticsResponse {
    success: boolean;
    message?: string;
    errors?: any | null;
    data: {
        data: DashboardStatistics;
    };
    pagination?: any | null;
}


export interface DashboardStatistics {
    actionsToday: number;
    activeUsersCount: number;
    articlesCount: number;
    closedJobsCount: number;

    jobsByStatus: {
        Available: number
    };     
    jobsClosingSoon: Job[];        

    jobsCount: number;
    openJobsCount: number;
    projectsCount: number;
    publishedArticlesThisMonth: number;
    totalAuditLogs: number;

    usersByGender: Record<string, number>; 
    usersCount: number;
}


