import { NgModule }             from '@angular/core';
import { RouterModule }         from '@angular/router';
import { AuthGuard }            from 'seguranca';
import { ServicosListComponent } from './servicos-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { 
                path: 'servicoslist', 
                component: ServicosListComponent, 
                canActivate: [AuthGuard], 
                data: { nome: '/servicoslist' } 
            },
        ])
    ],
    exports: [RouterModule]
})
export class ServicosRoutingModule {

}
