"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var seguranca_1 = require('seguranca');
var LoginComponent = (function () {
    function LoginComponent(authenticationService) {
        this.authenticationService = authenticationService;
        this.model = {};
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authenticationService.login('http://127.0.0.1:2301/authorize?grant_type=password&username=' + this.model.username + '&password=' + this.model.password, '')
            .subscribe(function (result) {
            if (result === true) {
                var sessionTime = JSON.parse(localStorage.getItem('currentUser'));
                _this.authenticationService.periodicIncrement(sessionTime.expires_in);
            }
        }, function (err) {
            console.log("Erro!!");
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            providers: [],
            templateUrl: 'app/login/login.html'
        }), 
        __metadata('design:paramtypes', [seguranca_1.AuthenticationService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map