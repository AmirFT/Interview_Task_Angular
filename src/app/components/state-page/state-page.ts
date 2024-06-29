import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-state-page',
  templateUrl: './state-page.html',
  styleUrls: ['./state-page.scss']
})
export class StatePageComponent {

  @Input()
  dataSource: MatTableDataSource<any>;

  @Input()
  dataSourceLoading: boolean;

  constructor() { }

  optionsLoading: AnimationOptions = {
    path: '../../../assets/lottie/loading.json'
  };

  optionsEmpty: AnimationOptions = {
    path: '../../../assets/lottie/empty.json',
    loop: false
  };

  optionsNotFound: AnimationOptions = {
    path: '../../../assets/lottie/search-empty.json',
    loop: false
  };

}
