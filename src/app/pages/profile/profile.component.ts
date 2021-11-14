import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
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
  public uid = '';
  public userProfile!: UserProfile;
  public contribute!: UserContribution;
  public commonSkill!: number[];
  public loadDone = false;
  public progressBar: number = 0;
  constructor(
    public authSv: AuthenticationService,
    public auth: AngularFireAuth,
    public activatedRouter: ActivatedRoute,
    public contributeSv: ContributionService,
    private profileSv: ProfileService,
    private skillService: SkillService,
    private router: Router,
  ) {
  }
  ngOnInit(): void {
    setTimeout(async () => {
      await this.getProfile();
      await this.getContribute();
      await this.getCommonSkill();
      this.getProgressbar();
      this.loadDone = true;
    }, 1000);
    this.activatedRouter.queryParams.subscribe(async (queries) => {
      this.uid = queries['id'];
      this.auth.authState.subscribe(async (state) => {
        if (!state || state.isAnonymous) {
          if (this.uid == undefined) {
            this.router.navigate(['./home']);
          }
        } else {
          let registered = await this.profileSv.isRegistrated();
          if (!registered) {
            this.router.navigate(['./registration']);
          }
        }
      });
    });
  }
  isMobile() {
    if (window.innerWidth <= 600) {
      console.log(true);
      return true;
    }
    return false;
  }
  public async getProfile() {
    if (this.uid == undefined || this.uid == '' || this.uid == null) {
      let res = await this.profileSv.getUid(localStorage.getItem('userId') ?? '')
      this.uid = res._id
    }
    console.log(this.authSv.token)
    this.userProfile = await this.profileSv.get(this.uid, this.authSv.token);
    console.log(this.userProfile)
  }
  public async getContribute() {
    this.contribute = await this.contributeSv.getUID(this.userProfile.uid);
  }
  public async getCommonSkill() {
    this.commonSkill = (await this.skillService.get('614854c1a58a2a2a3c8e428b')).levels;
  }
  public getProgressbar() {
    let max = 0;
    for (let i = 0; i < this.commonSkill.length; i++) {
      if (this.contribute.exp < this.commonSkill[i]) {
        max = i;
        break;
      }
    }
    this.progressBar =
      ((this.contribute.exp - this.commonSkill[max - 1]) /
        (this.commonSkill[max] - this.commonSkill[max - 1])) *
      100;
  }
}
