import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthTokenType } from './../models/auth-token-type';
import { AuthUser } from './../models/auth-user';
import { IAuthLogIn } from './../models/credentials';
import { ApiConfigService } from './api-config.service';
import { APP_CONFIG, IAppConfig } from './app.config';
import { TokenStoreService } from './token-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatusSource = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatusSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private apiConfigService: ApiConfigService,
    private tokenStoreService: TokenStoreService,
  ) {
    this.updateStatusOnPageRefresh();
  }

  login(credentials: IAuthLogIn): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .put(`${this.apiConfigService.configuration.apiEndpoint.authApi}/${this.apiConfigService.configuration.authPath.loginPath}`,
        `{ "email": "${credentials.username}", "password": "${credentials.password}" }`, { headers })
      .pipe(
        map((response: any) => {
          this.tokenStoreService.setRememberMe(true);
          if (!response) {
            console.error('There is no `{\'' + this.apiConfigService.configuration.accessTokenObjectKey +
              '\':\'...\'}` response after login.');
            this.authStatusSource.next(false);
            return false;
          }
          this.tokenStoreService.storeLoginSession(response);
          console.log('Logged-in user');
          this.authStatusSource.next(true);
          return true;
        }),
        catchError((error: HttpErrorResponse) => throwError(error))
      );
  }

  logout(): void {
    this.tokenStoreService.deleteAuthTokens();
    if (this.authStatusSource.value) {
      this.authStatusSource.next(false);
    }
    console.log('logout');
  }

  getBearerAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken)}`
    });
  }

  isAuthUserLoggedIn(): boolean {
    return this.tokenStoreService.hasStoredAccessToken() && !this.tokenStoreService.isAccessTokenExpired();
  }

  isAuthUserInRoles(requiredRoles: string[]): boolean {
    const role = this.getAuthUserRole();
    if (!role) {
      return false;
    }

    if (role.indexOf(this.apiConfigService.configuration.adminRoleName.toLowerCase()) >= 0) {
      return true; // The `Admin` role has full access to every pages.
    }

    return requiredRoles.some(requiredRole => {
      if (role) {
        return role.toLocaleLowerCase().indexOf(requiredRole.toLowerCase()) >= 0;
      } else {
        return false;
      }
    });
  }

  isAuthUserInClaim(requiredClaim: number[]): boolean {
    const claims = this.getAuthUserClaims();
    if (!claims) {
      return false;
    }

    return requiredClaim.some(requiredRole => {
      return claims.some(x => x === requiredRole);
    });
  }



  getAuthUserRole(): string | null {
    // return this.tokenStoreService.getDecodedApartmentToken().role;
    return null;
  }

  getAuthUserClaims(): number[] | null {

    return null;
    // return this.tokenStoreService.getDecodedApartmentToken().claims;
  }

  private updateStatusOnPageRefresh(): void {
    this.authStatusSource.next(this.isAuthUserLoggedIn());
  }

  //////////////////////////////////

  /**
   * redirect to signIn
   */
  goToSign() {
    this.router.navigate(['/auth/login']);
  }

  /**
   * redirect to home
   */
  goToHome() {
    this.router.navigate(['/panel/home/dashboard']);
  }

  /**
   * redirect to dashboard
   */
  goToDashboard() {
    this.router.navigate(['/panel/home/dashboard']);
  }

  private getCurrentLanguage(): string {
    const lang = this.tokenStoreService.hasStoredConfigToken() ? this.tokenStoreService.getConfigToken().lang : 'en';
    switch (lang) {
      case 'en':
        return 'en-US';
      default:
        return '';
    }
  }

}
