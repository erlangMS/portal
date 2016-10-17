import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';


@Injectable()
export class SitemapService {
	
	constructor (private http: Http) {}
	
	getSitemap() { 
		return this.http.get("/portal/sitemap.json")
			.map((res) => { 
				var sitemap = res.json();
				this.make_pointers(null, sitemap);
				return sitemap;
			});
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
  
}
