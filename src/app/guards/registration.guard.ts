import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {
  constructor(private profileService: ProfileService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve) => {
      let registrated = await this.profileService.isRegistrated();
      if (!registrated) {
        this.router.navigate(["/registration"]);
      }
      resolve(registrated);
    });
  }

}
