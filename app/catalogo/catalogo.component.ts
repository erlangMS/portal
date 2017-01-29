import { Component, ViewContainerRef, ViewEncapsulation, Input, ViewChild, Optional } from '@angular/core';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { CustomModalContext, CustomModal } from './exemplos_url_servico.component';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DataTable } from "angular2-datatable";

import { Catalogo } from './catalogo';

import * as _ from 'underscore';

import { PagerService, EmsRestClient } from '../dashboard/main';


interface fpc {
    mensagem: Function;
}

declare var fpc: fpc;

@Component({
    selector: 'catalogo',
    templateUrl: 'app/catalogo/catalogo.html',
    providers: [Modal]
})
export class CatalogoComponent {
	
	@Input("mfTable") mfTable: DataTable;
	private loading: boolean = false;
	private catalogoUrl = "/auth/user";
	private catalogoOwnerUrl = "/catalog/owner";
	public operacao : string = "pesquisa";
	public ult_operacao : string = "pesquisa";
	public errorMessage: string;
	public owner : string = "";
	public data : any;
    public filterQuery : string = "";
    public rowsOnPage : number = 10;
    public sortBy : string = "email";
    public sortOrder : string = "asc";
    public owner_list : any = null;
    public language_list : any = [{"name" : "erlang", "title" : "Linguagem Erlang"}, 
								  {"name" : "java", "title" : "Linguagem Java"}];
    public authentication_list : any = [{"name" : "", "title" : "Sem autenticação"}, 
										{"name" : "basic", "title" : "Protocolo HTTP Basic"}, 
										{"name" : "oauth", "title" : "Protocolo Oauth 2.0"}];
    public type_list : any = [{name : "GET", title : "Obter (verbo HTTP GET)"},
							  {name : "POST", title : "Incluir (verbo HTTP POST)"},
							  {name : "PUT", title : "Alterar (verbo HTTP PUT)"},
							  {name : "DELETE", title : "Excluir (DELETE)"}
							 ];
    public model : Catalogo = new Catalogo();

 // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    constructor(private http: Http,
				public modal: Modal,
				vcRef: ViewContainerRef,
				private pagerService: PagerService,
				private rest: EmsRestClient) {
		modal.overlay.defaultViewContainer = vcRef;

		// busca os owners
        this.http.get(this.catalogoOwnerUrl)
			.catch(this.handleError)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.owner_list = data.json();
                }, 1000);
            });
    }

    ngOnInit(): void {
		
    }
    
    ngAfterViewInit(){
		let cat = this.rest.from("/catalog");

	}

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }
    
    public voltar(){
			this.operacao = this.ult_operacao;
			this.ult_operacao = "pesquisa";
	}
    
    public pesquisar(){	
		this.loading = true;
		this.ult_operacao = this.operacao;
		this.operacao = "listagem";

		const filter = "{}";
		const limit = 100;
		const offset = 1;
		const url = `${this.catalogoUrl}?filter="${filter}"&limit=${limit}&offset=${offset}`;

        this.http.get(url)
            .catch(this.handleError)
            .subscribe((data)=> {
                setTimeout(()=> {
					
					 // set items to json response
					this.allItems = data.json();

					// initialize to page 1
					this.setPage(1);
					
                    this.data = data.json();
                    this.loading = false;
                }, 1000);
            });
	}
	
	public novo(){
		this.ult_operacao = this.operacao;
		this.operacao = "edicao";
		
	}

	public openDialogExemplos() {
		return this.modal.open(CustomModal,  overlayConfigFactory({  }, BSModalContext));
	}	

	private handleError(error: Response | any) {
		  let errMsg: string;
		  if (error instanceof Response) {
				const body = error.json() || '';
				fpc.mensagem(body);
				errMsg = body;
		  } else {
				errMsg = error.message ? error.message : error.toString();
		  }
		  console.error(errMsg);
		  return Observable.throw(errMsg);
	}	
	
	private extractData(res: Response) {
		  let body = res.json();
		  return body.data || { };
	}
	
	public salvar(){
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		this.model.name = this.model.url;
		this.model.public = true;
		this.http.post(this.catalogoUrl, this.model, options)
						.map(this.extractData)
						.catch(this.handleError)
						.subscribe(
							 cat  => this.data.push(cat),
							 error =>  this.errorMessage = <any>error
						);
						
	}
	
	private onPageChangeSubscriber = (event: any)=> {
        alert("ok");
    };
	
	setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }	
    
}

