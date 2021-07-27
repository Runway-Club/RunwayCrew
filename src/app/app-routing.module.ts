import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'registration', loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'atc/roles', loadChildren: () => import('./pages/atc/role/role.module').then(m => m.RoleModule) },
  { path: 'atc/skills', loadChildren: () => import('./pages/atc/skills/skills.module').then(m => m.SkillsModule) },
  { path: 'atc/achievements', loadChildren: () => import('./pages/atc/achievement/achievement.module').then(m => m.AchievementModule) },
  { path: '**', redirectTo: 'profile' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
