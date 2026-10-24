/** Realistic cut-out photos for obstacles. Each kind maps to one photo. */
import files from "@/assets/ob_files.png";
import trolley from "@/assets/ob_trolley.png";
import chair from "@/assets/ob_chair.png";
import duct from "@/assets/ob_duct.png";
import pothole from "@/assets/ob_pothole.png";
import rider from "@/assets/ob_rider.png";
import { loadSprite, type Sprite } from "./sprites";
import type { ObKind } from "./props";

/** fit: "width" stretches to lane width; "height" fits the obstacle height; squash flattens ground decals. */
export interface ObPhoto {
  url: string;
  fit: "width" | "height";
  widthFrac?: number;
  squash?: number;
}

const PHOTOS: Partial<Record<ObKind, ObPhoto>> = {
  files: { url: files, fit: "width", widthFrac: 0.85 },
  gst: { url: files, fit: "width", widthFrac: 0.85 },
  notice: { url: files, fit: "width", widthFrac: 0.8 },
  calculator: { url: files, fit: "width", widthFrac: 0.8 },
  plant: { url: files, fit: "width", widthFrac: 0.8 },
  trolley: { url: trolley, fit: "width" },
  ac: { url: trolley, fit: "width" },
  chair: { url: chair, fit: "height" },
  pipe: { url: duct, fit: "width" },
  email: { url: duct, fit: "width" },
  plane: { url: duct, fit: "width" },
  pothole: { url: pothole, fit: "width", squash: 0.45 },
  breaker: { url: pothole, fit: "width", squash: 0.45 },
  rider: { url: rider, fit: "height" },
  scooter: { url: rider, fit: "height" },
};

export function obPhoto(kind: ObKind): { cfg: ObPhoto; s: Sprite } | null {
  const cfg = PHOTOS[kind];
  if (!cfg) return null;
  return { cfg, s: loadSprite(cfg.url) };
}
