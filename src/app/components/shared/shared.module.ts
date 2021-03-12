import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppHeaderComponent } from './app-header/app-header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [AppHeaderComponent, PageNotFoundComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild([])],
  exports: [AppHeaderComponent, PageNotFoundComponent],
})
export class SharedModule {}
