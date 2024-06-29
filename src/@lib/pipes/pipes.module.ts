import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { GetByIdPipe } from './get-by-id.pipe';
import { FormatDatePipe } from './format-date.pipe';

@NgModule({
    declarations: [
        GetByIdPipe,
        FormatDatePipe
    ],
    imports: [
        TranslateModule.forChild(),
    ],
    exports: [
        GetByIdPipe,
        FormatDatePipe
    ]
})
export class PipesModule { }
