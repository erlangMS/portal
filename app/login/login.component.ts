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

	}

}
