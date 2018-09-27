import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { redirectLink } from '../@common/models/app.url';
import { AuthenticationService } from '../@common/service/authentication.service';
import { IActiveUser } from '../@common/models/login.interface';
import { ToastrService } from 'ngx-toastr';

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
    private authService: AuthenticationService,
    private toastr: ToastrService,
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
        if (response) {
          this.authService.setActiveUser(<IActiveUser>response);
          this.route.navigate([redirectLink.homePage]);
        } else {
          this.toastr.error(`Login ไม่สำเร็จ`, 'Error');
        }
      }).catch(() => {
        this.toastr.error(`Login ไม่สำเร็จ`, 'Error');
      });
  }

}
