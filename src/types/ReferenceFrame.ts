
// src/types/ReferenceFrame.ts
import { ManifoldEvent } from "./ManifoldEvent";

export interface ReferenceFrame {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  events: ManifoldEvent[];
}
