import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Achievement } from 'src/models/achievement.model';
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod'
import { map } from 'rxjs/operators';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  constructor(private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utils: UtilsService,
    private HttpClient: HttpClient,
    private shareSer:ShareService
  ) { }

  public async get(id: string): Promise<Achievement> {
    // return this.utils.get("achievements", id);
    return this.HttpClient.get<Achievement>(environment.endpoint + 'achievements').toPromise();
  }

  public getAll(): Observable<Achievement[]> {
    // return this.utils.getAll<Achievement>("achievements");
    return this.HttpClient
      .get<Achievement[]>(environment.endpoint + 'achievements');
  }

  public getSearch(searchKey: string): Observable<Achievement[]> {
    return this.HttpClient
    .get<Achievement[]>(environment.endpoint + `achievements/search?searchKey=${searchKey}`);
  }

  public async create(achievement: Achievement) {
    // await this.utils.create("achievements", achievement);
    let user = this.utils.currentUser;
    if (!user) {
      throw "Unauthenticated";
    }
    let current = Date.now();
    let body = {
      ...achievement,
      metadata: {
        actor: user.email,
        created: current,
        updated: current
      }
    }
    console.log(body)

      await this.HttpClient.post(environment.endpoint + 'achievements', body).toPromise().then(res => {
        console.log(res);
        this.shareSer.openSnackBar("successfully create achievement!");
      }).catch((err)=>{
        this.shareSer.openSnackBar("failed to create achievement!",false);
      });

  }

  public async update(achievement: Achievement) {
    // await this.utils.update("achievements", achievement);
    let user = this.utils.currentUser;
    if (!user) {
      throw "Unauthenticated";
    }
    let body = {
      ...achievement,
      metadata: {
        ...achievement.metadata,
        actor: user.email,
        updated: Date.now()
      }
    }
    console.log(body)
    await this.HttpClient.put(environment.endpoint + 'achievements', body).toPromise().then(res => {console.log(res)
      this.shareSer.openSnackBar("successfully update achievement!");
    }).catch((err)=>{
      this.shareSer.openSnackBar("failed to update achievement!",false);
    });
  }

  public async delete(achievementId: string) {
    // await this.utils.delete("achievements", achievementId);
    await this.HttpClient.delete(environment.endpoint + 'achievements' + `?id=${achievementId}`, {
      observe: 'response',
      responseType: 'blob',
    }).toPromise().then(res=>{
      this.shareSer.openSnackBar("successfully delete achievement!");
    }).catch((err)=>{
      this.shareSer.openSnackBar("failed to delete achievement!",false);
    });
  }

  public async getPaginate(after: number, size: number) {
    return await this.db.collection("achievements").ref
      .orderBy("metadata.created", "desc")
      .startAfter(after)
      .limit(size)
      .get();
  }

}
