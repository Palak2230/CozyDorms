import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  signUpForm!: FormGroup;
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
    public dialogRef: MatDialogRef<LoginPageComponent>,
    private toastrService: ToastrService
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

    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,3})$'),
        ],
      ],
      password: ['', Validators.required],

    });

  }
  get fclogin() {
    return this.loginForm.controls;
  }
  get fcsignup() {
    return this.signUpForm.controls;
  }
  userLogin(): void {
    if (this.loginForm.valid) {
      console.log('required');
    }
    else {

      console.log(this.fclogin.email.value, this.fclogin.password.value);
      this.userService.login({ email: this.fclogin.email.value, password: this.fclogin.password.value }).subscribe((res) => {
        if (res) {
          this.toastrService.success(`Welcome back to CozyDorms ${res.name}`, 'Login Successful')
          this.userLogged = true;
        }
        else {
          this.toastrService.error('Login failed');
        }
      });

    }
    this.loginForm.reset();
    this.dialogRef.close();
  }

  userSignUp() {
    if (this.signUpForm.valid) {
      console.log('required');
    }
    else {
      this.userLogged = true;
      // console.log(this.fcsignup.email.value, this.fcsignup.password.value);
      this.userService.signup({ email: this.fcsignup.email.value, password: this.fcsignup.password.value }).subscribe((res) => {
        if (res) {
          this.toastrService.error('User Already exists.');
        }
        else {
          this.toastrService.success(`Welcome to CozyDorms ${this.fcsignup.name.value}`, 'Sign up Successful')
          console.log(this.fcsignup);
        }
      }
      );
    }
    this.signUpForm.reset();
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
