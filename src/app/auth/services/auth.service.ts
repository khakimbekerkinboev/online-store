import { LogInFormValues } from './../components/log-in/log-in/log-in.component';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { SignUpFormValues } from '../components/sign-up/sign-up.component';

export interface CurrentUserData {
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject(false);
  loggedIn = this.loggedInSubject.asObservable();

  private currentUserDataSubject = new BehaviorSubject({
    firstName: '',
    lastName: '',
  });
  currentUserData = this.currentUserDataSubject.asObservable();

  constructor() {
    const status = JSON.parse(localStorage.getItem('loggedIn') as string);
    const currentUserData = JSON.parse(
      localStorage.getItem('currentUserData') as string
    );

    if (status) {
      this.loggedInSubject.next(true);
      this.currentUserDataSubject.next(currentUserData);
    }
  }

  logUserOut() {
    this.loggedInSubject.next(false);
    localStorage.setItem('loggedIn', JSON.stringify(false));
    this.currentUserDataSubject.next({
      firstName: '',
      lastName: '',
    });
    localStorage.setItem(
      'currentUserData',
      JSON.stringify({
        firstName: '',
        lastName: '',
      })
    );
  }

  logUserIn(newUserData: CurrentUserData) {
    this.loggedInSubject.next(true);
    localStorage.setItem('loggedIn', JSON.stringify(true));
    this.currentUserDataSubject.next(newUserData);
    localStorage.setItem('currentUserData', JSON.stringify(newUserData));
  }

  logIn(data: LogInFormValues) {
    return new Observable((observer) => {
      setTimeout(() => {
        if (localStorage.getItem('users') !== null) {
          const users: SignUpFormValues[] = JSON.parse(
            localStorage.getItem('users') as string
          );
          let registered = false;

          users.forEach((user) => {
            if (user.email === data.email && user.password === data.password) {
              observer.next({
                firstName: user.firstName,
                lastName: user.lastName,
              });
              registered = true;
              return;
            }
          });

          if (!registered) {
            observer.next({ notRegistered: true });
          }
        } else {
          observer.next({ notRegistered: true });
        }
      }, 2000);
    });
  }

  signUp(data: SignUpFormValues) {
    return new Observable((observer) => {
      setTimeout(() => {
        if (localStorage.getItem('users') !== null) {
          const users: SignUpFormValues[] = JSON.parse(
            localStorage.getItem('users') as string
          );

          const registered = users.some((user) => {
            return user.email === data.email && user.password === data.password;
          });

          if (registered) {
            observer.next({ registered: true });
          } else {
            users.push(data);
            localStorage.setItem('users', JSON.stringify(users));
            observer.next(data);
          }
        } else {
          const users: SignUpFormValues[] = [];
          users.push(data);
          localStorage.setItem('users', JSON.stringify(users));
          observer.next(data);
        }
      }, 2000);
    });
  }
}
