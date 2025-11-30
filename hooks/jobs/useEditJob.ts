import { useMutation } from "@tanstack/react-query";
import { EmploymentType, ExperienceLevel, JobStatus } from "@/types/jobs";

interface EditJobPayload {
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

async function editJobAPI(payload: EditJobPayload) {
  const res = await fetch("/api/jobs/put", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to Edit job");
  return data;
}

export default function useEditJob() {
  return useMutation({
    mutationFn: editJobAPI,
  });
}
