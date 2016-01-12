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
	var idAluno = result.responseJSON.id;

	//
	// Cadastro questionário para teste
	//

	// define os dados do cadastro de questionário
	var objQuestionario = {"denominacao":"questionário de teste "+ testeId,
						   "dataInicio":"1/12/2015", 
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
	var idQuestionario = result.responseJSON.id;

	//
	// Cadastro categoria para pergunta
	//


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
	var idCategoria = result.responseJSON.id;
	
	
	//
	// Cadastro pergunta 1 para o questionário
	//

	// define os dados da pergunta
	var objPergunta01 = {"enunciado":"Voce tem moradia própria? pergunta 1 do teste. Testeid "+ testeId, 
					     "tipoResposta":2,  // pergunta de uma escolha
					     "categoria": idCategoria}


	// tenta incluir pergunta 1
	result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta",
					data : JSON.stringify(objPergunta01),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	var idPergunta1 = result.responseJSON.id;
	
	
	//
	// Cadastra as respostas sim e não da pergunta 1 (tipo escolha uma)
	//

	var objRespostaSim = {"descricao":"Sim", 
						  "pergunta":idPergunta1,
						  "valorResposta": 1}

	var objRespostaNao = {"descricao":"Não", 
						  "pergunta":idPergunta1,
						  "valorResposta": 2}

	// tenta incluir resposta sim
	result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta/"+ idPergunta1 + "/resposta",
					data : JSON.stringify(objRespostaSim),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	var idRespostaSim = result.responseJSON.id;

	// tenta incluir resposta não
	result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta/"+ idPergunta1 + "/resposta",
					data : JSON.stringify(objRespostaNao),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	var idRespostaNao = result.responseJSON.id;
		
		
	//
	// Cadastro pergunta 2 para o questionário
	//
		
		
	// define os dados da pergunta 2
	var objPergunta2 = {"enunciado":"Porque você deve receber auxílio socioeconomico? TesteId "+ testeId, 
						"tipoResposta":1,  // eh pergunta subjetiva
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
	var idPergunta2 = result.responseJSON.id;


	//
	// Vincular pergunta 1 e 2 ao questionário
	//
	
	// vincular a pergunta 1 ao questionário
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
			

	// vincular a pergunta 2 ao questionário
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


	//
	// cadastro do estudo socioeconomico
	// 
	

	// define os dados do cadastro estudo socioeconomico
	var objEstudo = {"periodo":"20141", 
					 "dataHora":"15/1/2015", 
					 "aluno":idAluno, 
					 "questionario":idQuestionario}
	
	// tenta incluir estudo		   
	var result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico",
					data : JSON.stringify(objEstudo),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	var objEstudoInserido = result.responseJSON;
	var idEstudo = objEstudoInserido.id;

	objEstudoUpdate = objEstudoInserido;
	objEstudoUpdate.dataHora = "1/1/2015";
	objEstudoUpdate.periodo = "20151";
	objEstudoUpdate.aluno = idAluno; 
	objEstudoUpdate.questionario = idQuestionario;

	// tenta modificar		   
	result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ idEstudo,
					data : JSON.stringify(objEstudoUpdate),
					type: "PUT",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// tenta pesquisar
	result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ idEstudo,
					data : JSON.stringify(objEstudoUpdate),
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);


	//
	// responder as duas perguntas do estudo socioeconomico
	// 

	// responder a pergunta 1 que eh uma escolha
	var objResposta1Estudo = {"estudo":idEstudo, 
							   "dataHora":"1/1/2014", 
							   "pergunta":idPergunta1, 
							   "resposta":idRespostaNao,
							   "assistenteSocial":"Everton"}

	result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ idEstudo + "/resposta",
					data : JSON.stringify(objResposta1Estudo),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	var idResposta1Estudo = result.responseJSON.id;


	// responder a pergunta 2 que eh uma escolha
	var objResposta2Estudo = {"estudo":idEstudo, 
							   "dataHora":"1/1/2014", 
							   "pergunta":idPergunta2, 
							   "respostaSubjetiva":"Deve receber beneficio porque...",
							   "assistenteSocial":"Everton"}

	result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ idEstudo + "/resposta",
					data : JSON.stringify(objResposta2Estudo),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	var idResposta2Estudo = result.responseJSON.id;


	//
	// Vamos apagar os registros do estudo socioeconomico
	//
	
	// vamos apagar a resposta 1 do estudo de teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ idEstudo + "/resposta/"+ idResposta1Estudo,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// vamos apagar a resposta 2 do estudo de teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ idEstudo + "/resposta/"+ idResposta2Estudo,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// vamos apagar o registro do estudo de teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ idEstudo,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);


	// 
	// vamos desvincular as perguntas do questionário
	//

	// desvincular a pergunta 1 do questionário
	result = $.ajax({
					url:  "http://localhost:2301/questionario/questionario/" + idQuestionario +  "/pergunta/"+ idPergunta1,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// desvincular a pergunta 2 do questionário
	result = $.ajax({
					url:  "http://localhost:2301/questionario/questionario/" + idQuestionario +  "/pergunta/"+ idPergunta2,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);


	// 
	// vamos apagar o questionário
	//

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


	// 
	// vamos apagar as perguntas
	//

	// apagar a resposta sim da pergunta 1
	result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta/"+ idPergunta1 + "/resposta/"+ idRespostaSim,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// apagar a resposta não da pergunta 1
	result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta/"+ idPergunta1 + "/resposta/"+ idRespostaNao,
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


	// 
	// vamos apagar a categoria de pergunta
	//


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
