import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RegistrationProfile, UserContribution, UserProfile } from 'src/models/user-profile.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private currentUser?: firebase.default.User;
  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private utils: UtilsService) {
    this.auth.authState.subscribe((state) => {
      if (state != null) {
        this.currentUser = state;
      }
    });
  }

  public async create(registration: RegistrationProfile) {

    let currentTime = Date.now();
    // Prepare user data
    if (!this.currentUser) {
      throw "Unauthenticated"
    }
    let profile: UserProfile = {
      ...registration,
      uid: this.currentUser.uid,
      email: this.currentUser.email ?? "",
      photoUrl: this.currentUser.photoURL ?? "",
      roles: [],
      profileMetadata: {
        created: currentTime,
        updated: currentTime,
        actor: this.currentUser.email ?? ""
      },
      contribMetadata: {
        created: currentTime,
        updated: currentTime,
        actor: this.currentUser.email ?? ""
      }
    }
    let contribution: UserContribution = {
      uid: this.currentUser.uid,
      email: this.currentUser.email ?? "",
      credit: 0,
      exp: 0,
      skills: []
    }
    // Create data

    await this.db.collection("profiles").doc(this.currentUser.uid).set(profile);
    await this.db.collection("contributions").doc(this.currentUser.uid).set(contribution);
  }

  public async update(registration: RegistrationProfile) {

    let currentTime = Date.now();
    // Prepare user data
    if (!this.currentUser) {
      throw "Unauthenticated"
    }
    let currentProfile = await this.db.collection("profiles").doc(this.currentUser.uid).get().toPromise();
    let updated: UserProfile = <UserProfile>currentProfile.data();
    updated = {
      ...updated,
      ...registration,
      photoUrl: this.currentUser.photoURL ?? "",
      profileMetadata: {
        updated: currentTime
      }
    };

    await this.db.collection("profiles").doc(this.currentUser.uid).update(updated);
  }

  public async updateProfile(profile: UserProfile) {
    await this.db.collection("profiles").doc(profile.uid).update({
      ...profile,
      profileMetadata: {
        ...profile.profileMetadata,
        updated: Date.now()
      }
    });
  }

  public async get(): Promise<UserProfile> {

    if (!this.currentUser) {
      throw "Unauthenticated"
    }
    let profile = await this.db.collection("profiles").doc(this.currentUser.uid).get().toPromise();
    return <UserProfile>profile.data();
  }

  public getAll(): Observable<UserProfile[]> {
    return this.utils.getAll<UserProfile>("profiles");
  }

  public async isATC(): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.authState.subscribe(async (state) => {
        if (state) {
          this.currentUser = state;
          let atc = (await this.db.collection("atc").doc(this.currentUser.uid).get().toPromise()).exists;
          resolve(atc);
        }
      });
    })
  }

  public async isRegistrated(): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.authState.subscribe(async (state) => {
        if (state) {
          this.currentUser = state;
          let registrated = await (await (this.db.collection("profiles").doc(this.currentUser.uid).get().toPromise())).exists;
          resolve(registrated);
        }
      });
    })
  }

  public async addToATC(profile: UserProfile) {
    await this.db.collection("atc").doc(profile.uid).set(profile);
  }

  public async removeFromATC(id: string) {
    await this.db.collection("atc").doc(id).delete();
  }

  public getATCMembers(): Observable<UserProfile[]> {
    return this.utils.getAll("atc");
  }

}
