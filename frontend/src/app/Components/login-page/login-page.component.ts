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

import emailjs from '@emailjs/browser';
import { inputs } from '@syncfusion/ej2-angular-dropdowns/src/drop-down-list/dropdownlist.component';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match.validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})



export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  resetForm!: FormGroup;
  isLoggedIn: boolean = true;
  showpassword: boolean = false;
  showpassword2: boolean = false;
  loginError: string = '';
  userLogged: boolean = false;
  forgotpassword: boolean = false;
  otpverified: boolean = false;
  returnUrl: string = '';

  userforsignup: boolean = false;
  userforreset: boolean = false;
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required]
    });

    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required]
    });
  }


  get fclogin() {
    return this.loginForm.controls;
  }
  get fcsignup() {
    return this.signUpForm.controls;
  }
  get fcupdate() {
    return this.resetForm.controls;
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
      // this.userLogged = true;
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



  showOtpComponent = false;

  passwordReset() {
    console.log(this.resetForm);

    if (this.resetForm.errors) {
      console.log('Form is invalid');
      return;
    }

    const email = this.fcupdate.email.value;
    const password = this.fcupdate.password.value;

    console.log(`Email: ${email}, Password: ${password}`);

    this.userService.update({ email, password }).subscribe(
      (res) => {
        console.log('Password update successful:', res);
        this.isLoggedIn = true;
        this.otpverified = false;
        this.forgotpassword = false;
      },
      (err) => {
        console.error('Error updating password:', err);
      }
    );
  }


  sentotp: number = 0;
  sendotp(email: string) {
    this.sentotp = Math.floor(1000 + Math.random() * 9000);
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
  // sd26859473

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'font-size': '20px',
      'border': 'none',
      'border-bottom': '1px solid black',
      'width': '40px',
      'height': '40px',
      'border-radius': '0px'
    }
  };
  otp?: string;
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
    // this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
  incorrectotp: boolean = false;
  otpEntered() {
    if (this.otp == this.sentotp.toString()) {
      this.otpverified = true;
      this.showOtpComponent = false;
      this.incorrectotp = false;
      this.userforsignup = false;
      // this.userforreset = true;
      // this.forgotpassword = false;
      this.isLoggedIn = true;
    }
    else {
      this.incorrectotp = true;
      setTimeout(() => {
        this.incorrectotp = false;
      }, 1000);
    }
  }

}
//tasks for today - errors and validations , compelte reset password 
