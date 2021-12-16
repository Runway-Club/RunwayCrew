import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtcGuard } from '../../guards/atc.guard';
import { AtcComponent } from './atc.component';

const routes: Routes = [
  {
    path: '',
    component: AtcComponent,
    children: [
      {
        path: 'roles',
        canActivate: [AtcGuard],
        loadChildren: () =>
          import('./role/role.module').then((m) => m.RoleModule),
      },
      {
        path: 'skills',
        canActivate: [AtcGuard],
        loadChildren: () =>
          import('./skills/skills.module').then((m) => m.SkillsModule),
      },
      {
        path: 'achievements',
        canActivate: [AtcGuard],
        loadChildren: () =>
          import('./achievement/achievement.module').then(
            (m) => m.AchievementModule
          ),
      },
      {
        path: 'members',
        canActivate: [AtcGuard],
        loadChildren: () =>
          import('./members/members.module').then((m) => m.MembersModule),
      },
      { path: '**', pathMatch: 'full', redirectTo: 'roles' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtcRoutingModule {}
