import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';



const routes: Routes = [
  { path: 'users', loadChildren: 'src/app/users/users.module#UsersModule' },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, config)
  ],
  exports: [
    RouterModule
  ],

  declarations: [],

})
export class AppRoutingModule { }
