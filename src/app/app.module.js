"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var http_2 = require("@angular/http");
var common_2 = require("@angular/common");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var seguranca_1 = require("seguranca");
var file_service_1 = require("./_file/file.service");
var home_module_1 = require("./home/home.module");
var tipo_questionario_module_1 = require("./tipo-questionario/tipo-questionario.module");
var questionario_module_1 = require("./questionario/questionario.module");
var categoria_pergunta_module_1 = require("./categoria-pergunta/categoria-pergunta.module");
var pergunta_module_1 = require("./pergunta/pergunta.module");
var opcao_module_1 = require("./opcao/opcao.module");
var resposta_module_1 = require("./resposta/resposta.module");
var visualizar_questionario_module_1 = require("./visualizar-questionario/visualizar-questionario.module");
var filtro_dinamico_module_1 = require("./questionario-dinamico/filtro-dinamico.module");
var questionario_dinamico_module_1 = require("./questionario-dinamico/questionario-dinamico.module");
var navbar_module_1 = require("./shared/navbar/navbar.module");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
require("hammerjs");
var navbar_component_1 = require("./shared/navbar/navbar.component");
var pager_module_1 = require("./paginator/pager.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, home_module_1.HomeModule, common_1.CommonModule, navbar_module_1.NavbarModule, app_routing_1.routing,
            material_1.MaterialModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, animations_1.BrowserAnimationsModule,
            tipo_questionario_module_1.TipoQuestionarioModule, questionario_module_1.QuestionarioModule, categoria_pergunta_module_1.CategoriaPerguntaModule, pergunta_module_1.PerguntaModule, opcao_module_1.OpcaoModule, resposta_module_1.RespostaModule, visualizar_questionario_module_1.VisualizarQuestionarioModule,
            filtro_dinamico_module_1.FiltroDinamicoModule, questionario_dinamico_module_1.QuestionarioDinamicoModule, pager_module_1.PagerModule],
        declarations: [app_component_1.AppComponent, navbar_component_1.NavbarComponent, seguranca_1.NavigationComponent],
        providers: [file_service_1.FileService, seguranca_1.AuthenticationService, seguranca_1.AuthGuard, seguranca_1.RedirectService,
            {
                provide: http_2.RequestOptions,
                useClass: seguranca_1.DefaultHeaders
            },
            {
                provide: common_2.LocationStrategy,
                useClass: common_2.HashLocationStrategy
            }
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map