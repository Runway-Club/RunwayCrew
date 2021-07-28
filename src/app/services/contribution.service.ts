import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Achievement } from 'src/models/achievement.model';
import { UserContribution } from 'src/models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  private currentUser?: firebase.default.User;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.auth.authState.subscribe((state) => {
      if (state != null) {
        this.currentUser = state;
      }
    });
  }

  public async get(uid?: string): Promise<UserContribution> {
    if (!uid) {
      let currentUser = this.currentUser;
      uid = currentUser?.uid;
    }
    let contrib: UserContribution = <UserContribution>await (await this.db.collection("contributions").doc(uid).get().toPromise()).data();
    return contrib;
  }

  public async provide(achievement: Achievement, uid: string, skip?: boolean) {
    let admin = this.currentUser;
    if (!admin) {
      throw "Unauthenticated"
    }
    let contrib = await this.get(uid);
    for (let skill of achievement.skills) {
      let i = contrib.skills.findIndex((s) => s.skillId == skill.skillId);
      if (i == -1) {
        contrib.skills.push(skill);
      }
      else {
        contrib.skills[i].exp += skill.exp;
      }
    }
    contrib.credit += achievement.credit;
    achievement.metadata = {
      ...achievement.metadata,
      actor: admin?.email ?? "",
      created: Date.now(),
    };
    if (!skip) {
      if (!contrib.achievements) {
        contrib.achievements = [];
      }
      contrib.achievements?.push(achievement);
      contrib.exp += achievement.exp;
    }
    await this.db.collection("contributions").doc(uid).update(contrib);
    await this.db.collection("profiles").doc(uid).update({ profileMetadata: { updated: Date.now() } });
  }
}
