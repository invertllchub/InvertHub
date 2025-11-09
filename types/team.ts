export type TeamMember = {
  id: number;
  name: string;
  jobTitle: string;
  role: string;
  articles: number;
};
export type Team = {
  team: TeamMember[]
}