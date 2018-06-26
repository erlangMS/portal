import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialComponents } from '../materialComponents/materialComponents.module';
import { ServicoDetalheComponent } from './servico-detalhe.component';
import { ServicoListaComponent } from './servico-lista.component';
import { ServicoRoutingModule } from './servico.routes';
import { ServicoService } from './servico.service';
import { SafeHtmlPipe } from '../util/safe-html.pipe';

@NgModule({
    declarations: [
        ServicoListaComponent,
        ServicoDetalheComponent,
        SafeHtmlPipe
    ],
    exports: [
        ServicoListaComponent,
        ServicoDetalheComponent,
        SafeHtmlPipe
    ],
    imports: [
        FormsModule,
        CommonModule,
        ServicoRoutingModule,
        MaterialComponents
    ],
    providers: [
        DatePipe,
        ServicoService,
        SafeHtmlPipe
    ],
    entryComponents: [
        ServicoListaComponent
    ]
})
export class ServicoModule {

}
