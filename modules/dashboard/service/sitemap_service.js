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
var SitemapService = (function () {
    function SitemapService() {
    }
    SitemapService.prototype.getSitemap = function () {
        var sitemap = { "name": "dashboard",
            "title": "Dashboard",
            "url": "/portal/dashboard",
            "image_url": "modules/dashboard/img/pedidos.png",
            "items": [{ "name": "aplicativos",
                    "title": "Aplicativos",
                    "url": "/portal/dashboard/meu_portal/aplicativos",
                    "image_url": "modules/dashboard/img/item.png",
                    "items": [{ "name": "simar",
                            "title": "SIMAR",
                            "url": "/portal/dashboard/meu_portal/aplicativos/simar",
                            "image_url": "modules/dashboard/img/pedidos.png"
                        },
                        { "name": "sitab",
                            "title": "SITAB",
                            "url": "/portal/dashboard/meu_portal/aplicativos/sitab",
                            "image_url": "modules/dashboard/img/item.png"
                        },
                        { "name": "siger",
                            "title": "SIGER",
                            "url": "/portal/dashboard/meu_portal/aplicativos/siger",
                            "image_url": "modules/dashboard/img/relatorios.png"
                        }]
                },
                { "name": "configuracoes",
                    "title": "Configurações",
                    "url": "/portal/dashboard/meu_portal/configuracoes",
                    "image_url": "modules/dashboard/img/item.png"
                }]
        };
        this.make_pointers(null, sitemap);
        return sitemap;
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
        __metadata('design:paramtypes', [])
    ], SitemapService);
    return SitemapService;
}());
exports.SitemapService = SitemapService;
//# sourceMappingURL=sitemap_service.js.map