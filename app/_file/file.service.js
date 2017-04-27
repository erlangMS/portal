"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var seguranca_1 = require('seguranca');
require('rxjs/add/operator/map');
var FileService = (function (_super) {
    __extends(FileService, _super);
    function FileService(http, redirectService) {
        _super.call(this);
        this.http = http;
        this.redirectService = redirectService;
    }
    FileService.prototype.startRedirect = function () {
        var _this = this;
        return this.http.get('/portal/config.json')
            .map(function (resultado) {
            var result = resultado.json();
            localStorage.setItem('externalFile', (result.protocol + '://' + window.location.hostname + ':' + result.port + '/portal/config.json'));
            _this.redirectService.initVerificationRedirect();
            return true;
        });
    };
    FileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, seguranca_1.RedirectService])
    ], FileService);
    return FileService;
}(seguranca_1.DefaultHeaders));
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map