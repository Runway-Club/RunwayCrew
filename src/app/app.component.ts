import { AfterViewInit, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  NbDialogService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbToastrService,
} from '@nebular/theme';
import { AchievementService } from './services/achievement.service';
import { ATCService } from './services/atc.service';
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
      link: './profile',
      query: { id: '' },
    },
    {
      type: 'menu',
      icon: 'public',
      name: 'Community',
      link: 'community',
    },
    // {
    //   type: 'menu',
    //   icon: 'store',
    //   name: 'Store',
    //   link: 'store'
    // }
  ];

  showSidemenu = false;
  selectedMenu = 0;

  uid = '';

  constructor(
    private dialog: NbDialogService,
    private auth: AuthenticationService,
    private atcService: ATCService,
    private sidebarService: NbSidebarService,
    private router: Router,
    private authService: AngularFireAuth
  ) {
    authService.onIdTokenChanged(async function (user) {
      if (user) {
        auth.token = await (await user.getIdTokenResult()).token
      }
    })
    authService.onAuthStateChanged(async function (user) {
      if (user) {
        auth.token = await (await user.getIdTokenResult()).token
      }
    });


    this.authService.authState.subscribe((state) => {
      if (state) {
        this.atcService.isATC().then((isAtc) => {
          if (isAtc) {
            this.menus.push({
              icon: 'admin_panel_settings',
              type: 'parent',
              name: 'ATC Zone',
              link: 'atc',
            });
          }
        });

        if (this.menus[0].name.toLowerCase() != 'profile') {
          this.menus.unshift({
            type: 'menu',
            icon: 'account_circle',
            name: 'Profile',
            link: './profile',
            query: { id: state.uid },
          });
        }
      } else {
        this.menus.shift();
      }


    });

  }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }
  userInfo: any;
  // async signInWithGG() {
  //   try {
  //     await this.auth.signInWithGoogle().then(async (data) => {
  //       this.userInfo = data;
  //     });
  //     this.toast.success(
  //       `Chào mừng ${this.userInfo.email} đến với Runway Crew`,
  //       'Đăng nhập thành công'
  //     );
  //   } catch (e) {
  //     this.toast.danger(`Thử đăng nhập lại nhé`, 'Đăng nhập thất bại');
  //   }
  // }
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
    if (this.menus[2].name.toLowerCase() == 'atc zone') {
      this.menus.pop();
    }
  }

  isMobile() {
    if (window.innerWidth <= 600) {
      // console.log(true);
      return true;
    }
    return false;
  }

  clickMenu(i: number) {
    // console.log(this.menus[i].link);
    this.selectedMenu = i;
  }
}
