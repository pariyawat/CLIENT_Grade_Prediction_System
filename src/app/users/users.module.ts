import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { AccountsComponent } from './accounts/accounts.component';
import { DowloadsComponent } from './dowloads/dowloads.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



const PAGES_COMPONENTS = [
  UsersComponent,
  HomeComponent,
  AccountsComponent,
  DowloadsComponent,
];

@NgModule({
  imports: [
    UsersRoutingModule,
    MaterialModule,
    NgbModule

  ],
  declarations: [
    ...PAGES_COMPONENTS,

  ]
})
export class UsersModule { }
