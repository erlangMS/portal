import { Injectable }     from 'angular2/core';
import {Component} from 'angular2/core';
import { Injectable }     from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/core';
import { Observable }     from 'rxjs/Observable';
import { SitemapService } from './sitemap_service';

@Component({
	selector: 'navigator',
	providers: [SitemapService],
	templateUrl: 'web/dashboard/navigator.html'
})
export class Navigator { 
	constructor(private sitemapService: SitemapService) {
		this.sitemap = this.get_site_map();
		this.current = this.sitemap;
		this.breadcrumb = this.get_breadcrumb(this.current);
	}
	
	go(item){
		this.current = item;
		this.breadcrumb = this.get_breadcrumb(this.current);
	}
	
	
	get_site_map(){
		var sitemap = this.sitemapService.getSitemap();
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


