import { Component, Input, OnInit } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  @Input() listUser!: UserProfile[];
  @Input() commonSkill!: number[];
  public loadDone = false;
  constructor(private skillSv: SkillService) {}

  ngOnInit(): void {
    this.loadDone = true;
  }
}
