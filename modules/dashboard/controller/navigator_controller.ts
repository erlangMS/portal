import { Component } from '@angular/core';
import { SitemapService } from '../service/sitemap_service.js';


@Component({
	selector: 'navigator',
	providers: [SitemapService],
	templateUrl: 'modules/dashboard/web/navigator.html'
})
export class NavigatorController { 
	public sitemap = { "name": "dashboard",
					   "title": "Dashboard",
						"url": "/portal/dashboard",
						"image_url": "modules/dashboard/img/pedidos.png",
						"items": []};
	public current = [];
	public current_page = 1;
	constructor(private sitemapService: SitemapService) {}

	ngOnInit() {
		console.log("sitemap...");
		this.sitemapService.getSitemap().subscribe(res => {
				this.sitemap = res;
				this.current = this.sitemap;
				this.breadcrumb = this.get_breadcrumb(this.current);

		});
    }
  	
	go(item){
		this.current = item;
		this.breadcrumb = this.get_breadcrumb(this.current);
	}
	
	private get_breadcrumb(item){
		return this.make_breadcrumb(item, []);
	}
	
	private make_breadcrumb(item, result){
		if (item.owner != null){
			this.make_breadcrumb(item.owner, result);
		}		
		result.push(item);
		return result;
	}
	
	setCurrentPage(page){
		this.current_page = parseInt(page);
	}

}


