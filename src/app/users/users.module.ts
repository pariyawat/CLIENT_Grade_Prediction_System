import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { DowloadsComponent } from './dowloads/dowloads.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





const PAGES_COMPONENTS = [
  UsersComponent,
  HomeComponent,
  DowloadsComponent,
];

@NgModule({
  imports: [
    UsersRoutingModule,
    MaterialModule,
    NgbModule,
    CommonModule

  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ]
})
export class UsersModule { }
