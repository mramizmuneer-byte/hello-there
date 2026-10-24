/** Real-photo Bangalore obstacles, the Rapido power-up and the ICAI study modules. */
import autoAsset from "@/assets/auto_rear.png";
import busAsset from "@/assets/bmtc_rear.png";
import captainAsset from "@/assets/rapido_captain.png";
import rideAsset from "@/assets/rapido_ride.png";
import book1 from "@/assets/icai_book_1.jpg";
import book2 from "@/assets/icai_book_2.jpg";
import book3 from "@/assets/icai_book_3.jpg";
import { loadSprite, type Sprite } from "./sprites";

let cache: {
  auto: Sprite;
  bus: Sprite;
  captain: Sprite;
  ride: Sprite;
  books: Sprite[];
} | null = null;

export function blrArt() {
  if (!cache)
    cache = {
      auto: loadSprite(autoAsset),
      bus: loadSprite(busAsset),
      captain: loadSprite(captainAsset),
      ride: loadSprite(rideAsset),
      books: [book1, book2, book3].map((b) => loadSprite(b)),
    };
  return cache;
}

/** Study modules, in the order they are found. Add more covers here later. */
export const ICAI_BOOKS = ["Paper 1 · Financial Reporting", "Strategic Cost & Performance Mgmt", "Paper 3 · Advanced Auditing"];

/** Distance between study modules (m). */
export const BOOK_EVERY = 1300;
