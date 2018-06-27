import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      id: [null, Validators.compose([Validators.required, Validators.nullValidator])],
      password: [null, Validators.compose([Validators.required, Validators.nullValidator])],
    });
  }

  onLogin(loginForm) {
    console.log(loginForm.value);
  }

}
