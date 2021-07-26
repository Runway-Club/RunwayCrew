import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/models/role.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private utils: UtilsService) { }

  public async get(id: string): Promise<Role> {
    return this.utils.get<Role>("roles", id);
  }

  public getAll(): Observable<Role[]> {
    return this.utils.getAll<Role>("roles");
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
