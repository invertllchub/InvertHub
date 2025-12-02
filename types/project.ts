export type Project = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};
export type projects = {
  projects: Project[]
}