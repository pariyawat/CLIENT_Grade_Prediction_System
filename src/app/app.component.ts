import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<ngx-loading-bar color=#ff0090 [includeSpinner]=false height=3px ></ngx-loading-bar> <router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'app';
}
