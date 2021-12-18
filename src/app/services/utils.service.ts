import { Injectable, Type } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public currentUser?: firebase.default.User;

  constructor(private auth: AngularFireAuth,
    private db: AngularFirestore,
    private HttpClient: HttpClient,
    private shareSer:ShareService) {
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
    await this.db.collection(collectionName).doc(data.id).set(data).then(res=>{
      this.shareSer.openSnackBar(`success!`);
    }).catch((err)=>{
      this.shareSer.openSnackBar(`fail to create`,false);
    });
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
    await this.db.collection(collectionName).doc(data.id).update(data).then(res=>{
      this.shareSer.openSnackBar(`update suscess!`);
    }).catch((err)=>{
      this.shareSer.openSnackBar(`fail to update`,false);
    });
  }

  public async delete(collectionName: string, id: string) {
    await this.db.collection(collectionName).doc(id).delete().then(res=>{
      this.shareSer.openSnackBar(`delete success!`,true);
    }).catch((err)=>{
      this.shareSer.openSnackBar(`fail to delete`,false);
    });
  }

}
