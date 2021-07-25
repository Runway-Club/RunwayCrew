import { AchievedSkill, Achievement } from "./achievement.model";
import { Metadata } from "./metadata.model";

export interface UserProfile {
  uid: string,
  email: string,
  photoUrl: string,
  name: string,
  dob: number,
  gender: string,
  phoneNumber: string,
  address: string,
  profileMetadata: Metadata,
  contribMetadata: Metadata
}

export interface UserContribution {
  uid: string,
  email: string,
  credit: number,
  skills: AchievedSkill[],
  achievements: Achievement[],
}
