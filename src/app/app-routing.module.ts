import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './is-not-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/authentication/signin'
  },
  {
    path: 'authentication',
    canActivate: [IsNotAuthenticatedGuard],
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'task',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
