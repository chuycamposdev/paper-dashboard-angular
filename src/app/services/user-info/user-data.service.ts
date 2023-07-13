import { Injectable } from '@angular/core';
import { UserModel } from 'app/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  saveUserJWT(jwt) {
    localStorage.setItem('jwt', jwt);
  }

  getUserJWT(){
    return localStorage.getItem('jwt');
  }

  saveUserRefreshToken(refreshToken){
    return localStorage.setItem('refreshToken', refreshToken);
  }

  getUserRefreshToken(){
    return localStorage.getItem('refreshToken');
  }

  saveUserInfo(user){
    localStorage.setItem('user', user);
  }

  returnUserInfo(){
    var userJSON = localStorage.getItem('user');
    var user : UserModel = JSON.parse(userJSON);
    return user;
  }
}
