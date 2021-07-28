import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContributionService } from 'src/app/services/contribution.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserContribution, UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usr?: UserProfile;
  contributionInfo: UserContribution | undefined;
  loadDone = false;

  @Input()
  uid = "";

  constructor(
    private authService: AuthenticationService,
    private auth: AngularFireAuth,
    private contributionService: ContributionService,
    private profile: ProfileService
  ) { }

  ngOnInit() {
    setTimeout(async () => {
      await this.getContributions();
      this.usr = await this.profile.get(this.uid);
      this.loadDone = true;
    }, 500);
  }

  async getContributions() {
    this.contributionInfo = await this.contributionService.get(this.uid == "" ? undefined : this.uid);
  }
}
