import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { redirectLink } from '../@common/models/app.url';
import { AuthenticationService } from '../@common/service/authentication.service';
import { IActiveUser } from '../@common/models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      id: [null, Validators.compose([Validators.required, Validators.nullValidator])],
      password: [null, Validators.compose([Validators.required, Validators.nullValidator])],
    });
  }

  onLogin(loginForm) {
    this.loginService.toLogin(loginForm.value)
      .then((response) => {
        this.authService.setActiveUser(<IActiveUser>response);
        this.route.navigate([redirectLink.homePage]);
      }).catch(() => {
         alert('Something Wrong');
      });
  }

}
