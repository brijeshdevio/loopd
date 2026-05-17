export function addDays(date: Date, day: number) {
  return new Date(date.getTime() + day * 24 * 60 * 60 * 1000);
}
