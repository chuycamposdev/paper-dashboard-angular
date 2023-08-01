import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends HttpService {
  
  defineEnpoint(): string {
    return 'Account/';
  }

  registerAccount(user){
    return this.post(user, 'register-account');
  }

  login(user){
    return this.post(user, 'login');
  }
}
