import { Metadata } from "./metadata.model";

export interface Skill {
  id: string,
  name: string,
  description: string,
  image: string,
  levels: number[],
  metadata?: Metadata
}
