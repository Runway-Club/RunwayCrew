import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router) { }
  ngOnInit(): void {
  }

  public async login() {
    let provider = new firebase.default.auth.GoogleAuthProvider();
    await this.auth.signInWithPopup(provider);
    this.router.navigate(["./profile"]);
  }

  

}
