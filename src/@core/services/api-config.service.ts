import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';

import { environment } from 'assets/environments/environment';
import { APP_CONFIG, IAppConfig } from './app.config';


@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {

    private config: IApiConfig | null = null;

    constructor(
        private injector: Injector,
        @Inject(APP_CONFIG) private appConfig: IAppConfig
    ) { }

    loadApiConfig(): Promise<any> {
        const http = this.injector.get<HttpClient>(HttpClient);
        const env = (environment.production) ? 'production' : 'development';
        const url = `${this.appConfig.apiEndpoint}/${this.appConfig.apiSettingsPath}/${env}.json`;
        return http.get<IApiConfig>(url)
            .toPromise()
            .then(config => {
                this.config = config;
                // console.log('ApiConfig', this.config);
            })
            .catch(err => {
                console.error(`Failed to loadApiConfig(). Make sure ${url} is accessible.`, this.config);
                return Promise.reject(err);
            });
    }

    get configuration(): IApiConfig {
        if (!this.config) {
            throw new Error('Attempted to access configuration property before configuration data was loaded.');
        }
        return this.config;
    }
}

export interface IApiConfig {
    apiEndpoint: IApiEndpointConfig;
    authPath: IAuthPath;
    supportPath: ISupportPath;
    accessTokenObjectKey: string;
    adminRoleName: string;
}

export interface IApiEndpointConfig {
    authApi: string;
    panelApi: string;
}

export interface IAuthPath {
    loginPath: string;
    logoutPath: string;
    confirmationPath: string;
}

export interface ISupportPath {
    getUserMessages: string;
    sendUserMessage: string;
}
