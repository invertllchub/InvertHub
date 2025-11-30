export type JobStatus = "Available" | "NotAvailable";
export type EmploymentType = "FullTime" | "PartTime" | "Hybrid" | "Intern";
export type ExperienceLevel = "Junior" | "MidLevel" | "Midlevel" | "Senior";

export interface Job {
  id: string;
  title: string;
  location: string;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  status: JobStatus;
  createdAt: string;
  closingDate: string;
  description: string;
keyResponsibilities: Record<string, string>;
requirements: Record<string, string>;
benefits: Record<string, string>;

}

export interface JobsResponse {
  jobs: Job[];
}
