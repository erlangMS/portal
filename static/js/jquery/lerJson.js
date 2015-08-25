// Classe para chamar o Json.
function json(){
	var qtd;
	var retorno;

	// Resgatar valores.
	json.prototype.resgatarValores = $(function($){
		$('#resultado').html('Carregando dados...');

		// Estrutura de resultado.
		$.getJSON('catalogo.json', function(data){
			this.qtd = data.ppca.length;
			this.retorno = '';

			for (i = 0; i < this.qtd; i++){
				this.retorno += 'Serviço: ' + data.ppca[i].service + '<br>';
				this.retorno += 'Comentários: ' + data.ppca[i].comment + '<br>';
				this.retorno += 'Owner: ' + data.ppca[i].owner + ' - ';
				this.retorno += 'Versão: ' + data.ppca[i].version + '<br>';
				
				this.retorno += 'url: ' + data.ppca[i].url + '<br>';
				this.retorno += 'async: ' + data.ppca[i].async + '<br>';
				this.retorno += 'type: ' + data.ppca[i].type + '<br>';
				this.retorno += 'url_callback: ' + data.ppca[i].url_callback + '<br>';
				this.retorno += 'use_re: ' + data.ppca[i].use_re + '<br> <hr>';
				
				
				
			}

			$('#resultado').html(this.retorno);
		});

	})

}

// Objeto.
var obj = new json();
obj.resgatarValores();
