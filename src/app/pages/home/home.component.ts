import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.testCallServer()
  }

  public async login() {
    let provider = new firebase.default.auth.GoogleAuthProvider();
    await this.auth.signInWithPopup(provider);
    this.router.navigate(["./profile"]);
  }

  async testCallServer(){
    let res = await this.http.get('http://localhost:8080/atc').toPromise();
    console.log(res);
  }

}
