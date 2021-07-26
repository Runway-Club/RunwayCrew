import { Component } from '@angular/core';
import { NbDialogService, NbMenuItem } from '@nebular/theme';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RunwayCrew';
  menuItems: NbMenuItem[] = [
    {
      title: "Profile của bạn",
      icon: 'file-text-outline',
      link: 'profile'
    },
    {
      title: "Cộng đồng",
      icon: 'globe-outline',
      link: 'members'
    },
    {
      title: "ATC Zone",
      icon: 'flash-outline',
      children: [
        {
          title: "Quản lý Crew Member",
          icon: 'people-outline'
        },
        {
          title: "Quản lý các Vai trò",
          icon: 'briefcase-outline',
          link: 'atc/roles'
        },
        {
          title: "Quản lý các Kỹ năng",
          icon: 'activity-outline'
        },
        {
          title: "Quản lý Achievement",
          icon: 'award-outline'
        },
        {
          title: "Xử lý phản hồi",
          icon: 'message-circle-outline'
        }
      ]
    }
  ];
  constructor(private dialog: NbDialogService) { }

  openDialog() {
    this.dialog.open(FileUploadComponent);
  }
}
