import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Servico } from './servico';
import { ServicoService } from './servico.service';

@Component({
  selector: 'servico-detalhe',
  templateUrl: './servico-detalhe.component.html',
  styleUrls: [ './servico-detalhe.component.css' ]
})
export class ServicoDetalheComponent implements OnInit {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  servico: Servico;
  response: Response;

  constructor(
    private servicoService: ServicoService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.carregarServico();
  }

  carregarServico() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.servicoService.getServico(+params.get('id')))
      .subscribe(
        servico => this.servico = servico
      );
  }

  voltar(): void {
    this.location.back();
  }

  executar(url : string) {
    this.servicoService.executar(url).subscribe(
      response => {
        this.response = response;
      }
    );
  }

}
