"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var seguranca_1 = require("seguranca");
require("rxjs/add/operator/map");
var FileService = (function (_super) {
    __extends(FileService, _super);
    function FileService(http, redirectService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.redirectService = redirectService;
        return _this;
    }
    FileService.prototype.startRedirect = function () {
        var _this = this;
        return this.http.get('/questionario/config.json')
            .map(function (resultado) {
            var result = resultado.json();
            var location = window.location.href.split(':');
            var port = location[2].split('/');
            localStorage.setItem('externalFile', (window.location.protocol + '//' + window.location.hostname + ':' + port[0] + '/questionario/config.json'));
            _this.redirectService.startInitVerifySessionToken()
                .subscribe(function (res) {
                return true;
            });
        });
    };
    FileService.prototype.onlyRedirectService = function () {
        this.redirectService.startInitVerifySessionToken();
    };
    return FileService;
}(seguranca_1.DefaultHeaders));
FileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, seguranca_1.RedirectService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map