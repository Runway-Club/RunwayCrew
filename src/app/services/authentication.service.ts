import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment.prod';
import * as firebase from 'firebase';
import { HttpHeaders } from '@angular/common/http';
import { ShareService } from './share.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public user?: firebase.default.User;
  public token = '';

  constructor(
    private auth: AngularFireAuth,
    private httpClient: HttpClient,
    private shareSher:ShareService
  ) {
    this.auth.authState.subscribe((user) => {
      if (user != null) {
        this.user = user;
        localStorage.setItem('userId', user.uid);
      }
    });
    this.auth.idToken.subscribe((value) => {
      this.token = value ?? ''
    })
  }
  // public async signInWithGoogle() {
  //   let provider = new firebase.default.auth.GoogleAuthProvider();
  //   return await this.auth.signInWithPopup(provider);
  // }
  public async signOut() {
    return await this.auth.signOut().then(() => {
      localStorage.removeItem('userId');
      this.token = ''
      this.shareSher.openSnackBar("Susscess fully logout!");
    });
  }
  public async login(uid: string) {
    await this.httpClient.post(environment.endpoint + `user/login`, { uid: uid }, { observe: 'response' }).toPromise().then(()=>{
      this.shareSher.openSnackBar("Susscess fully login!");
    })
  }
}
