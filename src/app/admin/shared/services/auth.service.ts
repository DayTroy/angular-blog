import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';
import { FbAuthResponse } from '../../../../../environments/interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expDateString = localStorage.getItem('fb-token-exp');
  
    if (!expDateString) {
      // Handle the case where the expiration date is not available.
      // You might want to return null or throw an error, depending on your requirements.
      return null;
    }
  
    const expDate = new Date(expDateString);
  
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
  
    return '';
  }
  

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
  
    return this.http.post<FbAuthResponse | null>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      user
    ).pipe(
      // Specify the type for tap
      tap(this.setToken)
    );
  }
  logout() {
    this.setToken(null)
  }
  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
