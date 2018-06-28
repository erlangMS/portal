import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { PagerService } from './pager.service';

@Component({
    selector: 'pager',
    templateUrl: './pager.component.html'
})
export class PagerComponent {

	public allItems: any[];
	
	public pager: any = {};
	
	public pagedItems: any[];

	public url: any;

	private catalogoUrl:string;

	private limit:number;

	private offset:number;

	public length: number = 10;

	private filter:string;

	private updatePaginator: boolean = true;

	constructor(private http: Http, private pagerService: PagerService) { }

	ngOnInit() {
	}

	formatarUrl(catalogoUrl:string,filter:string,limit:number,offset:number) {
		this.url = `${catalogoUrl}?filter="${filter}"&limit=${limit}&offset=${offset}`;
		this.catalogoUrl = catalogoUrl;
		this.limit = limit;
		this.offset = offset;
		this.filter = filter;
		return this.url;
	}

	setPage(page: number, pageSize: number = 10) {
		if(this.pager.totalPages != 0) {
			if (page < 1 || page > this.pager.totalPages) {
				return;
			}
		}
		
		if(this.pager.currentPage === this.pager.totalPages -1 && this.pager.currentPage !== undefined) {
			this.offset = this.limit+1;
			this.limit = this.limit+this.limit;
			this.url = `${this.catalogoUrl}?filter="${this.filter}"&limit=${this.limit}&offset=${this.offset}`;
			if(this.updatePaginator) {
				this.pagerService.getUrl (this.url)
					.subscribe (response => {
						this.pager = this.pagerService.getPager (this.allItems.length, page, pageSize);
						this.pagedItems = this.allItems.slice (this.pager.startIndex, this.pager.endIndex + 1);
						this.updatePaginator = response;
					})
			} else {
				this.pager = this.pagerService.getPager (this.allItems.length, page, pageSize);
				this.pagedItems = this.allItems.slice (this.pager.startIndex, this.pager.endIndex + 1);
			}
		}else {
			this.pager = this.pagerService.getPager(this.allItems.length, page, pageSize);
			this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
		}


	}
    
}

