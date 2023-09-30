// src/core/EventManager.ts
import { ManifoldEvent } from '../types/ManifoldEvent';
import { ReferenceFrame } from '../types/ReferenceFrame';

export function addEvent(referenceFrame: ReferenceFrame, event: ManifoldEvent): void {
  referenceFrame.events.push(event);
}

export function removeEvent(referenceFrame: ReferenceFrame, eventId: string): void {
  const index = referenceFrame.events.findIndex(e => e.id === eventId);
  if (index !== -1) {
    referenceFrame.events.splice(index, 1);
  }
}
