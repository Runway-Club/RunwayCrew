import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
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
  @Input() userProfile?: UserProfile;

  @Input()
  uid = '';

  roles = [
    {
      name: 'Runway ATC',
      description: 'Điều hành và kiểm soát sự hoạt động',
      image:
        'https://cdn.iconscout.com/icon/free/png-512/achievement-1589036-1347675.png',
    },
    {
      name: 'Runway Developers',
      description: 'Tham gia các dự án Open Source của dự án',
      image:
        'https://cdn.iconscout.com/icon/free/png-512/achievement-1589036-1347675.png',
    },
    {
      name: 'Runway Lightning',
      description: '',
      image:
        'https://cdn.iconscout.com/icon/free/png-512/achievement-1589036-1347675.png',
    },
    {
      name: 'Runway Threshold',
      description: '',
      image:
        'https://cdn.iconscout.com/icon/free/png-512/achievement-1589036-1347675.png',
    },
  ];

  constructor(
    private profileService: ProfileService,
    private toast: NbToastrService
  ) {}

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
    this.isUpdate = false;
    this.updateBtn = 'Confirm';
  }
}
