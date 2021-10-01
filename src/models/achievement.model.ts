import { Metadata } from "./metadata.model";

export interface AchievedSkill {
  skillId: string,
  exp: number
}

export interface Achievement {
  _id:string,
  id: string,
  name: string
  description: string,
  image: string,
  exp: number,
  skills: AchievedSkill[],
  credit: number,
  metadata?: Metadata
}
