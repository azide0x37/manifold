// src/types/WorldLine.ts
import { ICalCalendar } from 'ical-generator';
import { ReferenceFrame, ManifoldEvent, SpaceTime } from './';

export interface WorldLine {
  userId: string;
  referenceFrames: ReferenceFrame[];
  events: ManifoldEvent[];
  currentSpaceTime: SpaceTime;
  iCalCalendar?: ICalCalendar;
}
