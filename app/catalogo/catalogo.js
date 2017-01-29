"use strict";
var Catalogo = (function () {
    function Catalogo() {
        this.lang = "erlang";
        this.version = "1.0.0";
        this.owner = "ems-bus";
        this.type = "GET";
        this.service = "br.unb.unb_aula.facade.PessoaFacade:findById";
        this.debug = false;
        this.public = true;
    }
    return Catalogo;
}());
exports.Catalogo = Catalogo;
//# sourceMappingURL=catalogo.js.map