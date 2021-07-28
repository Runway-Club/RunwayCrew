import { AchievedSkill, Achievement } from "./achievement.model";
import { Metadata } from "./metadata.model";
import { Role } from "./role.model";

export interface RegistrationProfile {
  name: string,
  dob: number,
  gender: string,
  phoneNumber: string,
  address: string,
  selectedRoles: string[],
  facebook?: string,
  linkIn?: string,
  email: string
}
export interface UserProfile extends RegistrationProfile {
  uid: string,
  email: string,
  photoUrl: string,
  name: string,
  roles: Role[],
  profileMetadata?: Metadata,
  contribMetadata?: Metadata
}

export interface UserContribution {
  uid: string,
  email: string,
  credit: number,
  exp: number,
  skills: AchievedSkill[],
  achievements?: Achievement[],
}
