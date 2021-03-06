import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppHeaderComponent,
    AppFooterComponent,
    PageNotFoundComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports:[
    AppHeaderComponent,
    AppFooterComponent,
    PageNotFoundComponent, 
  ]
})
export class SharedModule { }
