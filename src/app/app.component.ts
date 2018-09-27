import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // tslint:disable-next-line:max-line-length
  template: `<ng-progress [spinnerPosition]="'right'"  [color]="'#f64f59'" [ease]="'linear'" [thick]="false"></ng-progress> <router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'app';
}
