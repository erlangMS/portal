import { NgModule }                 from '@angular/core';
import { CommonModule, DatePipe }   from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { SignRolesService }         from '../c3/signRoles.service';
import { MaterialComponents }       from '../materialComponents/materialComponents.module';
import { NivelService }             from '../nivel/nivel.service';
import { TemplateService }          from "../c3/template.service";
import { ServicosListComponent } from './servicos-list.component';
import { ServicosRoutingModule } from './servicos.routes';
import { ServicosService } from './servicos.service';

@NgModule({
    declarations: [
        ServicosListComponent
    ],
    exports: [
        ServicosListComponent
    ],
    imports: [
        FormsModule, CommonModule, ServicosRoutingModule, MaterialComponents
    ],
    providers: [
        DatePipe, NivelService, SignRolesService, TemplateService, ServicosService
    ],
    entryComponents: [
        ServicosListComponent
    ]
})
export class ServicosModule {

}
