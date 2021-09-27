import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { RoleService } from 'src/app/services/role.service';
import { FileUploadComponent } from 'src/app/shared/file-upload/file-upload.component';
import { Role } from 'src/models/role.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  constructor(private dialog: NbDialogService, private roleService: RoleService) { }

  public roles: Role[] = [];

  ngOnInit(): void {
    this.roleService.getAll().subscribe((roles) => {
      this.roles.length = 0;
      this.roles.push(...roles);
    });
  }

  public addEmptyRole() {
    this.roles.push({
      _id:'',
      id: "",
      name: "",
      description: "",
      image: "",
      metadata: {}
    });
  }

  public uploadImage(i: number) {
    this.dialog.open(FileUploadComponent).onClose.subscribe((data) => {
      this.roles[i].image = data.url;
    })
  }

  public async deleteRole(id: string) {
    await this.roleService.delete(id);
    window.location.reload();
  }

  public async saveRole(i: number) {
    await this.roleService.create(this.roles[i]);
  }

}