export function getRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
export function easeOutSin(x: number) {
  return Math.sin((x * Math.PI) / 2);
}
export function getPercent(input: number, min: number, max: number) {
  return ((input - min) * 100) / (max - min) / 100;
}
