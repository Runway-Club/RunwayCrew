import { Component, OnInit, Input } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution.service';
import { AchievedSkill } from 'src/models/achievement.model';
import { NbDialogService, NbSidebarService } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  feedbacks = ['Feedback 1', 'Feedback 2', 'Feedback 3'];
  @Input() skills!: AchievedSkill[];
  @Input() uid = '';
  public loadDone = false;
  constructor(
    public contributeSv: ContributionService,
    private sidebarService: NbSidebarService,
    private windowService: NbWindowService,
    private dialogService: NbDialogService
  ) {}
  ngOnInit(): void {}
  public async get() {
    this.skills = await (await this.contributeSv.get()).skills;
    // console.log(typeof (this.skills));
    this.loadDone = true;
  }
  toggle() {
    this.sidebarService.toggle(true, 'right');
  }
  openWindow() {
    this.windowService.open(FeedbackFormComponent, { title: `Window` });
  }
  openDialog() {
    this.dialogService.open(FeedbackDialogComponent, {});
  }
}
