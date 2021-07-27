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

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private utils: UtilsService) { }

  public async create(registration: RegistrationProfile) {
    let currentUser = await this.auth.currentUser;
    let currentTime = Date.now();
    // Prepare user data
    if (!currentUser) {
      throw "Unauthenticated"
    }
    let profile: UserProfile = {
      ...registration,
      uid: currentUser.uid,
      email: currentUser.email ?? "",
      photoUrl: currentUser.photoURL ?? "",
      roles: [],
      profileMetadata: {
        created: currentTime,
        updated: currentTime,
        actor: currentUser.email ?? ""
      },
      contribMetadata: {
        created: currentTime,
        updated: currentTime,
        actor: currentUser.email ?? ""
      }
    }
    let contribution: UserContribution = {
      uid: currentUser.uid,
      email: currentUser.email ?? "",
      credit: 0,
      skills: []
    }
    // Create data

    await this.db.collection("profiles").doc(currentUser.uid).set(profile);
    await this.db.collection("contributions").doc(currentUser.uid).set(contribution);
  }

  public async update(registration: RegistrationProfile) {
    let currentUser = await this.auth.currentUser;
    let currentTime = Date.now();
    // Prepare user data
    if (!currentUser) {
      throw "Unauthenticated"
    }
    let currentProfile = await this.db.collection("profiles").doc(currentUser.uid).get().toPromise();
    let updated: UserProfile = <UserProfile>currentProfile.data();
    updated = {
      ...updated,
      ...registration,
      photoUrl: currentUser.photoURL ?? "",
      profileMetadata: {
        updated: currentTime
      }
    };

    await this.db.collection("profiles").doc(currentUser.uid).update(updated);
  }

  public async updateProfile(profile: UserProfile) {
    await this.db.collection("profiles").doc(profile.uid).update({
      ...profile,
      profileMetadata: {
        updated: Date.now()
      }
    });
  }

  public async get(): Promise<UserProfile> {
    let currentUser = await this.auth.currentUser;
    if (!currentUser) {
      throw "Unauthenticated"
    }
    let profile = await this.db.collection("profiles").doc(currentUser.uid).get().toPromise();
    return <UserProfile>profile.data();
  }

  public getAll(): Observable<UserProfile[]> {
    return this.utils.getAll<UserProfile>("profiles");
  }

  public async isATC(): Promise<Boolean> {
    let currentUser = await this.auth.currentUser;
    if (!currentUser) {
      return false;
    }
    return (await this.db.collection("atc").doc(currentUser.uid).get().toPromise()).exists
  }

  public async isRegistrated(): Promise<Boolean> {
    let currentUser = await this.auth.currentUser;
    if (!currentUser) {
      throw "Unauthenticated"
    }
    return (await this.db.collection("profiles").doc(currentUser.uid).get().toPromise()).exists
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
