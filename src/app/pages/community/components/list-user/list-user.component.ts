import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  public listUser?: UserProfile[];
  constructor(private profileSv: ProfileService) {}

  ngOnInit(): void {
    setTimeout(async () => {
      await this.getAllUser();
    }, 500);
  }
  public async getAllUser() {
    await this.profileSv.getAll().subscribe((user) => {
      this.listUser = user;
      console.log(this.listUser);
    });
  }
}
