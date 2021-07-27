import { Component } from '@angular/core';
import { NbDialogService, NbMenuItem } from '@nebular/theme';
import { AchievementService } from './services/achievement.service';
import { AuthenticationService } from './services/authentication.service';
import { ContributionService } from './services/contribution.service';
import { ProfileService } from './services/profile.service';
import { RoleService } from './services/role.service';
import { UtilsService } from './services/utils.service';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RunwayCrew';

  menuItems: NbMenuItem[] = [
    {
      title: 'Profile của bạn',
      icon: 'file-text-outline',
      link: 'profile',
    },
    {
      title: 'Cộng đồng',
      icon: 'globe-outline',
      link: 'members',
    },
    {
      title: 'ATC Zone',
      icon: 'flash-outline',
      children: [
        {
          title: 'Quản lý Crew Member',
          icon: 'people-outline',
          link: 'atc/members',
        },
        {
          title: 'Quản lý các Vai trò',
          icon: 'briefcase-outline',
          link: 'atc/roles',
        },
        {
          title: 'Quản lý các Kỹ năng',
          icon: 'activity-outline',
          link: 'atc/skills',
        },
        {
          title: 'Quản lý các Thành tựu',
          icon: 'award-outline',
          link: 'atc/achievements',
        },
        {
          title: 'Xử lý phản hồi',
          icon: 'message-circle-outline',
          link: 'atc/feedbacks',
        },
      ],
    },
  ];
  constructor(
    private dialog: NbDialogService,
    private auth: AuthenticationService,
    private profileSv: ProfileService,
    private util: UtilsService,
    private roles: RoleService,
    private contribute: ContributionService,
    private achivement: AchievementService
  ) {
    console.log(localStorage.getItem('userId'));
  }
  async signInWithGG() {
    await this.auth.signInWithGoogle().then((data) => {
      console.log(data);
    });
    alert('Sign In successful');
  }
  openDialog() {
    this.dialog.open(FileUploadComponent);
  }
}
