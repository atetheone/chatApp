import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../entities/user.entity';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject ?: BehaviorSubject<any>;
  public currentUser ?: Observable<User>;

  constructor(private http: HttpClient) { }

  public get currentUserValue(): User {
    return this.currentUserSubject?.value;
}


  signup(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUri}/signup`, user)
      .pipe(map(
        user =>  {
          console.log(user);
        }
      ));
  }

  login(userAuth: { email: string; password: string; }): Observable<any> {
    return this.http.post<User>(`${environment.apiUri}/login`, userAuth)
      .pipe(map(
        user =>  {
          console.log(user);
          if (user && user.token) {
            // user logged in
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject?.next(user);

          }
          return user;
        }
      ))
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject?.next(null);
}
}
