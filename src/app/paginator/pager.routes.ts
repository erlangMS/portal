import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {PagerComponent} from "./pager.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'paginator', component: PagerComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PagerRoutingModule {

}
