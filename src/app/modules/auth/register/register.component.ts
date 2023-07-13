import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiResponseModel } from 'app/models/api.response.model';
import { AccountService } from 'app/services/auth/account.service';
import { FormValidatorService } from 'app/services/form-validator.service';
import { Router } from '@angular/router';
import { UserModel } from 'app/models/user/user.model';
import { UserResponseModel } from 'app/models/user-full.model';
import { UserDataService } from 'app/services/user-info/user-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  failed: boolean = false;
  registerSucceded = false;

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormGroup(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  submitted = false;

  constructor(private formBuilder: FormBuilder, private customValidator: FormValidatorService,
    private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get formControls() {
    return this.registerForm.controls;
  }

  buildUser() {
    return {
      firstName: this.registerForm.get('firstName')?.value,
      lastaName: this.registerForm.get('lastName')?.value,
      phoneNumber: this.registerForm.get('phoneNumber')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    };
  }

  onSubmit() {
    this.submitted = true;
    let user = this.buildUser();
    this.sendUserRequest(user);
  }

  sendUserRequest(user) {
    this.accountService.registerAccount(user)
      .subscribe( () => {
          this.router.navigate(['/auth/login']);
      }, error => {
        console.log(error);
      });
  }

  

}
