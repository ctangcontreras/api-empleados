import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9191/auth/login';
  private isAuthenticated = false;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response && response.data && response.data.token) {
          this.isAuthenticated = true;
          localStorage.setItem('authToken', response.data.token);
        } else {
          this.isAuthenticated = false;
        }
      }),
      catchError(error => {
        this.isAuthenticated = false;
        return of(null);
      })
    );
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
