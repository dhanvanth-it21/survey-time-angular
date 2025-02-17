import { Injectable } from '@angular/core';
import { userType } from './models/user-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData: userType[] = [
    {'emailId': 'sbdhanvanth@gmail.com', 'password': '12345678', 'role': 'admin'},
    {'emailId': 'ram@gmail.com', 'password': '12345678', 'role': 'user'},
    {'emailId': 'kumar@gmail.com', 'password': '12345678', 'role': 'user'}
  ]

  public logedUserSubject$ = new BehaviorSubject<{'emailId': string, 'role': string} | null>(null);

  constructor() { }


  validateUser(user: {'emailId': string, 'password': string}): {'emailId': string, 'role': string} | null {
    const foundUser = this.authData
        .find((auth) => auth.emailId === user.emailId && auth.password === user.password);
    if (foundUser) {
      return {'emailId': foundUser.emailId, 'role': foundUser.role};
    }
    return null;
  }

  storeLoggedInUser(user: {'emailId': string, 'role': string}) {
    localStorage.setItem('loggedInUser', JSON.stringify({emailId: user.emailId, role: user.role}));
    this.logedUserSubject$.next(user);
  }

  getLoggedInUser(): string | null {
    return localStorage.getItem('loggedInUser');
  }

  logout() {
    localStorage.removeItem('loggedInUser');
  }

}
