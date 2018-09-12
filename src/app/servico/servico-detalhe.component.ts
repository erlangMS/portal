import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Servico } from './servico';
import { ServicoService } from './servico.service';
import { MatSnackBar } from '@angular/material';
import { SafeHtml } from '@angular/platform-browser';
import { AuthInterceptor } from 'ems-oauth2-client';

@Component({
  selector: 'servico-detalhe',
  templateUrl: './servico-detalhe.component.html',
  styleUrls: ['./servico-detalhe.component.css']
})
export class ServicoDetalheComponent implements OnInit {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public servico: Servico = new Servico();
  public parametrosServico = [];

  public urlExecutada = '<html><head></head><body></body></html>';
  response: any = '';
  status: any = '';
  public respostaStatus = '';
  public tamanhoRequisicao = '';

  public erro = false;

  public urlPath: any = '';;
  public mimeType: any = '';
  public isPdf: boolean = false;


  constructor(
    private servicoService: ServicoService,
    private route: ActivatedRoute,
    private location: Location,
    public mensagem: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarServico();
  }


  carregarServico() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.servicoService.getServico(+params.get('id')))
      .subscribe(
        servico => {
          this.servico = servico
          let regex = /:\w*/gm;
          let parametrosRegex = regex.exec(servico.url)
          if (parametrosRegex) {
            parametrosRegex.forEach(parametro => {
              this.parametrosServico.push({ 'nome': parametro, 'valor': '' })
            });
          }
        }
      );
  }

  voltar(): void {
    this.location.back();
  }

  executar(url: string, service: Servico) {
    this.erro = false;
    this.status = '';
    if (this.parametrosServico && this.parametrosServico.length > 0) {
      this.parametrosServico.reverse;
      this.parametrosServico.forEach(param => {
        if (param.valor != '') {
          url = url.replace(param.nome, param.valor)
        }
      });
    }
    this.response = new Response();
    this.isLoading.next(true);
    this.servicoService.executar(url, service).subscribe(
      response => {
        this.response = response.body;
        this.status = 'Codigo: ' + response.status + ' ' + response.statusText + 
                      ' Tamanho da Requisição: ' + response.body != null ? response.body.length : '';
        this.respostaStatus = 'Codigo: ' + response.status + ' ' + response.statusText;
        this.tamanhoRequisicao = 'Tamanho da Requisição: ' + response.body != null ? response.body.length : '';
        if (AuthInterceptor.valueHeader == 'application/pdf') {
          this.mimeType = 'application/pdf';
          this.urlPath = window.URL.createObjectURL(this.response);
          this.isPdf = true;
        }
        this.isLoading.next(false);
      },
      err => {
        this.status = 'Codigo: ' + err.status + ' ' + err.statusText
        this.erro = true
        this.response = err;
        this.isLoading.next(false);
      },
      () => {
        this.isLoading.next(false);
      }
    );
  }


  public innerHtml(): SafeHtml {
    console.log('innerHTML')
    return "<object data='" + this.urlPath + "' type='" + this.mimeType + "' class='embed-responsive-item' width='100%' height='600px'>" +
      "<embed src='" + this.urlPath + "' type='" + this.mimeType + "' />" +
      "</object>";
  }

}
