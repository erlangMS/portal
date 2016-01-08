describe("Documentacao", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue obter uma lista de documentação do SAE", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/sae/documentacao",
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


 
 it("Verifica se consegue incluir, modificar e excluir um cadastro de documentação no SAE", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	// define os dados do cadastro documentação
	var obj = {"denominacao": "Denominacao Teste "+ testeId};
	
	// tenta incluir		   
	var result = $.ajax({
					url:  "http://localhost:2301/sae/documentacao",
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

			objUpdate = objInserido;
			objUpdate.denominacao = objUpdate.denominacao + "(update)";

			// tenta incluir		   
			var result = $.ajax({
							url:  "http://localhost:2301/sae/documentacao/"+ objUpdate.id,
							data : JSON.stringify(objUpdate),
							type: "PUT",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);


			// modificação feita, vamos apagar o registro do teste
			var result = $.ajax({
							url:  "http://localhost:2301/sae/documentacao/"+ objInserido.id,
							type: "DELETE",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);
	}
	
	
 });


 it("Verifica se consegue pesquisar um cadastro documentação pelo id no SAE", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	// define os dados do cadastro documentação
	var obj = {"denominacao": "denominacao "+ testeId};
	
	// tenta incluir para o teste da pesquisa		   
	var result = $.ajax({
					url:  "http://localhost:2301/sae/documentacao",
					data : JSON.stringify(obj),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();

	var idDocumentacao = result.responseJSON.id;

	// faz a pesquisa
	result = $.ajax({
					url:  "http://localhost:2301/sae/documentacao/"+ idDocumentacao,
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	
	// é esperado o retorno de um registro
	expect(result.status).toBe(200);

	// vamos apagar o registro do teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/documentacao/"+ idDocumentacao,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

 });

 
});
