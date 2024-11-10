import { HabitDTO } from "./HabitDTO";

export interface DailyLogDTO {
  id: number;
  date: string;
  habitDTO: HabitDTO;
  completed: boolean;
  isPreviousDayCompleted: boolean;
}
