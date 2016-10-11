import { Component } from '@angular/core';
import { SitemapService } from '../service/sitemap_service.js';


@Component({
	selector: 'navigator',
	providers: [SitemapService],
	templateUrl: 'modules/dashboard/web/navigator.html'
})
export class NavigatorController { 
	constructor(private sitemapService: SitemapService) {
		this.sitemap = this.sitemapService.getSitemap();
		this.current = this.sitemap;
		this.breadcrumb = this.get_breadcrumb(this.current);
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

}


