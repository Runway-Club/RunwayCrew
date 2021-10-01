import { Metadata } from "./metadata.model";

export interface Skill {
  _id:string,
  id: string,
  name: string,
  description: string,
  image: string,
  levels: number[],
  metadata?: Metadata
}
