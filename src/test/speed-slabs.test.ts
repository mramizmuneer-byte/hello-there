import { describe, expect, it } from "vitest";
import { slabSpeed } from "@/config/game";

describe("speed slabs", () => {
  it("starts at 11 m/s", () => expect(slabSpeed(0)).toBe(11));
  it("is 15 m/s at 200 m", () => expect(slabSpeed(200)).toBe(15));
  it("is 20 m/s at 600 m", () => expect(slabSpeed(600)).toBe(20));
  it("is 27 m/s at 2000 m", () => expect(slabSpeed(2000)).toBe(27));
  it("caps at 39 m/s after 12000 m", () => expect(slabSpeed(20000)).toBe(39));
});
