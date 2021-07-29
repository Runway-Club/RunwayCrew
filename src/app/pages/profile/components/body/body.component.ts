import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import {
  RegistrationProfile,
  UserProfile,
} from 'src/models/user-profile.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  isUpdate: boolean = true;
  updateBtn: string = 'Update';
  currentUser: any;
  @Input() userProfile?: UserProfile;

  @Input()
  uid = '';

  constructor(
    private profileService: ProfileService,
    private toast: NbToastrService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    setTimeout(async () => {
      this.currentUser = (await this.authService.user)?.uid;
      console.log(this.currentUser);
      console.log(this.uid);
    }, 500);
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
    if (this.currentUser != this.uid) {
      this.toast.danger(`Bạn không có quyền chỉnh sửa hồ sơ của ${this.userProfile?.email}`, "Cập nhật hồ sơ")
      return;
    }
    this.isUpdate = !this.isUpdate;
    this.updateBtn = 'Confirm';
  }
  onCancel() {
    this.isUpdate = !this.isUpdate;
    this.updateBtn = 'Update';
  }
}
