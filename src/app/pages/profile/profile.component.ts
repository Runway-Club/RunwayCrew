import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    public authSv: AuthenticationService,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    console.log(this.auth.currentUser);
  }
}
