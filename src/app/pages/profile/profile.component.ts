import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContributionService } from 'src/app/services/contribution.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserContribution, UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public uid = 'sfWSG7FX8bSUMIsVqKomeynutVe2';
  public userProfile!: UserProfile;
  public contribute!: UserContribution;
  public commonSkill!: number[];
  public loadDone = false;
  constructor(
    public authSv: AuthenticationService,
    public auth: AngularFireAuth,
    public activatedRouter: ActivatedRoute,
    public contributeSv: ContributionService,
    private profileSv: ProfileService,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    setTimeout(async () => {
      await this.getProfile();
      await this.getContribute();
      await this.getCommonSkill();
      this.loadDone = true;
    }, 0);
    this.activatedRouter.queryParams.subscribe(
      (queries) => (this.uid = queries['id'])
    );
  }
  isMobile() {
    if (window.innerWidth <= 600) {
      console.log(true);
      return true;
    }
    return false;
  }
  public async getProfile() {
    this.userProfile = await this.profileSv.get(this.uid);
  }
  public async getContribute() {
    this.contribute = await this.contributeSv.get(this.uid);
  }
  public async getCommonSkill() {
    this.commonSkill = (await this.skillService.get('common')).levels;
  }
}
