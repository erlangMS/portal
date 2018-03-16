"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var ServiceUtil = (function () {
    function ServiceUtil() {
    }
    // extrai lista da resposta http
    ServiceUtil.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    // manipula erros da resposta http
    ServiceUtil.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.message || JSON.stringify(body);
            errMsg = err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        if (errMsg == "{\"isTrusted\":true}") {
            errMsg = "ERRO: Servidor de Dados Indisponível.";
        }
        else if (errMsg == "{\"error\":\"eunavailable_service\"}") {
            errMsg = "ERRO: Servidor de Dados Indisponível";
        }
        return Observable_1.Observable.throw(errMsg);
    };
    return ServiceUtil;
}());
exports.ServiceUtil = ServiceUtil;
//# sourceMappingURL=service.util.js.map