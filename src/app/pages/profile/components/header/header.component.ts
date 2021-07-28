import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContributionService } from 'src/app/services/contribution.service';
import { UserContribution } from 'src/models/user-profile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usr: any = null;
  contributionInfo: UserContribution | undefined;
  loadDone = false;
  constructor(
    private authService: AuthenticationService,
    private auth: AngularFireAuth,
    private contributionService: ContributionService
  ) { }

  ngOnInit() {
    setTimeout(async () => {
      await this.getContributions();
      this.usr = await this.authService.user;
      this.loadDone = true;
    }, 500);
  }

  async getContributions() {
    this.contributionInfo = await this.contributionService.get();
  }
}
