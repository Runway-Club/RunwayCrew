import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Achievement } from 'src/models/achievement.model';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }

  public async get(id: string): Promise<Achievement> {
    return <Achievement>(await this.db.collection("achievements").doc(id).get().toPromise()).data();
  }

  public async getAll(): Promise<Achievement[]> {
    return <Achievement[]>(await this.db.collection("achievements").get().toPromise()).docs.map((d) => d.data());
  }

  public async create(achievement: Achievement) {
    let admin = await this.auth.currentUser;
    if (!admin) {
      throw "Unauthenticated"
    }
    achievement.metadata = {
      actor: admin.email ?? "",
      created: Date.now(),
      updated: Date.now()
    };
    await this.db.collection("achievements").doc(achievement.id).set(achievement);
  }

  public async update(achievement: Achievement) {
    let admin = await this.auth.currentUser;
    if (!admin) {
      throw "Unauthenticated"
    }
    await this.db.collection("achievements").doc(achievement.id).update({
      ...achievement,
      metadata: {
        actor: admin.email ?? "",
        updated: Date.now()
      }
    });
  }

  public async delete(achievementId: string) {
    await this.db.collection("achievements").doc(achievementId).delete();
  }
}
