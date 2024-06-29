import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiConfigService } from '@core/services/api-config.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {

  protected url: string;
  protected headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    protected apiConfigService: ApiConfigService,
    protected http: HttpClient
  ) {
    this.url = this.apiConfigService.configuration.apiEndpoint.panelApi + '/api/';
  }


}
