import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { StatePageComponent } from './state-page';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';

@NgModule({
  declarations: [
    StatePageComponent
  ],
  imports: [
    CommonModule,
    LottieModule,
    TranslateModule.forChild(),
  ],
  exports: [
    StatePageComponent
  ]
})
export class StatePageModule { }
