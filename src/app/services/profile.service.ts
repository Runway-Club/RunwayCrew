import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { environment } from '../../environments/environment.prod'
import { Observable } from 'rxjs';
import {
  RegistrationProfile,
  UserContribution,
  UserProfile,
} from 'src/models/user-profile.model';
import { UtilsService } from './utils.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Collection } from 'mongoose';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private currentUser?: firebase.default.User;
  constructor(
    private httpClient: HttpClient,
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
  public async get(id: string): Promise<ProfileService> {
    return this.httpClient.get<ProfileService>(environment.endpoint + `Profile`).toPromise();
  }
  public getAll(): Observable<ProfileService[]> {
    return this.httpClient.get<ProfileService[]>(environment.endpoint + "Profile");
  }
  public async update(registration: RegistrationProfile) {
    let currentTime = Date.now();
    // Prepare user data
    if (!this.currentUser) {
      throw 'Unauthenticated';
    }
    let currentProfile = await this.db
      .collection('profiles')
      .doc(this.currentUser.uid)
      .get()
      .toPromise();
    let updated: UserProfile = <UserProfile>currentProfile.data();
    updated = {
      ...updated,
      ...registration,
      photoUrl: this.currentUser.photoURL ?? '',
      profileMetadata: {
        updated: currentTime,
      },
    };

    await this.db
      .collection('profiles')
      .doc(this.currentUser.uid)
      .update(updated);
  }

  public async create(registration: RegistrationProfile) {
    let currentTime = Date.now();
    // Prepare user data
    if (!this.currentUser) {
      throw 'Unauthenticated';
    }
    let profile: UserProfile = {
      ...registration,
      uid: this.currentUser.uid,
      email: this.currentUser.email ?? '',
      photoUrl: this.currentUser.photoURL ?? '',
      roles: [],
      profileMetadata: {
        created: currentTime,
        updated: currentTime,
        actor: this.currentUser.email ?? '',
      },
      contribMetadata: {
        created: currentTime,
        updated: currentTime,
        actor: this.currentUser.email ?? '',
      },
    };
    let contribution: UserContribution = {
      _id: '',
      uid: this.currentUser.uid,
      email: this.currentUser.email ?? '',
      credit: 0,
      skills: [],
      exp: 0,
    };
    // Create data
    //await this.httpClient.put(environment.endpoint, Observable<ProfileService>)

    // await this.db.collection('profiles').doc(this.currentUser.uid).set(profile);
    // await this.db
    //   .collection('contributions')
    //   .doc(this.currentUser.uid)
    //   .set(contribution);
  }

  

  public async updateProfile(profile: UserProfile) {
    console.log(profile);
    // await this.httpClient.put(environment.endpoint,   )
    // await this.db
    //   .collection('profiles')
    //   .doc(profile.uid)
    //   .update({
    //     ...profile,
    //     profileMetadata: {
    //       ...profile.profileMetadata,
    //       updated: Date.now(),
    //     },
    //   });
  }

  

  

  public async isRegistrated(): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.authState.subscribe(async (state) => {
        if (state) {
          this.currentUser = state;
          let registrated = await (
            await this.db
              .collection('profiles')
              .doc(this.currentUser.uid)
              .get()
              .toPromise()
          ).exists;
          resolve(registrated);
        }
      });
    });
  }

  public async getPaginate(size: number, roleId?: string, last?: UserProfile): Promise<UserProfile[]> {
    let query: Query<any> = this.db.collection("profiles").ref;
    if (roleId) {
      query = query.where("roles", 'array-contains', roleId);
    }
    return (await query
      .limit(size)
      .orderBy("profileMetadata.updated")
      .get()).docs.map((d) => <UserProfile>d.data())
  }

}
