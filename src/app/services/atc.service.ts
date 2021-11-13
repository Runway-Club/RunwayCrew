import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
import { environment } from 'src/environments/environment.prod';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root',
})
export class ATCService {
  private currentUser?: firebase.default.User;
  constructor(
    private auth: AngularFireAuth,
    private HttpClient: HttpClient,
    private authService: AuthenticationService
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
          let atc = false;
          let checkAtc = await this.HttpClient.get(environment.endpoint + `atc/uid?uid=${state.uid}`).toPromise()
          if (checkAtc == null) {
            atc = false;
          } else {
            atc = true;
          }
          resolve(atc);
        }
      });
    });
  }

  public async addToATC(profile: UserProfile) {
    await this.HttpClient.post(environment.endpoint + 'atc', profile).toPromise().then(res => console.log(res));
  }

  public async removeFromATC(id: string) {
    await this.HttpClient.delete(environment.endpoint + 'atc' + `?id=${id}`, {
      observe: 'response',
      responseType: 'blob',
    }).toPromise();
  }

  public getATCMembers(token: string): Observable<UserProfile[]> {
    console.log({token:token})
    return this.HttpClient.get<UserProfile[]>(environment.endpoint + 'atc', {
      headers: new HttpHeaders()
        .set('Authorization', token)
    });
  }
}
