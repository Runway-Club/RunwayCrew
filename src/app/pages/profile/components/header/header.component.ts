import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContributionService } from 'src/app/services/contribution.service';
import { SkillService } from 'src/app/services/skill.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserContribution, UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() user!: UserProfile;
  @Input() contribute!: UserContribution;
  @Input() commonSkill!: number[];
  @Input()
  uid = '';
  public level: any = 0;
  loadDone = false;

  constructor() {}
  ngOnInit() {
    this.checkLevel();
  }
  public checkLevel() {
    for (let i = 0; i < this.commonSkill.length; i++) {
      if (this.contribute.exp >= this.commonSkill[i]) {
        this.level = i + 1;
      }
    }
    if (this.level == 0) {
      this.level = 1;
    }
    this.loadDone = true;
  }
}
