import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-redirect',
  template: '',
  styles: ['']
})
export class RedirectComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.authService.goToDashboard();
  }

}
