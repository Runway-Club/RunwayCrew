import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import {
  RegistrationProfile,
  UserProfile,
} from 'src/models/user-profile.model';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  isUpdate: boolean = false;
  updateBtn: string = 'Update';
  currentUser: any;
  
  @Input() userProfile?: UserProfile;
  @Input()
  uid = '';

  constructor(
    private profileService: ProfileService,
    private toast: NbToastrService,
    private authService: AuthenticationService,
    private dialog: NbDialogService
  ) {}

  ngOnInit(): void {
    // setTimeout(async () => {
    //   this.currentUser =  this.authService.user?.uid;
    // }, 500);
    this.currentUser =  this.authService.user?.uid;
  }

  async onUpdate() {
    if (this.userProfile === undefined) {
      return;
    } else {
      if (this.updateBtn == 'Confirm') {
        await this.profileService.update(this.userProfile);
        this.toast.success(
          `Profile ${this.userProfile.email} đã cập nhật`,
          'Cập nhật hồ sơ'
        );
        this.isUpdate = !this.isUpdate;
        this.updateBtn = 'Update';
      }
    }
  }
  onEdit() {
    if (!this.checkEditPermission()) {
      this.toast.danger(
        `Bạn không có quyền chỉnh sửa hồ sơ của ${this.userProfile?.email}`,
        'Cập nhật hồ sơ'
      );
      return;
    }
    this.isUpdate = !this.isUpdate;
    this.updateBtn = 'Confirm';
  }
  onCancel() {
    this.isUpdate = !this.isUpdate;
    this.updateBtn = 'Update';
  }
  checkEditPermission() {
    if (this.currentUser == this.userProfile?.uid) {
      return true;
    }
    return false;
  }
  onSettings(userProfile: UserProfile) {
    // console.log(userProfile)
    let dialog = this.dialog.open(SettingsComponent, {
      context: {
        user: { ...userProfile },
      },
      hasBackdrop: true,
      backdropClass: 'blur',
      closeOnBackdropClick: true,
      closeOnEsc: true,
    });
  }

  sharingOpts = [
    {
      value: 'Everyone',
      description: 'Tất cả mọi người truy cập Runway-Crew',
      checked: false
    },
    {
      value: 'Member',
      description: 'Các thành viên nhưng chưa có vai trò',
      checked: false
    },
    {
      value: 'Core Member',
      description: 'Các thành viên đã có vai trò',
      checked: false
    },
    {
      value: 'Member and Core Member',
      description: 'Tất cả mọi người đã đăng nhập',
      checked: false
    }
  ];
  getMessDenied(value: string){
    for(let e of this.sharingOpts){
      if(e.value == value){
        return `Người dùng này chỉ cho phép "${e.value} (${e.description})" xem thông tin cá nhân của mình`
      }
    }
    return ''
  }
}
