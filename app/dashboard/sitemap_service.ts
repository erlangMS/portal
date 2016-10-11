import { Injectable } from 'angular2/core';


@Injectable()
export class SitemapService {
  getSitemap() { 
	  var sitemap = {"name" : "dashboard",
						   "title" : "Dashboard",
						   "url" : "/portal/dashboard",
						   "image_url" : "img/pedidos.png",
						   "items" : [{"name" : "aplicativos",
									   "title" : "Aplicativos",
									   "url" : "/portal/dashboard/meu_portal/aplicativos",
									   "image_url" : "img/item.png",
									   "items" : [{"name" : "simar",
												   "title" : "SIMAR",
												   "url" : "/portal/dashboard/meu_portal/aplicativos/simar",
												   "image_url" : "img/pedidos.png",
												  },
												  {"name" : "sitab",
												   "title" : "SITAB",
												   "url" : "/portal/dashboard/meu_portal/aplicativos/sitab",
												   "image_url" : "img/item.png"
												  },
												  {"name" : "siger",
												   "title" : "SIGER",
												   "url" : "/portal/dashboard/meu_portal/aplicativos/siger",
													"image_url" : "img/relatorios.png"
												 }]
										},
										{"name" : "configuracoes",
										 "title" : "Configurações",
										 "url" : "/portal/dashboard/meu_portal/configuracoes",
										 "image_url" : "img/item.png"
										}]
						  };
	return sitemap;
  }
}
