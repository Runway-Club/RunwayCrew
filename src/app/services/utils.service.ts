import { Injectable, Type } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public currentUser?: firebase.default.User;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private HttpClient:HttpClient) {
    this.auth.authState.subscribe((state) => {
      if (state != null) {
        this.currentUser = state;
      }
    });
  }

  public getAll<T>(collectionName: string): Observable<T[]> {
    return this.db.collection(collectionName).get()
      .pipe(map((doc) => <T[]>(doc.docs.map((d) => <T>d.data()))));
  }

  public async get<T>(collectionName: string, id: string): Promise<T> {
    return <T>(await this.db.collection(collectionName).doc(id).get().toPromise()).data();
  }

  public async create(collectionName: string, data: any) {
    let user = this.currentUser;
    if (!user) {
      throw "Unauthenticated";
    }
    let current = Date.now();
    data.metadata = {
      actor: user.email,
      created: current,
      updated: current
    };
    await this.db.collection(collectionName).doc(data.id).set(data);
  }
  public async update(collectionName: string, data: any) {
    let user = this.currentUser;
    if (!user) {
      throw "Unauthenticated";
    }
    data.metadata = {
      ...data.metadata,
      actor: user.email,
      updated: Date.now()
    }
    await this.db.collection(collectionName).doc(data.id).update(data);
  }

  public async delete(collectionName: string, id: string) {
    await this.db.collection(collectionName).doc(id).delete();
  }

}
