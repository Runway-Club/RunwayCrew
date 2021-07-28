import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContributionService } from 'src/app/services/contribution.service';
import { UserContribution } from 'src/models/user-profile.model';

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
  contributionInfo: UserContribution | undefined;

  constructor(
    private authService: AuthenticationService,
    private auth: AngularFireAuth,
    private contributionService: ContributionService
  ) { }

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.usr = user;
    });
    setTimeout(async () => {
      await this.getContributions();
    }, 500)
    // this.usr = this.authService.user;
    // console.log(this.usr)

  }

  async getContributions() {
    this.contributionInfo = await this.contributionService.get();
  }
}
