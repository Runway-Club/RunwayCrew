import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ATCService } from '../services/atc.service';
import { ProfileService } from '../services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AtcGuard implements CanActivate {
  constructor(private profileService: ProfileService, private atcService: ATCService, private router: Router,) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve) => {
      let registrated = await this.atcService.isATC();
      if (!registrated) {
        this.router.navigate(["/profile"]);
      }
      resolve(registrated);
    });
  }

}
