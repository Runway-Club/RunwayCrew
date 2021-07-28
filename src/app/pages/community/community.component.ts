import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  public data!: UserProfile[];
  constructor(private profileSv: ProfileService) {}

  ngOnInit(): void {
    setTimeout(async () => {
      await this.getAllUser();
    }, 500);
  }
  public async getAllUser() {
    await this.profileSv.getAll().subscribe(async (user) => {
      this.data = user;
      console.log(this.data);
    });
  }
}
