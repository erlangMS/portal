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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var pager_service_1 = require("./pager.service");
var PagerComponent = PagerComponent_1 = (function () {
    function PagerComponent(http, pagerService) {
        this.http = http;
        this.pagerService = pagerService;
        this.pager = {};
        this.updatePaginator = true;
    }
    PagerComponent.prototype.ngOnInit = function () {
    };
    PagerComponent.prototype.formatarUrl = function (catalogoUrl, filter, limit, offset) {
        this.url = catalogoUrl + "?filter=\"" + filter + "\"&limit=" + limit + "&offset=" + offset;
        this.catalogoUrl = catalogoUrl;
        this.limit = limit;
        this.offset = offset;
        this.filter = filter;
        return this.url;
    };
    PagerComponent.prototype.setPage = function (page) {
        var _this = this;
        if (this.pager.totalPages != 0) {
            if (page < 1 || page > this.pager.totalPages) {
                return;
            }
        }
        if (this.pager.currentPage === this.pager.totalPages - 1 && this.pager.currentPage !== undefined) {
            this.offset = this.limit + 1;
            this.limit = this.limit + this.limit;
            this.url = this.catalogoUrl + "?filter=\"" + this.filter + "\"&limit=" + this.limit + "&offset=" + this.offset;
            if (this.updatePaginator) {
                this.pagerService.getUrl(this.url)
                    .subscribe(function (response) {
                    _this.pager = _this.pagerService.getPager(PagerComponent_1.allItems.length, page);
                    _this.pagedItems = PagerComponent_1.allItems.slice(_this.pager.startIndex, _this.pager.endIndex + 1);
                    _this.updatePaginator = response;
                });
            }
            else {
                this.pager = this.pagerService.getPager(PagerComponent_1.allItems.length, page);
                this.pagedItems = PagerComponent_1.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
            }
        }
        else {
            this.pager = this.pagerService.getPager(PagerComponent_1.allItems.length, page);
            this.pagedItems = PagerComponent_1.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    };
    return PagerComponent;
}());
PagerComponent = PagerComponent_1 = __decorate([
    core_1.Component({
        selector: 'pager',
        templateUrl: 'app/paginator/pager.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http, pager_service_1.PagerService])
], PagerComponent);
exports.PagerComponent = PagerComponent;
var PagerComponent_1;
//# sourceMappingURL=pager.component.js.map