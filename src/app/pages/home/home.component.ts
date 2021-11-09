import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router, private authenticationService:AuthenticationService) { }
  ngOnInit(): void {
    
  }

  public async login() {
    let provider = new firebase.default.auth.GoogleAuthProvider();
    await this.auth.signInWithPopup(provider).then(res=>{
      if(res.user){
        this.authenticationService.login(res.user.uid)
      }
    });
    this.router.navigate(["./profile"]);
  }
}
