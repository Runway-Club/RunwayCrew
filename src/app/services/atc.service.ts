import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  RegistrationProfile,
  UserContribution,
  UserProfile,
} from 'src/models/user-profile.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class ATCService {
  private currentUser?: firebase.default.User;
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utils: UtilsService
  ) {
    this.auth.authState.subscribe((state) => {
      if (state != null) {
        this.currentUser = state;
      }
    });
  }

  public async isATC(): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.authState.subscribe(async (state) => {
        if (state) {
          this.currentUser = state;
          let atc = (
            await this.db
              .collection('atc')
              .doc(this.currentUser.uid)
              .get()
              .toPromise()
          ).exists;
          resolve(atc);
        }
      });
    });
  }

  public async addToATC(profile: UserProfile) {
    await this.db.collection('atc').doc(profile.uid).set(profile);
  }

  public async removeFromATC(id: string) {
    await this.db.collection('atc').doc(id).delete();
  }

  public getATCMembers(): Observable<UserProfile[]> {
    return this.utils.getAll('atc');
  }
}
