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
var sitemap_service_1 = require('../sitemap/sitemap.service');
var seguranca_1 = require('seguranca');
var NavigatorController = (function () {
    function NavigatorController(sitemapService, _ngZone, authGuard) {
        this.sitemapService = sitemapService;
        this._ngZone = _ngZone;
        this.authGuard = authGuard;
        this.sitemap = { "name": "dashboard",
            "title": "Dashboard",
            "url": "/portal/dashboard",
            "image_url": "modules/dashboard/img/pedidos.png",
            "items": [] };
        this.current = [];
        this.current_page = 1;
        this.current_url = undefined;
        this.breadcrumb = null;
        this.login = {
            "breadcrumb": "false",
            "component": "<login></login>",
            "name": "login",
            "title": "Entrar"
        };
    }
    NavigatorController.prototype.ngOnInit = function () {
        var _this = this;
        this.sitemapService.getSitemap().subscribe(function (res) {
            _this.sitemap = res;
            _this.current = _this.sitemap;
            _this.breadcrumb = _this.get_breadcrumb(_this.current);
        });
    };
    NavigatorController.prototype.ngAfterViewInit = function () {
    };
    NavigatorController.prototype.go = function (item) {
        var _this = this;
        if (this.authGuard.canActivate()) {
            if (item.items == undefined) {
                if (item.component == undefined || item.component == "") {
                    this.current = this.sitemap;
                }
                else {
                    this.current = item;
                    this.componente = item.component;
                    this.componente = "<login></login>";
                }
            }
            else {
                this.current = item;
            }
        }
        else {
            this.current = this.login;
            this.componente = "<login></login>";
        }
        this.breadcrumb = this.make_breadcrumb(this.current, []);
        // Executado após renderizar a tela para configurar os inputs com a biblioteca fpc
        this._ngZone.onMicrotaskEmpty
            .subscribe(function () {
            _this._ngZone.run(function () {
                _this._ngZone.run(function () {
                    fpc.configFields();
                });
            });
        });
    };
    NavigatorController.prototype.get_breadcrumb = function (item) {
        return this.make_breadcrumb(item, []);
    };
    NavigatorController.prototype.make_breadcrumb = function (item, result) {
        if (item.owner != null) {
            this.make_breadcrumb(item.owner, result);
        }
        if (item.name != "dashboard") {
            result.push(item);
        }
        return result;
    };
    NavigatorController.prototype.setCurrentPage = function (page) {
        this.current_page = parseInt(page);
    };
    NavigatorController = __decorate([
        core_1.Component({
            selector: 'navigator',
            providers: [sitemap_service_1.SitemapService],
            templateUrl: 'app/dashboard/navigator/navigator.html'
        }), 
        __metadata('design:paramtypes', [sitemap_service_1.SitemapService, core_1.NgZone, seguranca_1.AuthGuard])
    ], NavigatorController);
    return NavigatorController;
}());
exports.NavigatorController = NavigatorController;
//# sourceMappingURL=navigator.component.js.map