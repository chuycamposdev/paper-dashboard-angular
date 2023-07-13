import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'app/models/user/user.model';
import { AccountService } from 'app/services/auth/account.service';
import { UserDataService } from 'app/services/user-info/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userDataService: UserDataService, private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  submitted = false;

  initializeFormGroup() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  buildLogin() {
    return {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };
  }

  get formControls() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  submit() {
    console.log(this.loginForm.valid);
    var login = this.buildLogin();
    this.accountService.login(login).subscribe( response => {
      this.saveUserInfoLocally(response.data);
    }, error => {
      console.log(error);
    });
  }

  saveUserInfoLocally(data: any) {
    let token = data.token;
    let refreshToken = data.refreshToken;
    let user: UserModel = data;
    this.userDataService.saveUserInfo(user);
    this.userDataService.saveUserJWT(token);
    this.userDataService.saveUserRefreshToken(refreshToken);
    this.redirectToHomePage();
  }

  redirectToHomePage() {
    this.router.navigate(['/auth/login']);
  }

}
