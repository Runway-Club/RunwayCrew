import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtcGuard } from './guards/atc.guard';
import { RegistrationGuard } from './guards/registration.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'profile', canActivate: [RegistrationGuard], loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'registration', loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'atc/roles', canActivate: [AtcGuard], loadChildren: () => import('./pages/atc/role/role.module').then(m => m.RoleModule) },
  { path: 'atc/skills', canActivate: [AtcGuard], loadChildren: () => import('./pages/atc/skills/skills.module').then(m => m.SkillsModule) },
  { path: 'atc/achievements', canActivate: [AtcGuard], loadChildren: () => import('./pages/atc/achievement/achievement.module').then(m => m.AchievementModule) },
  { path: 'atc/members', canActivate: [AtcGuard], loadChildren: () => import('./pages/atc/members/members.module').then(m => m.MembersModule) },
  { path: 'community', loadChildren: () => import('./pages/community/community.module').then(m => m.CommunityModule) },
  { path: '**', redirectTo: 'community' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
