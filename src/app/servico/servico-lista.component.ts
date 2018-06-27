import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PagerComponent } from '../paginator/pager.component';
import { NgForm, FormControl } from '@angular/forms'
import { MatPaginator, PageEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MatSnackBar , MAT_DIALOG_DATA } from '@angular/material';
import { ServicoService } from './servico.service';
import { Servico } from './servico';
import { AuthGuard, ResourceOwner } from 'ems-oauth2-client';

@Component({
    selector: 'servico-lista',
    templateUrl: './servico-lista.component.html',
})

export class ServicoListaComponent implements OnInit {

    private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private pageEventMostrar: PageEvent;
    private lista: Observable<Servico[]>;
    private filtro: Servico = new Servico();
    private servicoArray: Servico[];

    private tipos: string[];
    private linguagens: string[];
    private donos: string[];

    displayedColumns = ['Imagem', 'Url', 'Tipo', 'Visualizar'];
    pageSizeOptions = [5, 10, 25, 100];

    constructor(
        private router: Router,
        private servicoService: ServicoService,
        private snackBar: MatSnackBar
    ) {  }

    ngOnInit() {
        let url:string = window.location.href;
        let arrayUrl:any = url.split('/');
        let servidor: any = arrayUrl[5]; 
        this.carregarServicosServidor(servidor);
     
    }

    carregarServicosServidor(servidor:string) {
        this.filtro.owner = servidor;
        this.lista = this.servicoService.paginar(this.filtro)
        this.isLoading.next(true);
        this.lista.subscribe(resposta => {
            this.servicoArray = resposta;
            this.servicoService.pagerComponent.setPage(1);
            this.servicoService.pagerComponent.length = resposta.length;
        },
        () => {
            this.isLoading.next(false)
        })
    }

    carregarServicos(){
        this.lista = this.servicoService.paginar(this.filtro)
        this.isLoading.next(true)
        this.lista.subscribe(
            res => {
                this.servicoArray = res
                this.servicoService.pagerComponent.setPage(1);
                this.servicoService.pagerComponent.length = res.length;
                
                if(!this.tipos){
                    this.tipos = this.montarListaStringsUnicas(this.servicoArray.map(servico => servico.type));
                }

                if(!this.linguagens){
                    this.linguagens = this.montarListaStringsUnicas(this.servicoArray.map(servico => servico.lang));
                }

                if(!this.donos){
                    this.donos = this.montarListaStringsUnicas(this.servicoArray.map(servico => servico.owner));
                }
                
            },
            error => this.erro(error),
            () => {
                this.isLoading.next(false)
            },
        );
    }

    montarListaStringsUnicas(listaAlvo: string[]){
        return listaAlvo.filter(
            function(tipo, i, array){
                return array.indexOf(tipo) === i
            }
        )
    }

    buscarServicos(){
        this.carregarServicos();
    }

    paginar(pageEvent:PageEvent){
        this.servicoService.pagerComponent.setPage(pageEvent.pageIndex+1, pageEvent.pageSize);
    }

    preVisualizarServico(servico:Servico) {
        let id = servico.rowid;
        this.router.navigate(['/servico', id]);
    }

    erro(erro: string){
        this.snackBar.open(erro, 'Ok', {duration: 5000});
        this.isLoading.next(false);
    }

}
