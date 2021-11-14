import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UserProfile } from 'src/models/user-profile.model';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication.service'
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProfileService } from '../../../../services/profile.service'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class  SettingsComponent implements OnInit {

  formControl = new FormControl();

  user?: UserProfile;
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
      description: '',
      checked: false
    }
  ];
  selectedItem: Array<string> = [];
  constructor(
    private dialogRef: NbDialogRef<SettingsComponent>,
    private AuthService:AuthenticationService,
    private toast: NbToastrService,
    private ProfileService:ProfileService
  ) { }

  ngOnInit(): void {
    for(let i = 0; i<this.sharingOpts.length; i++){
      if(this.sharingOpts[i].value === this.user?.styleUserRead){
        this.sharingOpts[i].checked = true;
      }
    }
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
    // console.log(v);
    // console.log(this.selectedItem);
    // console.log('done');
  }
  compareById(v1: any, v2: any): boolean {
    return v1.value === v2.value;
  }
  async afterSettings() {
    if (this.user === undefined) {
      return;
    } else {
      let updateUser = {
        ...this.user,
        styleUserRead: this.formControl.value
      }
      await this.ProfileService.update(updateUser);
      await this.dialogRef.close();
      window.location.reload()
    }
  }
}
