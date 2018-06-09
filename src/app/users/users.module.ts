import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';


const PAGES_COMPONENTS = [
  UsersComponent,
  HomeComponent,
];

@NgModule({
  imports: [
    UsersRoutingModule,
    MaterialModule,

  ],
  declarations: [
    ...PAGES_COMPONENTS,

  ]
})
export class UsersModule { }
