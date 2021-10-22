import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Skill } from 'src/models/skill.model';
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private utils: UtilsService, private HttpClient: HttpClient) { }

  public async get(id: string): Promise<Skill> {
    // return this.utils.get<Skill>("skills", id);
    return this.HttpClient.get<Skill>(environment.endpoint+`skill?id=${id}`).toPromise();
  }

  public async getSkillId(id: string): Promise<Skill> {
    // return this.utils.get<Skill>("skills", id);
    return this.HttpClient.get<Skill>(environment.endpoint+`skill/id?skillId=${id}`).toPromise();
  }

  public getAll(): Observable<Skill[]> {
    // return this.utils.getAll<Skill>("skills");
    return this.HttpClient.get<Skill[]>(environment.endpoint + 'skill');
  }

  public async create(skill: Skill) {
    // await this.utils.create("skills", skill);
    let user = this.utils.currentUser;
    if (!user) {
      throw "Unauthenticated";
    }
    let current = Date.now();
    let body = {
      ...skill,
      metadata : {
        actor: user.email,
        created: current,
        updated: current
      }
    }
    await this.HttpClient.post(environment.endpoint + 'skill', body).toPromise().then(res=>console.log(res));
  }

  public async update(skill: Skill) {
    // await this.utils.update("skills", skill);
    let user = this.utils.currentUser;
    if (!user) {
      throw "Unauthenticated";
    }
    let body = {
      ...skill,
      metadata : {
        ...skill.metadata,
        actor: user.email,
        updated: Date.now()
      }
    }
    await this.HttpClient.put(environment.endpoint + 'skill', body).toPromise().then(res=>console.log(res));
  }

  public async delete(skillId: string) {
    // await this.utils.delete("skills", skillId);
    await this.HttpClient.delete(environment.endpoint + 'skill' +`?id=${skillId}`,{
      observe: 'response',
      responseType: 'blob',
    }).toPromise();
  }
}
