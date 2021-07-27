import { Component } from '@angular/core';
import { NbDialogService, NbMenuItem } from '@nebular/theme';
import { AchievementService } from './services/achievement.service';
import { AuthenticationService } from './services/authentication.service';
import { ProfileService } from './services/profile.service';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RunwayCrew';

  atcMenu = {
    title: 'ATC Zone',
    icon: 'flash-outline',
    children: [
      {
        title: 'Quản lý Crew Member',
        icon: 'people-outline',
        link: 'atc/members'
      },
      {
        title: "Quản lý các Vai trò",
        icon: 'briefcase-outline',
        link: 'atc/roles'
      },
      {
        title: 'Quản lý các Kỹ năng',
        icon: 'activity-outline',
        link: 'atc/skills'
      },
      {
        title: 'Quản lý các Thành tựu',
        icon: 'award-outline',
        link: 'atc/achievements'
      },
      {
        title: 'Xử lý phản hồi',
        icon: 'message-circle-outline',
        link: 'atc/feedbacks'
      },
    ],
  };

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
  ];
  constructor(
    private dialog: NbDialogService,
    private auth: AuthenticationService,
    private profileService: ProfileService
  ) {
    setTimeout(() => {
      console.log(this.auth.user);
    }, 2000);
    this.profileService.isATC().then((isAtc) => {
      if (isAtc) {
        this.menuItems.push(this.atcMenu);
      }
    })
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
