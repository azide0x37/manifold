// src/core/WorldLineManager.ts
import { WorldLine, SpaceTime } from '../types';

export function updateSpaceTime(worldLine: WorldLine, spaceTime: SpaceTime): void {
  worldLine.currentSpaceTime = spaceTime;
}
