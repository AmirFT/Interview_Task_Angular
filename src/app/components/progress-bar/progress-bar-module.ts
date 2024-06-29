import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatProgressBarModule } from '@angular/material/progress-bar';

// import { ProgressBarComponent } from './progress-bar';

@NgModule({
    declarations: [
        // ProgressBarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,

        MatProgressBarModule
    ],
    exports: [
        // ProgressBarComponent
    ]
})
export class ProgressBarModule { }
