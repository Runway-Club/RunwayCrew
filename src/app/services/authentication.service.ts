import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public user?: firebase.default.User;
  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      if (this.user == null && user != null) {
        this.user = user;
        localStorage.setItem('userId', user.uid);
      } else if (this.user != null) {
        console.log(`Hello + ${this.user.displayName}`);
        // this.cookieService.set('email', user?.email ?? "", { expires: 1 });
      }
    });
  }
  public async signInWithGoogle() {
    let provider = new firebase.default.auth.GoogleAuthProvider();
    return await this.auth.signInWithPopup(provider);
  }
  public async signOut() {
    return await this.auth.signOut().then(() => {
      localStorage.removeItem('userId');
    });
  }
}
