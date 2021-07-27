import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { RegistrationProfile, UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  isUpdate: boolean = true;
  updateBtn: string = 'Update';
  userProfile: UserProfile | undefined;

  // email?: string = this.userProfile?.email;
  // name?: string = this.userProfile?.name;
  // address?: string = this.userProfile?.address;
  // gender?: string = this.userProfile?.gender;
  // dob?: number = this.userProfile?.dob;
  // phoneNumber?: string = this.userProfile?.phoneNumber;
  // selectedRoles?: Array<string> = this.userProfile?.selectedRoles;
  // facebook?: string = this.userProfile?.facebook;
  // linkIn?: string = this.userProfile?.linkIn;


  roles = [
    {
      name: 'Runway ATC',
      description: 'Điều hành và kiểm soát sự hoạt động',
      image: 'https://cdn.iconscout.com/icon/free/png-512/achievement-1589036-1347675.png'
    },
    {
      name: 'Runway Developers',
      description: 'Tham gia các dự án Open Source của dự án',
      image: 'https://cdn.iconscout.com/icon/free/png-512/achievement-1589036-1347675.png',
    },
    {
      name: 'Runway Lightning',
      description: '',
      image: 'https://cdn.iconscout.com/icon/free/png-512/achievement-1589036-1347675.png',
    },
    {
      name: 'Runway Threshold',
      description: '',
      image: 'https://cdn.iconscout.com/icon/free/png-512/achievement-1589036-1347675.png',
    }
  ]


  // selectedGender: string = '';
  constructor(
    private profileService: ProfileService
  ) { }

  async ngOnInit() {
    setTimeout(async () => {
      await this.getProfile();
    }, 500);
  }

  async getProfile() {
    this.userProfile = await this.profileService.get();
    console.log(this.userProfile);

  }

  onUpdate() {
    this.isUpdate = false;
    this.updateBtn = "Confirm"
    console.log(this.userProfile)
  }
}
