// src/types/ManifoldEvent.ts

import { Temporal } from '@js-temporal/polyfill';
import { ReferenceFrame } from './ReferenceFrame';

export type SpaceTime = {
  name: string;
  x: number; //latitude
  y: number; //longitude
  z: number; //altitude (-1 for "sea level" as a default)
  t: Temporal.Instant;
};

export interface ManifoldEvent {
  id: string;
  name: string;
  start: SpaceTime
  end: SpaceTime;
  description?: string;
  referenceFrames: ReferenceFrame[];
}
