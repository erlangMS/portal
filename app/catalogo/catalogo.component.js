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
var angular2_modal_1 = require('angular2-modal');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var exemplos_url_servico_component_1 = require('./exemplos_url_servico.component');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var angular2_datatable_1 = require("angular2-datatable");
var catalogo_1 = require('./catalogo');
var main_1 = require('../dashboard/main');
var CatalogoComponent = (function () {
    function CatalogoComponent(http, modal, vcRef, pagerService, rest) {
        var _this = this;
        this.http = http;
        this.modal = modal;
        this.pagerService = pagerService;
        this.rest = rest;
        this.loading = false;
        this.catalogoUrl = "/auth/user";
        this.catalogoOwnerUrl = "/catalog/owner";
        this.operacao = "pesquisa";
        this.ult_operacao = "pesquisa";
        this.owner = "";
        this.filterQuery = "";
        this.rowsOnPage = 10;
        this.sortBy = "email";
        this.sortOrder = "asc";
        this.owner_list = null;
        this.language_list = [{ "name": "erlang", "title": "Linguagem Erlang" },
            { "name": "java", "title": "Linguagem Java" }];
        this.authentication_list = [{ "name": "", "title": "Sem autenticação" },
            { "name": "basic", "title": "Protocolo HTTP Basic" },
            { "name": "oauth", "title": "Protocolo Oauth 2.0" }];
        this.type_list = [{ name: "GET", title: "Obter (verbo HTTP GET)" },
            { name: "POST", title: "Incluir (verbo HTTP POST)" },
            { name: "PUT", title: "Alterar (verbo HTTP PUT)" },
            { name: "DELETE", title: "Excluir (DELETE)" }
        ];
        this.model = new catalogo_1.Catalogo();
        // pager object
        this.pager = {};
        this.sortByWordLength = function (a) {
            return a.city.length;
        };
        this.onPageChangeSubscriber = function (event) {
            alert("ok");
        };
        modal.overlay.defaultViewContainer = vcRef;
        // busca os owners
        this.http.get(this.catalogoOwnerUrl)
            .catch(this.handleError)
            .subscribe(function (data) {
            setTimeout(function () {
                _this.owner_list = data.json();
            }, 1000);
        });
    }
    CatalogoComponent.prototype.ngOnInit = function () {
    };
    CatalogoComponent.prototype.ngAfterViewInit = function () {
        var cat = this.rest.from("/catalog");
    };
    CatalogoComponent.prototype.toInt = function (num) {
        return +num;
    };
    CatalogoComponent.prototype.voltar = function () {
        this.operacao = this.ult_operacao;
        this.ult_operacao = "pesquisa";
    };
    CatalogoComponent.prototype.pesquisar = function () {
        var _this = this;
        this.loading = true;
        this.ult_operacao = this.operacao;
        this.operacao = "listagem";
        var filter = "{}";
        var limit = 100;
        var offset = 1;
        var url = this.catalogoUrl + "?filter=\"" + filter + "\"&limit=" + limit + "&offset=" + offset;
        this.http.get(url)
            .catch(this.handleError)
            .subscribe(function (data) {
            setTimeout(function () {
                // set items to json response
                _this.allItems = data.json();
                // initialize to page 1
                _this.setPage(1);
                _this.data = data.json();
                _this.loading = false;
            }, 1000);
        });
    };
    CatalogoComponent.prototype.novo = function () {
        this.ult_operacao = this.operacao;
        this.operacao = "edicao";
    };
    CatalogoComponent.prototype.openDialogExemplos = function () {
        return this.modal.open(exemplos_url_servico_component_1.CustomModal, angular2_modal_1.overlayConfigFactory({}, bootstrap_1.BSModalContext));
    };
    CatalogoComponent.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            fpc.mensagem(body);
            errMsg = body;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    CatalogoComponent.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    CatalogoComponent.prototype.salvar = function () {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.model.name = this.model.url;
        this.model.public = true;
        this.http.post(this.catalogoUrl, this.model, options)
            .map(this.extractData)
            .catch(this.handleError)
            .subscribe(function (cat) { return _this.data.push(cat); }, function (error) { return _this.errorMessage = error; });
    };
    CatalogoComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    __decorate([
        core_1.Input("mfTable"), 
        __metadata('design:type', angular2_datatable_1.DataTable)
    ], CatalogoComponent.prototype, "mfTable", void 0);
    CatalogoComponent = __decorate([
        core_1.Component({
            selector: 'catalogo',
            templateUrl: 'app/catalogo/catalogo.html',
            providers: [bootstrap_1.Modal]
        }), 
        __metadata('design:paramtypes', [http_1.Http, bootstrap_1.Modal, core_1.ViewContainerRef, main_1.PagerService, main_1.EmsRestClient])
    ], CatalogoComponent);
    return CatalogoComponent;
}());
exports.CatalogoComponent = CatalogoComponent;
//# sourceMappingURL=catalogo.component.js.map