import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { sample_users } from 'src/data';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgOtpInputComponent } from 'ng-otp-input';
import { NgOtpInputModule } from 'ng-otp-input';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})


export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn: boolean = true;
  showpassword: boolean = false;
  showpassword2: boolean = false;
  loginError: string = '';
  userLogged: boolean = false;
  forgotpassword: boolean = false;
  otpverified: boolean = false;
  returnUrl: string = '';
  constructor(
    private formBuilder: FormBuilder, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router,
    public dialogRef: MatDialogRef<LoginPageComponent>
  ) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,3})$'),
        ],
      ],
      password: ['', Validators.required],
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }
  get fc() {
    return this.loginForm.controls;
  }
  userLogin(): void {
    if (this.loginForm.valid) {
      console.log('required');
    }
    else {
      this.userLogged = true;
      console.log(this.fc.email.value, this.fc.password.value);
      this.userService.login({ email: this.fc.email.value, password: this.fc.password.value }).subscribe((res) => {
        console.log(res);
      });

    }
    this.loginForm.reset();
    this.dialogRef.close();


  }



  otp: any;
  showOtpComponent = false;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'font-size': '20px',
      'border': '2px solid #bc1c5c',
      'width': '40px',
      'height': '40px',
    }
  };
  onOtpChange(otp: any) {
    this.otp = otp;
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }

  toggleDisable() {
    if (this.ngOtpInput.otpForm) {
      if (this.ngOtpInput.otpForm.disabled) {
        this.ngOtpInput.otpForm.enable();
      } else {
        this.ngOtpInput.otpForm.disable();
      }
    }
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
  passwordReset() {
    console.log('password is reset');
    this.isLoggedIn = false;
    this.showpassword = false;
    this.showpassword2 = false;
    this.loginError = '';
    this.forgotpassword = false;
    this.otpverified = false;
    this.userLogin();
  }


}
