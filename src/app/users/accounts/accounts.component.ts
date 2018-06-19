import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  template: `
  <style>
  .button-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top:20px;
  }
  button:focus {outline:0;}
  </style>
  <router-outlet></router-outlet>
  <div class="button-row">
  <button mat-raised-button routerLink="Student" color="primary">Student</button>
  <button mat-raised-button routerLink="Teacher" color="accent">Teacher</button>
  <button mat-raised-button routerLink="Administrator" color="warn">Administrator</button>
</div>

  `,
})
export class AccountsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
