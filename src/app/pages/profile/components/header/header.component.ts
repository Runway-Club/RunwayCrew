import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  exp: number = 0;
  avgas: number = 1028;
  rank: string = 'S';
  usr: any = null;
  constructor(
    private authService: AuthenticationService,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.usr = user;
    });
    // this.usr = this.authService.user;
    // console.log(this.usr)
  }

}
