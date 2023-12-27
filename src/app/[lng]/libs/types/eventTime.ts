export interface IEventTime {
  time: {
    diffInDays: number;
    diffInHours: number;
    diffInMinutes: number;
    diffInSeconds: number;
  };
  active: boolean;
}
