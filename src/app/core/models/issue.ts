import { Status } from "./status.enum";
export interface Issue {
  uid?: string;
  title: string;
  description: string;
  status: Status;
  dateIso: string;
  projectUid: string;
  creatorUid: string;
}
