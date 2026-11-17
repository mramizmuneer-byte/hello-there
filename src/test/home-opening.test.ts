import { describe, expect, it } from "vitest";
import { HOME, canSkipOpening, coverRect } from "../config/home";

describe("opening and home alignment", () => {
  it("ignores skip input for the first 300ms", () => {
    expect(canSkipOpening(299, false)).toBe(false);
    expect(canSkipOpening(300, false)).toBe(true);
  });
  it("does not skip a second time", () => {
    expect(canSkipOpening(1000, true)).toBe(false);
  });
  it("uses the requested sprite coordinates", () => {
    expect([HOME.centerX, HOME.feetY, HOME.height]).toEqual([195, 706, 479]);
  });
  it("centres the 720 by 1280 road with cover fit", () => {
    const rect = coverRect(720, 1280);
    expect(rect.height).toBe(844);
    expect(rect.width).toBe(474.75);
    expect(rect.x).toBe(-42.375);
    expect(rect.y).toBe(0);
  });
});