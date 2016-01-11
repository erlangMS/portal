describe("Pergunta", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue obter uma lista de perguntas", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta",
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


 
 it("Verifica se consegue incluir, modificar, pesquisar e excluir um cadastro de pergunta", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	//
	// Cadastrar categoria de teste
	//

	// vamos precisar de uma categoria para a pergunta
	var objCategoria = {"denominacao" : "Dados Familiares Teste "+ testeId};
	
	// tenta incluir categoria da pergunta
	var result = $.ajax({
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

	//
	// Cadastrar pergunta de teste
	//
	
	// define os dados do cadastro
	var objPergunta = {"enunciado":"Voce tem moradia própria? Teste "+ testeId, 
					   "tipoResposta":2,  // tipo escolha uma
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
	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();
	var idPergunta = result.responseJSON.id;
	var objInserido = result.responseJSON;


	//
	// Cadastra as respostas sim e não
	//

	var objRespostaSim = {"descricao":"Sim", 
						  "pergunta":idPergunta,
						  "valorResposta": 1}

	var objRespostaNao = {"descricao":"Não", 
						  "pergunta":idPergunta,
						  "valorResposta": 2}

	// tenta incluir resposta sim
	result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta/"+ idPergunta + "/resposta",
					data : JSON.stringify(objRespostaSim),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();
	var idRespostaSim = result.responseJSON.id;

	// tenta incluir resposta não
	result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta/"+ idPergunta + "/resposta",
					data : JSON.stringify(objRespostaNao),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();
	var idRespostaNao = result.responseJSON.id;
		

	//
	// Modificar a pergunta
	//

	// vamos fazer uma modificação na pergunta
	objUpdate = objInserido;
	objUpdate.enunciado = objUpdate.enunciado + "(update)";
	objUpdate.categoria = idCategoria;
	objUpdate.tipoResposta = 2;

	// tenta modificar
	result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta/"+ objUpdate.id,
					data : JSON.stringify(objUpdate),
					type: "PUT",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// faz a pesquisa
	result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta/"+ objInserido.id,
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// vamos apagar a resposta sim
	result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta/"+ idPergunta + "/resposta/"+ idRespostaSim,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// vamos apagar a resposta não
	result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta/"+ idPergunta + "/resposta/"+ idRespostaNao,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// vamos apagar o registro do teste da pergunta
	result = $.ajax({
					url:  "http://localhost:2301/questionario/pergunta/"+ objInserido.id,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	
	// vamos apagar o registro do teste da categoria
	result = $.ajax({
					url:  "http://localhost:2301/questionario/categoria_pergunta/"+ idCategoria,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
 });


 
});
