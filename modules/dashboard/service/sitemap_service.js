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
var http_1 = require('@angular/http');
// Import RxJs required methods
require('rxjs/add/operator/map');
var SitemapService = (function () {
    function SitemapService(http) {
        this.http = http;
    }
    SitemapService.prototype.getSitemap = function () {
        var _this = this;
        return this.http.get("/portal/sitemap.json")
            .map(function (res) {
            var sitemap = res.json();
            _this.make_pointers(null, sitemap);
            return sitemap;
        });
    };
    SitemapService.prototype.make_pointers = function (owner, item) {
        item.owner = owner;
        if (item.items != null) {
            for (var i in item.items) {
                var sub_item = item.items[i];
                this.make_pointers(item, sub_item);
            }
        }
    };
    SitemapService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SitemapService);
    return SitemapService;
}());
exports.SitemapService = SitemapService;
//# sourceMappingURL=sitemap_service.js.map