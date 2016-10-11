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
var sitemap_service_js_1 = require('../service/sitemap_service.js');
var NavigatorController = (function () {
    function NavigatorController(sitemapService) {
        this.sitemapService = sitemapService;
        this.sitemap = this.sitemapService.getSitemap();
        this.current = this.sitemap;
        this.breadcrumb = this.get_breadcrumb(this.current);
    }
    NavigatorController.prototype.go = function (item) {
        this.current = item;
        this.breadcrumb = this.get_breadcrumb(this.current);
    };
    NavigatorController.prototype.get_breadcrumb = function (item) {
        return this.make_breadcrumb(item, []);
    };
    NavigatorController.prototype.make_breadcrumb = function (item, result) {
        if (item.owner != null) {
            this.make_breadcrumb(item.owner, result);
        }
        result.push(item);
        return result;
    };
    NavigatorController = __decorate([
        core_1.Component({
            selector: 'navigator',
            providers: [sitemap_service_js_1.SitemapService],
            templateUrl: 'modules/dashboard/web/navigator.html'
        }), 
        __metadata('design:paramtypes', [sitemap_service_js_1.SitemapService])
    ], NavigatorController);
    return NavigatorController;
}());
exports.NavigatorController = NavigatorController;
//# sourceMappingURL=navigator_controller.js.map