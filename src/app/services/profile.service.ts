import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegistrationProfile, UserContribution, UserProfile } from 'src/models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }

  public async createProfile(registration: RegistrationProfile) {
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

  public async updateProfile(registration: RegistrationProfile) {
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
      profileMetadata: {
        updated: currentTime
      }
    };

    await this.db.collection("profiles").doc(currentUser.uid).update(updated);
  }

}
