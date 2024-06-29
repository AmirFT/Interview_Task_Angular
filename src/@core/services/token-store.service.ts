import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

import { AuthUser } from './../models/auth-user';
import { AuthTokenType } from './../models/auth-token-type';
import { ApiConfigService } from './api-config.service';
import { BrowserStorageService } from './browser-storage.service';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class TokenStoreService {

    private rememberMeToken = 'rememberMe';

    constructor(
        private utilsService: UtilsService,
        private apiConfigService: ApiConfigService,
        private browserStorageService: BrowserStorageService,
    ) { }

    setToken(tokenType: AuthTokenType, tokenValue: string): void {
        if (this.utilsService.isEmptyString(tokenValue)) {
            console.error(`${AuthTokenType[tokenType]} is null or empty.`);
        }

        if (tokenType === AuthTokenType.AccessToken && this.utilsService.isEmptyString(tokenValue)) {
            throw new Error('AccessToken can\'t be null or empty.');
        }

        if (this.rememberMe()) {
            this.browserStorageService.setLocal(AuthTokenType[tokenType], tokenValue);
        } else {
            this.browserStorageService.setSession(AuthTokenType[tokenType], tokenValue);
        }
    }

    getRawAuthToken(tokenType: AuthTokenType): string {
        if (this.rememberMe()) {
            return this.browserStorageService.getLocal(AuthTokenType[tokenType]);
        } else {
            return this.browserStorageService.getSession(AuthTokenType[tokenType]);
        }
    }

    storeLoginSession(response: any): void {
        this.setToken(AuthTokenType.AccessToken, response[this.apiConfigService.configuration.accessTokenObjectKey]);
    }

    deleteAuthTokens() {
        if (this.rememberMe()) {
            this.browserStorageService.removeLocal(AuthTokenType[AuthTokenType.StartToken]);
            this.browserStorageService.removeLocal(AuthTokenType[AuthTokenType.AccessToken]);
            this.browserStorageService.removeLocal(AuthTokenType[AuthTokenType.ApartmentToken]);
        } else {
            this.browserStorageService.removeSession(AuthTokenType[AuthTokenType.StartToken]);
            this.browserStorageService.removeSession(AuthTokenType[AuthTokenType.AccessToken]);
            this.browserStorageService.removeSession(AuthTokenType[AuthTokenType.ApartmentToken]);
        }
        this.browserStorageService.removeLocal(this.rememberMeToken);
    }

    // RememberMe

    setRememberMe(value: boolean): void {
        this.browserStorageService.setLocal(this.rememberMeToken, value);
    }

    rememberMe(): boolean {
        return this.browserStorageService.getLocal(this.rememberMeToken) === true;
    }

    // AccessToken

    hasStoredAccessToken(): boolean {
        const accessToken = this.getRawAuthToken(AuthTokenType.AccessToken);
        return !this.utilsService.isEmptyString(accessToken);
    }

    getDecodedAccessToken(): any {
        return jwtDecode(this.getRawAuthToken(AuthTokenType.AccessToken));
    }

    getAccessTokenExpirationDateUtc(): Date | null {
        const decoded = this.getDecodedAccessToken();
        if (decoded.exp === undefined) {
            return null;
        }
        const date = new Date(0); // The 0 sets the date to the epoch
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isAccessTokenExpired(): boolean {
        const expirationDateUtc = this.getAccessTokenExpirationDateUtc();
        if (!expirationDateUtc) {
            return true;
        }
        return !(expirationDateUtc.valueOf() > new Date().valueOf());
    }

    // StartToken

    setStartToken(response: any): void {
        this.browserStorageService.setLocal(
            AuthTokenType[AuthTokenType.StartToken],
            btoa(encodeURIComponent(JSON.stringify(response)))
        );
    }

    getStartToken(): any {
        return JSON.parse(decodeURIComponent(atob(this.browserStorageService.getLocal(AuthTokenType[AuthTokenType.StartToken]))));
    }

    hasStoredStartToken(): boolean {
        const startToken = this.browserStorageService.getLocal(AuthTokenType[AuthTokenType.StartToken]);
        return !this.utilsService.isEmptyString(startToken);
    }

    deleteStartToken() {
        this.browserStorageService.removeLocal(AuthTokenType[AuthTokenType.StartToken]);
    }

    // ConfigToken

    setConfigToken(response: any): void {
        this.browserStorageService.setLocal(
            AuthTokenType[AuthTokenType.ConfigToken],
            btoa(encodeURIComponent(JSON.stringify(response)))
        );
    }

    getConfigToken(): any {
        return JSON.parse(decodeURIComponent(atob(this.browserStorageService.getLocal(AuthTokenType[AuthTokenType.ConfigToken]))));
    }

    hasStoredConfigToken(): boolean {
        const configToken = this.browserStorageService.getLocal(AuthTokenType[AuthTokenType.ConfigToken]);
        return !this.utilsService.isEmptyString(configToken);
    }

    deleteConfigToken() {
        this.browserStorageService.removeLocal(AuthTokenType[AuthTokenType.ConfigToken]);
    }

}
