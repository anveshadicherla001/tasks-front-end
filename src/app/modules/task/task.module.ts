import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { RouterModule, Routes } from '@angular/router';
import { AppSharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'create',
    component: CreateTaskComponent
  }
];


@NgModule({
  declarations: [
    DashboardComponent,
    CreateTaskComponent,
    ViewTaskComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ViewTaskComponent
  ],
  entryComponents: [
    ViewTaskComponent
  ]
})
export class TaskModule { }
