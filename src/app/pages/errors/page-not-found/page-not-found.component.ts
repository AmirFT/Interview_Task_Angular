import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '@core/services/auth.service';
// import { ConfigService } from '@lib/services/config.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageNotFoundComponent {

  constructor(
    private location: Location,
    private authService: AuthService,
    // private configService: ConfigService,
  ) {
    // Configure the layout
    // configService.config = { layout: { toolbar: { hidden: true } } };
  }

  goDashboard() {
    this.authService.goToDashboard();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
