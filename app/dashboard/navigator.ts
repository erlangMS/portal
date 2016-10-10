import {Component} from 'angular2/core';

@Component({
	selector: 'navigator',
	templateUrl: 'web/dashboard/navigator.html'
})
export class Navigator { 
	constructor(){
		this.sitemap = [{"name" : "meu_portal",
						 "title" : "Meu Portal",
						 "breadcrumb" : [ "Meu Portal" ],
						 "url" : "/portal/dashboard",
						 "image_url" : "img/pedidos.png",
						 "items" : [{"name" : "aplicativos",
									 "title" : "Aplicativos",
									 "breadcrumb" : [ "Meu Portal", "Aplicativos" ],
									 "url" : "/portal/dashboard/meu_portal/aplicativos",
									 "image_url" : "img/item.png",
									 "items" : [{"name" : "simar",
												 "title" : "SIMAR",
												 "breadcrumb" : [ "Meu Portal", "Aplicativos", "SIMAR" ],
												 "url" : "/portal/dashboard/meu_portal/aplicativos/simar",
												 "image_url" : "img/pedidos.png",
												},
												{"name" : "sitab",
												 "title" : "SITAB",
												 "breadcrumb" : [ "Meu Portal", "Aplicativos", "SITAB" ],
												 "url" : "/portal/dashboard/meu_portal/aplicativos/sitab",
												 "image_url" : "img/item.png"
												},
												{"name" : "siger",
												 "title" : "SIGER",
												 "breadcrumb" : [ "Meu Portal", "Aplicativos", "SIGER" ],
												 "url" : "/portal/dashboard/meu_portal/aplicativos/siger",
												 "image_url" : "img/relatorios.png"
												}]
									},
									{"name" : "configuracoes",
									 "title" : "Configurações",
									 "breadcrumb" : [ "Meu Portal", "Configurações" ],
									 "url" : "/portal/dashboard/meu_portal/configuracoes",
									 "image_url" : "img/item.png"
									}];
						  }];
		this.current = this.sitemap[0];
	}

}


