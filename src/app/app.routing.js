"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
exports.routes = [
    {
        "path": "home",
        "loadChildren": "./home/home.module#HomeModule"
    },
    {
        "path": "tipoquestionariolist",
        "loadChildren": "./tipo-questionario/tipo-questionario.module#TipoQuestionarioModule"
    },
    {
        "path": "questionariolist",
        "loadChildren": "./questionario/questionario.module#QuestionarioModule"
    },
    {
        "path": "categoriaperguntalist",
        "loadChildren": "./categoria-pergunta/categoria-pergunta.module#CategoriaPerguntaModule"
    },
    {
        "path": "perguntalist",
        "loadChildren": "./pergunta/pergunta.module#PerguntaModule"
    },
    {
        "path": "respostalist",
        "loadChildren": "./resposta/resposta.module#RespostaModule"
    },
    {
        "path": "visualizar",
        "loadChildren": "./visualizar-questionario/visualizar-questionario.module#VisualizarQuestionarioModule"
    },
    {
        "path": "",
        "redirectTo": "home",
        "pathMatch": "full"
    }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routing.js.map