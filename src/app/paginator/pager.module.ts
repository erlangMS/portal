import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagerComponent} from "./pager.component";
import {PagerService} from "./pager.service";
import { FormsModule }    from '@angular/forms';
import {PagerRoutingModule} from "./pager.routes";



@NgModule({
    declarations: [
        PagerComponent
    ],
    exports: [
        PagerComponent
    ],
    imports: [
      FormsModule, CommonModule, PagerRoutingModule

    ],
    providers: [
      PagerService,
      PagerComponent
    ]
})
export class PagerModule {
}
