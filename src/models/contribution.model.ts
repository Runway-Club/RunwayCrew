import { AchievedSkill, Achievement } from "./achievement.model";
import { Skill } from "./skill.model";

export interface Contribution {
    _id:string,
    achievements: Array<Achievement>,
    credit:number,
    email:string,
    exp:number,
    skills: AchievedSkill[],
    uid:string
}