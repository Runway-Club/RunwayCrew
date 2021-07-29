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

  public menus = [
    {
      type: 'menu',
      icon: 'account_circle',
      name: 'Profile',
      link: 'profile'
    },
    {
      type: 'menu',
      icon: 'public',
      name: 'Community',
      link: 'community'
    },
    {
      type: 'menu',
      icon: 'store',
      name: 'Store',
      link: 'store'
    }

  ]

  showSidemenu = false;
  selectedMenu = 0;

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
        this.menus.push({
          icon: 'admin_panel_settings',
          type: 'parent',
          name: 'ATC Zone',
          link: 'atc'
        });
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
  async logout() {
    await this.auth.signOut();
    this.userInfo = null;
    this.router.navigate(['home']);
  }
}
