import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';



const routes: Routes = [
  { path: 'pages', loadChildren: 'src/app/users/users.module#UsersModule' },
  { path: 'login', loadChildren: 'src/app/login/login.module#LoginModule'},
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
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
