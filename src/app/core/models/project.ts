export interface Project {
  name: string;
  description: string;
  tags: string[];
  ownerId: string;
  members: string[];
  issues: string[];
  uid?: string;
}
