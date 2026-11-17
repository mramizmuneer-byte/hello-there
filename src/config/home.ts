/** Home coordinates are in the engine's 390 × 844 virtual space. */
export const HOME = {
  centerX: 195,
  feetY: 706,
  height: 479,
  shadowWidth: 170,
  shadowHeight: 26,
  shadowBlur: 8,
  shadowColor: "rgba(20,16,12,0.5)",
  openingFadeMs: 350,
  spriteFadeMs: 300,
  skipGuardMs: 300,
  breathingDelayMs: 500,
} as const;

export function canSkipOpening(elapsedMs: number, ending: boolean) {
  return !ending && elapsedMs >= HOME.skipGuardMs;
}

export function coverRect(width: number, height: number, targetWidth = 390, targetHeight = 844) {
  const scale = Math.max(targetWidth / width, targetHeight / height);
  return { x: (targetWidth - width * scale) / 2, y: (targetHeight - height * scale) / 2, width: width * scale, height: height * scale };
}