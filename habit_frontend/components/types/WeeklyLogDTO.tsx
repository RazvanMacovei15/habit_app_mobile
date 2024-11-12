import { HabitDTO } from "./HabitDTO";

export interface WeeklyLogDTO {
  id: number;
  habitDTO: HabitDTO;
  yearWeek: number;
  weekStartDay: string;
  weekEndDay: string;
  currentCount: number;
  completed: boolean;
  previousCompleted: boolean;
}
