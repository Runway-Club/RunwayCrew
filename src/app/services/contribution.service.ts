import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Achievement } from 'src/models/achievement.model';
import { UserContribution } from 'src/models/user-profile.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  private currentUser?: firebase.default.User;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private HttpClient:HttpClient,
    private shareSer:ShareService
    ) {
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
    // let contrib: UserContribution = <UserContribution>await (await this.db.collection("contributions").doc(uid).get().toPromise()).data();
    let contrib = await this.HttpClient.get<UserContribution>(environment.endpoint + `contri?id=${uid}`).toPromise()
    console.log(contrib)
    return contrib;
  }

  public async getUID(uid?: string){
    if (!uid) {
      let currentUser = this.currentUser;
      uid = currentUser?.uid;
    }
    let contrib = await this.HttpClient.get<UserContribution>(environment.endpoint + `contri/uid?uid=${uid}`).toPromise()
    return contrib;
  }

  public async provide(achievement: Achievement, uid: string, skip?: boolean) {
    let admin = this.currentUser;
    if (!admin) {
      throw "Unauthenticated"
    }
    let contrib = await this.HttpClient.get<UserContribution>(environment.endpoint + `contri/uid?uid=${uid}`).toPromise()
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
    await this.HttpClient.put(environment.endpoint + 'contri', contrib).toPromise().then(res=>{
      this.shareSer.openSnackBar("successfully update!");
    }).catch((err)=>{
      this.shareSer.openSnackBar("failed to update!","close",{
        horizontalPosition: 'end', verticalPosition: 'bottom',
        duration: 1 * 2000,
        panelClass: ['red-snackbar']
      });

    })
    await this.HttpClient.get(environment.endpoint + `profile/uid?uid=${uid}`).subscribe(async (res:any)=>{
      const body = {
        ...res[0],
        profileMetadata: { updated: Date.now() }
      }
      await this.HttpClient.put(environment.endpoint + `profile`, body).toPromise().then(res=>{
        this.shareSer.openSnackBar("successfully update!");
    }).catch((err)=>{
      this.shareSer.openSnackBar("failed to update!","close",{
        horizontalPosition: 'end', verticalPosition: 'bottom',
        duration: 1 * 2000,
        panelClass: ['red-snackbar']
      });
      })
    })
    // await this.db.collection("contributions").doc(uid).update(contrib);
    // await this.db.collection("profiles").doc(uid).update({ profileMetadata: { updated: Date.now() } });
  }
  public getAllContri(): Observable<UserContribution[]>{
    return this.HttpClient.get<UserContribution[]>(environment.endpoint + 'contri');
  }
}
