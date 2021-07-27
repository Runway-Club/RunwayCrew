import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  selectedGender = '';
  isUpdate: boolean = false;
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

  userProfile: UserProfile[] = [];
  constructor(
    private profileService: ProfileService
  ) { }

  async ngOnInit() {
    this.userProfile.push(await this.profileService.get());
    console.log(this.userProfile);
  }

  async getProfile() {


  }

  onUpdate() {
    this.isUpdate = true;
    console.log(this.isUpdate)
  }
}
