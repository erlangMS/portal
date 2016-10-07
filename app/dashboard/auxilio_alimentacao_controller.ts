import {Component} from 'angular2/core';

@Component({
	selector: 'auxilio-alimentacao-controller',
	templateUrl: 'web/dashboard/cadastro_auxilio_alimentacao.html'
})
export class AuxilioAlimentacaoController { 
	constructor(){
		this.status = "insert";
		this.filtro = {"id":1,
					   "nome" : "Everton Agilar",
					   "cidade" : "Brasilia"
			  };

		this.lista= [{"id":1,
					   "nome" : "Everton Agilar",
					   "cidade" : "Brasilia"
					  },
					  {"id":2,
							   "nome" : "Joao",
							   "cidade" : "Ceilandia"
					  }];

	
	}

	getStatusCaption(){
		if (this.status == "insert"){
			return "Inserindo";
		}else{
			return "Visualizando";
		}
	}
	
	getButtonCaption(){
		if (this.status == "insert"){
			return "Salvar";
		}else{
			return "Pesquisar"
		}
	}
	
	acaoBotao(){
		if (this.status == "insert"){
			this.status = "view";
		}else{
			this.status = "insert";
		}
	}
	
	acaoInclui(){
		this.lista= [{"id":1,
					   "nome" : "Everton Agilar",
					   "cidade" : "Brasilia"
					  },
					  {"id":2,
							   "nome" : "Joao",
							   "cidade" : "Ceilandia"
					  },
					  {"id" : 3, "nome": "Danilo", "cidade": "Brasilia"}];
	}
	
	acaoRemove(){
		if (confirm("Você deseja excluir")){
			this.lista= [{"id":1,
						   "nome" : "Everton Agilar",
						   "cidade" : "Brasilia"
						  },
						  {"id":2,
								   "nome" : "Joao",
								   "cidade" : "Ceilandia"
						  }];
		}
	
	}


	acaoRemoveItem(item){
		if (confirm("Você deseja excluir "+ item.nome)){
			this.lista= [{"id":1,
						   "nome" : "Everton Agilar",
						   "cidade" : "Brasilia"
						  },
						  {"id":2,
								   "nome" : "Joao",
								   "cidade" : "Ceilandia"
						  }];
		}
	
	}

}


