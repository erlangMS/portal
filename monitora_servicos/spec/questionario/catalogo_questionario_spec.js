describe("Questionario", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue obter uma lista de questionários", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/questionario",
					data : {},
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	if (result.status == 200){
		expect(result.responseJSON).toEqual(jasmine.any(Object));
	}
 });


 
 it("Verifica se consegue incluir, modificar e excluir um cadastro de questionário", function() {

	// define os dados do cadastro
	var obj = {"denominacao":"questionário de teste",
			   "dataInicio":"01/12/2015", 
			   "dataFim":"30/12/2015"}
	
	// tenta incluir		   
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/questionario",
					data : JSON.stringify(obj),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});

	// é esperado retorno HTTP 200 e um objeto inserido (verifica a presentaça do id)
	expect(result.status).toBe(200);
	expect(result.responseJSON).toBeDefined();

	var objInserido = result.responseJSON;

	// se incluiu, tenta modificar o registro
	if (result.status == 200 && objInserido.id != undefined){
		
			// vamos fazer uma modificação no registro
			objUpdate = objInserido;
			objUpdate.denominacao = "questionário de teste modificado!!!";
			objUpdate.dataFim = "15/12/2015";

			// tenta incluir		   
			var result = $.ajax({
							url:  "http://localhost:2301/questionario/questionario/"+ objUpdate.id,
							data : JSON.stringify(objUpdate),
							type: "PUT",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);

			// vamos apagar o registro do teste
			var result = $.ajax({
							url:  "http://localhost:2301/questionario/questionario/"+ objInserido.id,
							type: "DELETE",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);
	}
	
	
 });



 it("Verifica se consegue pesquisar um cadastro do questionário pelo id", function() {

	// faz a pesquisa
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/questionario/1",
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	
	// é esperado o retorno de um registro ou 404 (not found)
	expect(result.status).toBe(200);
	
 });


 it("Verifica se consegue vincular duas perguntas em um questionário", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	// define os dados do cadastro
	var objQuestionario = {"denominacao":"questionário de teste para vincular pergunta. TesteId "+ testeId,
						   "dataInicio":"30/03/1983", 
						   "dataFim":"30/06/1983"}
	
	// tenta incluir o questionário		   
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/questionario",
					data : JSON.stringify(objQuestionario),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});

	// é esperado retorno HTTP 200 e um questionário inserido (verifica a presentaça do id)
	expect(result.status).toBe(200);
	expect(result.responseJSON).toBeDefined();

	var idQuestionario = result.responseJSON.id;

	// se incluiu o questionário, vamos vincular duas perguntas ao questionário
	if (result.status == 200 && idQuestionario != undefined){
		
			// precisamos cadastrar uma categoria de pergunta
			var objCategoria = {"denominacao" : "Dados Familiares Teste. TesteId " + testeId};
			
			// tenta incluir categoria da pergunta
			result = $.ajax({
							url:  "http://localhost:2301/questionario/categoria_pergunta",
							data : JSON.stringify(objCategoria),
							type: "POST",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);
			expect(result.responseJSON).toBeDefined();
			
			var idCategoria = result.responseJSON.id;
			
			// se conseguiu cadastrar uma categoria, seque adiante para cadastrar a pergunta...
			if (result.status == 200 && idCategoria != undefined){
			
				// 
				// precisamos criar duas peguntas de teste para vincular ao questionário
				//
				
				// define os dados da pergunta
				var objPergunta = {"enunciado":"Voce tem moradia própria? pergunta 1 do teste. Testeid "+ testeId, 
								   "tipoResposta":1, 
								   "categoria": idCategoria}


				// tenta incluir pergunta		   
				result = $.ajax({
								url:  "http://localhost:2301/questionario/pergunta",
								data : JSON.stringify(objPergunta),
								type: "POST",
								contentType: "application/x-www-form-urlencoded; charset=UTF-8",
								dataType: "json",
								crossDomain: true,
								async: false
							});

				// é esperado retorno HTTP 200 e um objeto inserido (verifica a presentaça do id)
				expect(result.status).toBe(200);
				expect(result.responseJSON).toBeDefined();
				
				var idPergunta1 = result.responseJSON.id;
				
				
				// define os dados da pergunta
				var objPergunta2 = {"enunciado":"Qual a sua escolaridade? pergunta 2 do teste. TesteId "+ testeId, 
								    "tipoResposta":1, 
								    "categoria": idCategoria}


				// tenta incluir pergunta		   
				result = $.ajax({
								url:  "http://localhost:2301/questionario/pergunta",
								data : JSON.stringify(objPergunta2),
								type: "POST",
								contentType: "application/x-www-form-urlencoded; charset=UTF-8",
								dataType: "json",
								crossDomain: true,
								async: false
							});

				// é esperado retorno HTTP 200 e um objeto inserido (verifica a presentaça do id)
				expect(result.status).toBe(200);
				expect(result.responseJSON).toBeDefined();
				
				var idPergunta2 = result.responseJSON.id;
			
			
				if (idPergunta1 != undefined && idPergunta2 != undefined){

					// finalmente, tenta vincular a pergunta 1 ao questionário
					result = $.ajax({
									url:  "http://localhost:2301/questionario/questionario/" + idQuestionario +  "/pergunta",
									data : JSON.stringify({"pergunta" : idPergunta1}),
									type: "POST",
									contentType: "application/x-www-form-urlencoded; charset=UTF-8",
									dataType: "json",
									crossDomain: true,
									async: false
								});
					expect(result.status).toBe(200);
					expect(result.responseJSON).toBeDefined();
					

					// vamos vinvular a pergunta 2..
					result = $.ajax({
									url:  "http://localhost:2301/questionario/questionario/" + idQuestionario +  "/pergunta",
									data : JSON.stringify({"pergunta" : idPergunta2}),
									type: "POST",
									contentType: "application/x-www-form-urlencoded; charset=UTF-8",
									dataType: "json",
									crossDomain: true,
									async: false
								});
					expect(result.status).toBe(200);
					expect(result.responseJSON).toBeDefined();

					// 
					// vamos apagar o questionário, desvincular as perguntas, apagar a pergunta e a categoria da pergunta...
					//

					// desvincular a primeira pergunta do questionário
					result = $.ajax({
									url:  "http://localhost:2301/questionario/questionario/" + idQuestionario +  "/pergunta/"+ idPergunta1,
									type: "DELETE",
									contentType: "application/x-www-form-urlencoded; charset=UTF-8",
									dataType: "json",
									crossDomain: true,
									async: false
								});
					expect(result.status).toBe(200);
					expect(result.responseJSON).toBeDefined();

					// desvincular a segunda pergunta do questionário
					result = $.ajax({
									url:  "http://localhost:2301/questionario/questionario/" + idQuestionario +  "/pergunta/"+ idPergunta2,
									type: "DELETE",
									contentType: "application/x-www-form-urlencoded; charset=UTF-8",
									dataType: "json",
									crossDomain: true,
									async: false
								});
					expect(result.status).toBe(200);
					expect(result.responseJSON).toBeDefined();

					// apagar o questionário
					result = $.ajax({
									url:  "http://localhost:2301/questionario/questionario/"+ idQuestionario,
									type: "DELETE",
									contentType: "application/x-www-form-urlencoded; charset=UTF-8",
									dataType: "json",
									crossDomain: true,
									async: false
								});
					expect(result.status).toBe(200);

					// apagar a primeira pergunta
					result = $.ajax({
									url:  "http://localhost:2301/questionario/pergunta/"+ idPergunta1,
									type: "DELETE",
									contentType: "application/x-www-form-urlencoded; charset=UTF-8",
									dataType: "json",
									crossDomain: true,
									async: false
								});
					expect(result.status).toBe(200);

					// apagar a segunda pergunta
					result = $.ajax({
									url:  "http://localhost:2301/questionario/pergunta/"+ idPergunta2,
									type: "DELETE",
									contentType: "application/x-www-form-urlencoded; charset=UTF-8",
									dataType: "json",
									crossDomain: true,
									async: false
								});
					expect(result.status).toBe(200);

					// apagar a categoria da pergunta
					result = $.ajax({
									url:  "http://localhost:2301/questionario/categoria_pergunta/"+ idCategoria,
									type: "DELETE",
									contentType: "application/x-www-form-urlencoded; charset=UTF-8",
									dataType: "json",
									crossDomain: true,
									async: false
								});
					expect(result.status).toBe(200);

				}
			}
		}
	
	
 });


 
});
