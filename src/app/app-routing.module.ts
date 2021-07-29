import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtcGuard } from './guards/atc.guard';
import { LoginGuard } from './guards/login.guard';
import { ProfileGuard } from './guards/profile.guard';
import { RegistrationGuard } from './guards/registration.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'registration', canActivate: [LoginGuard], loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule) },

  { path: 'community', loadChildren: () => import('./pages/community/community.module').then(m => m.CommunityModule) },
  { path: 'atc', loadChildren: () => import('./pages/atc/atc.module').then(m => m.AtcModule) },
  { path: '**', redirectTo: 'community' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
