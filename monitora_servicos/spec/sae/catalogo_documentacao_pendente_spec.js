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


 
 it("Verifica se consegue incluir, modificar e excluir um cadastro de documentação pendente no SAE", function() {

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
			objUpdate."dataHora":"01/10/2015 15:10";

			// tenta modificar		   
			var result = $.ajax({
							url:  "http://localhost:2301/sae/documentacao_pendente/"+ objUpdate.id,
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


 it("Verifica se consegue pesquisar um cadastro documentação pendente pelo id no SAE", function() {

	// faz a pesquisa
	var result = $.ajax({
					url:  "http://localhost:2301/sae/documentacao_pendente/1",
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	
	// é esperado o retorno de um registro ou 404 (not found)
	expect(result.status).toBe(200);
	
 });

 
});
