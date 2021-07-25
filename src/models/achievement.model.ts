import { Metadata } from "./metadata.model";

export interface AchievedSkill {
  skillId: string,
  exp: number
}

export interface Achievement {
  id: string,
  name: string,
  title: string,
  exp: number,
  skills: AchievedSkill[],
  credit: number,
  metadata: Metadata
}
