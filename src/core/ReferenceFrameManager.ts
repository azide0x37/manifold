// src/core/ReferenceFrameManager.ts

import { ManifoldEvent, ReferenceFrame, WorldLine } from '../types';

export function addReferenceFrame(worldLine: WorldLine, referenceFrame: ReferenceFrame): void {
  worldLine.referenceFrames.push(referenceFrame);
}

export function removeReferenceFrame(worldLine: WorldLine, referenceFrameId: string): void {
  const index = worldLine.referenceFrames.findIndex(rf => rf.id === referenceFrameId);
  if (index !== -1) {
    worldLine.referenceFrames.splice(index, 1);
  }
}

export const addEventToReferenceFrame = (referenceFrame: ReferenceFrame, event: ManifoldEvent): void => {
  referenceFrame.events.push(event);
};

export const removeEventFromReferenceFrame = (referenceFrame: ReferenceFrame, eventId: string): void => {
  const index = referenceFrame.events.findIndex(e => e.id === eventId);
  if (index !== -1) {
    referenceFrame.events.splice(index, 1);
  }
}
