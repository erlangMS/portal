import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialComponents } from '../materialComponents/materialComponents.module';
import { ServicoDetalheComponent } from './servico-detalhe.component';
import { ServicoListaComponent } from './servico-lista.component';
import { ServicoRoutingModule } from './servico.routes';
import { ServicoService } from './servico.service';

@NgModule({
    declarations: [
        ServicoListaComponent,
        ServicoDetalheComponent
    ],
    exports: [
        ServicoListaComponent,
        ServicoDetalheComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ServicoRoutingModule,
        MaterialComponents
    ],
    providers: [
        DatePipe,
        ServicoService
    ],
    entryComponents: [
        ServicoListaComponent
    ]
})
export class ServicoModule {

}
