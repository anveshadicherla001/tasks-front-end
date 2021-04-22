import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { AppSharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import { HeaderModule } from 'src/app/layout/components/header/header.module';
import { FooterModule } from 'src/app/layout/components/footer/footer.module';

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    RouterModule,
    HeaderModule,
    FooterModule
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule { }
