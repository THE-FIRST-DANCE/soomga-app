import { Plans } from "./Plan";

export interface EventData {
  id: number;
  memberId: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  description: string;
  plan?: Plans;
}
