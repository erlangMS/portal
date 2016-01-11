describe("EstudoSocioEconomico", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue obter uma lista de estudo socioeconomico do SAE", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico",
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


 
 it("Verifica se consegue incluir, modificar, pesquisar e excluir um cadastro de estudo socioeconomico no SAE", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	//
	// Cadastrar aluno para teste
	//

	// define os dados do aluno
	var objAluno = {"nome":"Aluno Teste "+ testeId,
					"cpf":"1111111111",
					"senha" : "10/10/2015"};
	
	// tenta incluir aluno
	var result = $.ajax({
					url:  "http://localhost:2301/sigra/aluno",
					data : JSON.stringify(objAluno),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();
	var idAluno = result.responseJSON.id;

	//
	// Cadastro questionário para teste
	//

	// define os dados do cadastro de questionário
	var objQuestionario = {"denominacao":"questionário de teste "+ testeId,
						   "dataInicio":"01/12/2015", 
						   "dataFim":"30/12/2015"}
	
	// tenta incluir questionario		   
	result = $.ajax({
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
	
	// precisamos criar duas peguntas de teste para vincular ao questionário
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
	// cadastro do estudo socioeconomico
	// 
	

	// define os dados do cadastro estudo socioeconomico
	var obj = {"periodo":"20141", 
			   "dataHora":"01/01/2014", 
			   "aluno":idAluno, 
			   "questionario":idQuestionario}
	
	// tenta incluir estudo		   
	var result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico",
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

	objUpdate = objInserido;
	objUpdate.dataHora = "01/01/2015";
	objUpdate.periodo = "20151";
	objUpdate.aluno = idAluno; 
	objUpdate.questionario = idQuestionario;

	// tenta modificar		   
	result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ objInserido.id,
					data : JSON.stringify(objUpdate),
					type: "PUT",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// tenta pesquisar
	result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ objInserido.id,
					data : JSON.stringify(objUpdate),
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// responder a pergunta 01
	var objResposta01 = {"estudo":idEstudo, 
				         "dataHora":"01/01/2014", 
						 "pergunta":idPergunta01, 
						 "resposta":idResposta01}

	result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ objInserido.id + "/resposta",
					data : JSON.stringify(objUpdate),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	//
	// Vamos apagar os registros do estudo socioeconomico
	//
	
	// modificação feita, vamos apagar o registro do estudo de teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ objInserido.id,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);


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

	
	// 
	// vamos apagar o aluno de teste
	//
	
	// vamos apagar o registro do aluno de teste
	result = $.ajax({
					url:  "http://localhost:2301/sigra/aluno/"+ idAluno,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	
	
 });


 
});
