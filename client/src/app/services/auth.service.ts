import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  UserLogin, 
  UserSignup,
  LoginResponse,
  SignupResponse,
  User
} from '../entities';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean = false;
  public currentUser ?: User;

  constructor(private http: HttpClient) { }

  public getCurrentUser(): Observable<User> {
    return this.http.get<any>(`${environment.apiUri}/api/auth/currentuser`, {
      
    })
      .pipe(map(user => {
        this.currentUser =  user;
        // console.log(this.currentUser);
        return user;
      }));
    
  }

  public loggedIn(): boolean {
    const token =  localStorage.getItem('jwt_token');
    // if (!token) return false;
    return token !== null && token !== undefined;

    //Checks if the token is still valid
    const expireTokenDate = JSON.parse(atob(token!.split('.')[1])).exp;
    

  }

  signup(user: UserSignup): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${environment.apiUri}/api/auth/signup`, user);
  }

  login(userAuth: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUri}/api/auth/login`, userAuth)
      .pipe(map(user => {
        this.isLoggedIn = true;
        return user;
      }));
      
  }

  logout() {
    // remove user from local storage to log user out
    const expireTokenDate = localStorage.removeItem('jwt_token');
  }
}
