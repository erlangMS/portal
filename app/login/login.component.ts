import { Component } from '@angular/core';
import { AuthenticationService } from 'seguranca';

@Component({
	selector: 'login',
	providers: [],
	templateUrl: 'app/login/login.html'
})
export class LoginComponent {

	private model: any = {};
  	
	constructor(private authenticationService: AuthenticationService ) {
	}
  	
	ngOnInit() {
    }

	login() {
		this.authenticationService.login('http://127.0.0.1:2301/authorize?grant_type=password&username='+this.model.username+'&password='+this.model.password,'')
			.subscribe(result => {
					if (result === true) {
						let sessionTime = JSON.parse(localStorage.getItem('currentUser'));
						this.authenticationService.periodicIncrement(sessionTime.expires_in);
					}
				},
				err  =>  {
					console.log("Erro!!");
				}
			);
		
	}

}


