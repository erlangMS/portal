import {Component} from 'angular2/core';

@Component({
	selector: 'breadcrumb',
	templateUrl: 'web/dashboard/breadcrumb.html'
})
export class Breadcrumb { 
	constructor(){
		this.lista= [{"id":1,
					   "name" : "Meu Portal",
					   "url" : "/portal/dashboard"
					  },
					  {"id":2,
					    "name" : "Aplicativos",
						"url" : "/portal/dashboard/aplicativos"
					  }];

	
	}

}


