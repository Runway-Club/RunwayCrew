import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/models/role.model';
import { UtilsService } from './utils.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private utils: UtilsService, private HttpClient:HttpClient) { }

  public async get(id: string): Promise<Role> {
    // return this.utils.get<Role>("roles", id);
    return this.HttpClient.get<Role>(environment.endpoint + `roles?id=${id}`).toPromise();
  }

  public getAll(): Observable<Role[]> {
    // return this.utils.getAll<Role>("roles");
    return this.HttpClient
    .get<Role[]>(environment.endpoint + "roles");
  }

  public async create(role: Role) {
    await this.utils.create("roles", role);
  }

  public async update(role: Role) {
    await this.utils.update("roles", role);
  }

  public async delete(roleId: string) {
    await this.utils.delete("roles", roleId);
  }
}
