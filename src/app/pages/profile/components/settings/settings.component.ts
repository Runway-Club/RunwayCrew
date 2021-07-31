import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user?: UserProfile;
  sharingOpts = [
    {
      value: 'employer',
      description: 'Nhà tuyển dụng'
    },
    {
      value: 'corium',
      description: 'Thành viên chủ chốt'
    },
    {
      value: 'others',
      description: 'Others'
    },
  ];
  selectedItem: Array<string> = [];
  constructor(
    private dialogRef: NbDialogRef<SettingsComponent>,
  ) { }

  ngOnInit(): void {
  }
  afterCancel() {
    this.dialogRef.close();
  }
  selectedOpts(v: any) {
    // v.selected = !v.selected;
    let idx = this.selectedItem.findIndex(r =>
      r === v.value
    );
    if (idx == -1) {
      this.selectedItem.push(v.value);
    } else {
      this.selectedItem.splice(idx, 1);
    }
    console.log(v);
    console.log(this.selectedItem);
    console.log('done');
  }
  compareById(v1: any, v2: any): boolean {
    return v1.value === v2.value;
  }
  afterSettings() {

  }
}
