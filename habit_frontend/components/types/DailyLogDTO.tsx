import { HabitDTO } from "./HabitDTO";

export interface DailyLogDTO {
  id: number;
  date: Date;
  habitDTO: HabitDTO;
  completed: boolean;
  currentCount: number;
  previousCompleted: boolean;
}
