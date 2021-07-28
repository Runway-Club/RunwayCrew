import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public uid = "";

  constructor(
    public authSv: AuthenticationService,
    public auth: AngularFireAuth,
    public activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((queries) => this.uid = queries['id']);
  }
}
