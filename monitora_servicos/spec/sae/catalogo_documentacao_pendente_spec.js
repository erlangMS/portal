describe("DocumentacaoPendente", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue obter uma lista de documentação pendente do SAE", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/sae/documentacao_pendente",
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


 
 it("Verifica se consegue incluir, modificar, pesquisar e excluir um cadastro de documentação pendente no SAE", function() {

	var idDocumentacao = 1;
	var idEstudo = 1;

	// define os dados do cadastro documentação pendente
	var objDocPendente = {"dataHora":"01/10/2015 15:00",
						  "documentacao" : idDocumentacao,
						  "estudo" : idEstudo,
						  "entregue" : true};
	
	// tenta incluir documentacao pendente		   
	var result = $.ajax({
					url:  "http://localhost:2301/sae/documentacao_pendente",
					data : JSON.stringify(objDocPendente),
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
			objUpdate.ebntregue = false;

			// tenta modificar		   
			result = $.ajax({
							url:  "http://localhost:2301/sae/documentacao_pendente/"+ objInserido.id,
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
							url:  "http://localhost:2301/sae/documentacao_pendente/"+ objInserido.id,
							type: "GET",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);


			// modificação feita, vamos apagar o registro do teste
			result = $.ajax({
							url:  "http://localhost:2301/sae/documentacao_pendente/"+ objInserido.id,
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
