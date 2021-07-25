import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Skill } from 'src/models/skill.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private utils: UtilsService) { }

  public async get(id: string): Promise<Skill> {
    return this.utils.get<Skill>("skills", id);
  }

  public getAll(): Observable<Skill[]> {
    return this.utils.getAll<Skill>("skills");
  }

  public async create(skill: Skill) {
    await this.utils.create("skills", skill);
  }

  public async update(skill: Skill) {
    await this.utils.update("skills", skill);
  }

  public async delete(skillId: string) {
    await this.utils.delete("skills", skillId);
  }
}
