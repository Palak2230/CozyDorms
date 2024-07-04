import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match';

import emailjs from '@emailjs/browser';

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
          Validators.pattern('^([a-zA-Z0-9]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,3})$'), Validators.email
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],

    });

    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,3})$'), Validators.email
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required],

    }, {
      validators: PasswordsMatchValidator('password', 'confirmpassword')
    }
    );

  }
  get fclogin() {
    return this.loginForm.controls;
  }
  get fcsignup() {
    return this.signUpForm.controls;
  }
  userLogin(): void {
    if (this.loginForm.invalid) {
      console.log('required');
    }
    else {
      this.userService.login({ email: this.fclogin.email.value, password: this.fclogin.password.value }).subscribe((res) => {
        this.dialogRef.close();
      });

    }
    this.loginForm.reset();

  }

  userRegister() {
    console.log(this.signUpForm);
    if (this.signUpForm.invalid) {
      console.log('required');
    }
    else {
      this.userLogged = true;
      // console.log(this.fcsignup.email.value, this.fcsignup.password.value);
      this.userService.register({
        name: this.fcsignup.name.value,
        email: this.fcsignup.email.value,
        password: this.fcsignup.password.value,
        confirmpassword: this.fcsignup.password.value
      }).subscribe((res) => {
        this.dialogRef.close();
      }
      );
    }
    this.signUpForm.reset();

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

  sentotp: any = Math.floor(Math.random() * 5);
  sendotp(email: string) {
    let templateParams = {
      OTP: this.sentotp,
      message: "We are glad to have you as a user !",
      reply_to: email
    };
    emailjs
      .send('service_72nvjte', 'template_agitgfz', templateParams, {
        publicKey: 'SfoE5YvBs0oWcuRD1',
      })
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
          console.log('FAILED...', err);
        },
      );
  }
  otpEntered() {
    if (this.otp == this.sentotp) {
      this.passwordReset();
    }
    else {
      //wrong otp
    }
  }
}
//tasks for today - errors and validations , compelte reset password 
