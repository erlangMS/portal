import {Component} from 'angular2/core';

@Component({
	selector: 'navigator',
	templateUrl: 'web/dashboard/navigator.html'
})
export class Navigator { 
	constructor(){
		this.sitemap = this.get_site_map();
		this.current = this.sitemap;
		this.breadcrumb = this.get_breadcrumb(this.current);
	}
	
	go(item){
		this.current = item;
		this.breadcrumb = this.get_breadcrumb(this.current);
	}
	
	
	get_site_map(){
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
		this.make_pointers(null, sitemap);
		return sitemap;
	}
	
	make_pointers(owner, item){
		item.owner = owner;
		if (item.items != null){
			for (var i in item.items){
				var sub_item = item.items[i];
				this.make_pointers(item, sub_item);
			}
		}
	}
	
	get_breadcrumb(item){
		return this.make_breadcrumb(item, []);
	}
	
	make_breadcrumb(item, result){
		if (item.owner != null){
			this.make_breadcrumb(item.owner, result);
		}		
		result.push(item);
		return result;
	}

}


