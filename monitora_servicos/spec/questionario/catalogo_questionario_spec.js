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

	var testeId = Math.floor(Math.random() * 99999999);

	// define os dados do cadastro
	var obj = {"denominacao":"questionário de teste "+ testeId,
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

	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();

	var objInserido = result.responseJSON;

	// se incluiu, tenta modificar o registro
	if (result.status == 201 && objInserido.id != undefined){
		
			// vamos fazer uma modificação no registro
			objUpdate = objInserido;
			objUpdate.denominacao = objUpdate.denominacao + "(update)";
			objUpdate.dataFim = "31/12/2015";

			// tenta modificar
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

	var testeId = Math.floor(Math.random() * 99999999);

	// define os dados do cadastro
	var obj = {"denominacao":"questionário de teste "+ testeId,
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

	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();

	var idQuestionario = result.responseJSON.id;

	// faz a pesquisa
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/questionario/"+ idQuestionario,
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	
	// é esperado o retorno de um registro
	expect(result.status).toBe(200);

	// vamos apagar o registro do teste
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/questionario/"+ idQuestionario,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	
 });


 it("Verifica se consegue vincular duas perguntas em um questionário", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	// define os dados do cadastro
	var objQuestionario = {"denominacao":"questionário de teste para vincular pergunta. TesteId "+ testeId,
						   "dataInicio":"30/03/1983", 
						   "dataFim":"30/12/1983"}
	
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

	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();

	var idQuestionario = result.responseJSON.id;

	// se incluiu o questionário, vamos vincular duas perguntas ao questionário
	if (result.status == 201 && idQuestionario != undefined){
		
			// precisamos cadastrar primeiramente uma categoria de pergunta
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
			expect(result.status).toBe(201);
			expect(result.responseJSON).toBeDefined();
			
			var idCategoria = result.responseJSON.id;
			
			// se conseguiu cadastrar uma categoria, seque adiante para cadastrar a pergunta...
			if (result.status == 200 && idCategoria != undefined){
			
				// 
				// precisamos criar duas peguntas de teste para vincular ao questionário
				//
				
				// define os dados da pergunta
				var objPergunta = {"enunciado":"Voce tem moradia própria? pergunta 01 do teste. Testeid "+ testeId, 
								   "tipoResposta":1, 
								   "categoria": idCategoria}


				// tenta incluir pergunta 01
				result = $.ajax({
								url:  "http://localhost:2301/questionario/pergunta",
								data : JSON.stringify(objPergunta),
								type: "POST",
								contentType: "application/x-www-form-urlencoded; charset=UTF-8",
								dataType: "json",
								crossDomain: true,
								async: false
							});

				expect(result.status).toBe(201);
				expect(result.responseJSON).toBeDefined();
				
				var idPergunta1 = result.responseJSON.id;
				
				
				// define os dados da pergunta 02
				var objPergunta2 = {"enunciado":"Qual a sua escolaridade? pergunta 02 do teste. TesteId "+ testeId, 
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

				expect(result.status).toBe(201);
				expect(result.responseJSON).toBeDefined();
				
				var idPergunta2 = result.responseJSON.id;
			
			
				if (idPergunta1 != undefined && idPergunta2 != undefined){

					// finalmente, tenta vincular a pergunta 01 ao questionário
					result = $.ajax({
									url:  "http://localhost:2301/questionario/questionario/" + idQuestionario +  "/pergunta",
									data : JSON.stringify({"pergunta" : idPergunta1}),
									type: "POST",
									contentType: "application/x-www-form-urlencoded; charset=UTF-8",
									dataType: "json",
									crossDomain: true,
									async: false
								});
					expect(result.status).toBe(201);
					expect(result.responseJSON).toBeDefined();
					

					// vamos vinvular a pergunta 02..
					result = $.ajax({
									url:  "http://localhost:2301/questionario/questionario/" + idQuestionario +  "/pergunta",
									data : JSON.stringify({"pergunta" : idPergunta2}),
									type: "POST",
									contentType: "application/x-www-form-urlencoded; charset=UTF-8",
									dataType: "json",
									crossDomain: true,
									async: false
								});
					expect(result.status).toBe(201);
					expect(result.responseJSON).toBeDefined();

					// 
					// vamos apagar o questionário, desvincular as perguntas, apagar as perguntas e a categoria da pergunta...
					//

					// desvincular a pergunta 01 do questionário
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

					// desvincular a pergunta 02 do questionário
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
