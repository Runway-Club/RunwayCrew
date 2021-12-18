import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/models/role.model';
import { UtilsService } from './utils.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ShareService } from './share.service';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private utils: UtilsService, private HttpClient:HttpClient,private shareSer:ShareService) { }

  public async get(id: string): Promise<Role> {
    // return this.utils.get<Role>("roles", id);
    return this.HttpClient.get<Role>(environment.endpoint + `roles?id=${id}`).toPromise();
  }

  public async getRoleId(id: string): Promise<Role> {
    // return this.utils.get<Role>("roles", id);
    return this.HttpClient.get<Role>(environment.endpoint + `roles/id?roleId=${id}`).toPromise();
  }

  public getAll(): Observable<Role[]> {
    // return this.utils.getAll<Role>("roles");
    return this.HttpClient
    .get<Role[]>(environment.endpoint + "roles");
  }

  public async create(role: Role) {
    // await this.utils.create("roles", role);
    let user = this.utils.currentUser;
    if (!user) {
      throw "Unauthenticated";
    }
    let current = Date.now();
    let body = {
      ...role,
      metadata : {
        actor: user.email,
        created: current,
        updated: current
      }
    }
    await this.HttpClient.post(environment.endpoint + 'roles', body).toPromise().then(res=>{
      console.log(res);
      this.shareSer.openSnackBar(`success give role to ${body.metadata.actor}!`);
    }).catch((err)=>{
      this.shareSer.openSnackBar(`failed give role to ${body.metadata.actor}!`,"close",{
        horizontalPosition: 'end', verticalPosition: 'bottom',
        duration: 1 * 2000,
        panelClass: ['red-snackbar']
      });
    });
  }

  public async update(role: Role) {
    let user = this.utils.currentUser;
    if (!user) {
      throw "Unauthenticated";
    }
    let body = {
      ...role,
      metadata : {
        ...role.metadata,
        actor: user.email,
        updated: Date.now()
      }
    }
    await this.HttpClient.put(environment.endpoint + 'roles', body).toPromise().then(res=>{console.log(res)
      this.shareSer.openSnackBar(`success give role to ${body.metadata.actor}!`);
    }).catch((err)=>{
      this.shareSer.openSnackBar(`failed give role to ${body.metadata.actor}!`,"close",{
        horizontalPosition: 'end', verticalPosition: 'bottom',
        duration: 1 * 2000,
        panelClass: ['red-snackbar']
      });
    });
  }

  public async delete(roleId: string) {
    // await this.utils.delete("roles", roleId);
    await this.HttpClient.delete(environment.endpoint + 'roles' +`?id=${roleId}`,{
      observe: 'response',
      responseType: 'blob',
    }).toPromise().then(res=>{
      this.shareSer.openSnackBar(`success delete role  ${roleId}!`);
    }).catch((err)=>{
      this.shareSer.openSnackBar(`failed give role to ${roleId}!`,"close",{
        horizontalPosition: 'end', verticalPosition: 'bottom',
        duration: 1 * 2000,
        panelClass: ['red-snackbar']
      });
    });
  }
}
