import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '@core/services/auth.service';
// import { ConfigService } from '@lib/services/config.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccessDeniedComponent {

  isAuthenticated: boolean;

  constructor(
    private location: Location,
    private authService: AuthService,
    // private configService: ConfigService,
  ) {
    this.isAuthenticated = this.authService.isAuthUserLoggedIn();
    // Configure the layout
    // configService.config = { layout: { toolbar: { hidden: true } } };
  }

  goDashboard() {
    this.authService.goToDashboard();
  }

  goSign() {
    this.authService.goToSign();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
