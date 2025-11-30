import { useMutation } from "@tanstack/react-query";
import { EmploymentType, ExperienceLevel, JobStatus } from "@/types/jobs";

interface CreateJobPayload {
  title: string;
  location: string;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  status: JobStatus;
  closingDate: string;
  description: string;
  keyResponsibilities: object;
  requirements: object;
  benefits: object;
}

async function addJobAPI(payload: CreateJobPayload) {
  const res = await fetch("/api/jobs/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to add job");
  return data;
}

export default function useAddJob() {
  return useMutation({
    mutationFn: addJobAPI,
  });
}
