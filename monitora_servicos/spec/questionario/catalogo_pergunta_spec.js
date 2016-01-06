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
	
	// Se conseguiu cadastrar uma categoria, seque adiante para cadastrar a pergunta...
	if (result.status == 201 && idCategoria != undefined){

		// define os dados do cadastro
		var objPergunta = {"enunciado":"Voce tem moradia própria? Teste "+ testeId, 
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
		expect(result.status).toBe(201);
		expect(result.responseJSON).toBeDefined();

		var objInserido = result.responseJSON;

		// se incluiu, tenta modificar o registro
		if (result.status == 201 && objInserido.id != undefined){
			
				// vamos fazer uma modificação no registro
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
		}
		
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
	}
 });


 
});
