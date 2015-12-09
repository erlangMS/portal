describe("TipoQuestionario", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue obter uma lista de tipos de questionários", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/tipo_questionario",
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


 
 it("Verifica se consegue incluir, modificar e excluir um cadastro de tipos de questionário", function() {

	// define os dados do cadastro
	var obj = {"denominacao":"Tipo de questionário de teste!!!"}
	
	// tenta incluir		   
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/tipo_questionario",
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
			objUpdate.denominacao = "Tipo de questionário de teste modificado!!!";
			objUpdate.extinto = true;

			// tenta incluir		   
			var result = $.ajax({
							url:  "http://localhost:2301/questionario/tipo_questionario/"+ objUpdate.id,
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
							url:  "http://localhost:2301/questionario/tipo_questionario/"+ objInserido.id,
							type: "DELETE",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);
	}
	
	
 });



 it("Verifica se consegue pesquisar um cadastro de tipo de questionário pelo id", function() {

	// faz a pesquisa
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/tipo_questionario/1",
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
