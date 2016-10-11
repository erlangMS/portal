import { Component } from '@angular/core';
import { Injectable } from '@angular/core';


@Injectable()
export class SitemapService {

	getSitemap() { 
		var sitemap = {"name" : "dashboard",
					   "title" : "Dashboard",
					   "url" : "/portal/dashboard",
					   "image_url" : "modules/dashboard/img/pedidos.png",
					   "items" : [{"name" : "aplicativos",
								   "title" : "Aplicativos",
								   "url" : "/portal/dashboard/meu_portal/aplicativos",
								   "image_url" : "modules/dashboard/img/item.png",
								   "items" : [{"name" : "simar",
											   "title" : "SIMAR",
											   "url" : "/portal/dashboard/meu_portal/aplicativos/simar",
											   "image_url" : "modules/dashboard/img/pedidos.png"
											  },
											  {"name" : "sitab",
											   "title" : "SITAB",
											   "url" : "/portal/dashboard/meu_portal/aplicativos/sitab",
											   "image_url" : "modules/dashboard/img/item.png"
											  },
											  {"name" : "siger",
											   "title" : "SIGER",
											   "url" : "/portal/dashboard/meu_portal/aplicativos/siger",
												"image_url" : "modules/dashboard/img/relatorios.png"
											 }]
									},
									{"name" : "configuracoes",
									 "title" : "Configurações",
									 "url" : "/portal/dashboard/meu_portal/configuracoes",
									 "image_url" : "modules/dashboard/img/item.png"
									}]
					  };
		this.make_pointers(null, sitemap);
		return sitemap;
	}
  
	private make_pointers(owner, item){
		item.owner = owner;
		if (item.items != null){
			for (var i in item.items){
				var sub_item = item.items[i];
				this.make_pointers(item, sub_item);
			}
		}
	}
  
}
