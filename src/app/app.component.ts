import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbMenuItem, NbMenuService, NbSidebarService, NbToastrService } from '@nebular/theme';
import { AchievementService } from './services/achievement.service';
import { AuthenticationService } from './services/authentication.service';
import { ProfileService } from './services/profile.service';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'RunwayCrew';

  atcMenu = {
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
    private profileService: ProfileService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private toast: NbToastrService
  ) {
    setTimeout(() => {

    }, 500);
    this.profileService.isATC().then((isAtc) => {
      if (isAtc) {
        this.menuItems.push(this.atcMenu);
      }
    });
  }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }
  userInfo: any;
  async signInWithGG() {
    try {
      await this.auth.signInWithGoogle().then((data) => {
        this.userInfo = data
        console.log(this.userInfo);
      });
      this.toast.success(`Chào mừng ${this.userInfo.email} đến với Runway Crew`, "Đăng nhập thành công")
    } catch (e) {
      this.toast.danger(`Thử đăng nhập lại nhé`, "Đăng nhập thất bại")
    }

  }
  openDialog() {
    this.dialog.open(FileUploadComponent);
  }

  toggleSidebar() {
    this.sidebarService.toggle(false, 'mainSidebar');
  }
  async onLogout() {
    await this.auth.signOut();
    this.userInfo = null;
    this.router.navigate(['home']);
  }
}
